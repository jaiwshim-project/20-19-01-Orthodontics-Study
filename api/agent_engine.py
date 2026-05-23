"""
KD Agent House - 동적 에이전트 엔진
DB 기반으로 에이전트 DNA를 로드하여 실행하는 통합 엔진
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Optional
import anthropic
import openai
import google.generativeai as genai
from supabase import create_client, Client

# Supabase 초기화
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# LLM 클라이언트 초기화
anthropic_client = anthropic.Anthropic(api_key=os.environ.get('ANTHROPIC_API_KEY'))
openai.api_key = os.environ.get('OPENAI_API_KEY')
genai.configure(api_key=os.environ.get('GOOGLE_API_KEY'))


class AgentEngine:
    """동적 에이전트 실행 엔진"""

    def __init__(self, agent_id: str):
        """에이전트 DNA를 DB에서 로드하여 초기화"""
        self.agent_id = agent_id
        self.agent_dna = self._load_agent_dna()
        self.conversation_history: List[Dict] = []

    def _load_agent_dna(self) -> Dict:
        """Supabase에서 에이전트 설정(DNA) 로드"""
        try:
            response = supabase.table('agents').select('*').eq('agent_id', self.agent_id).single().execute()
            if response.data:
                return response.data
            else:
                raise ValueError(f"에이전트 '{self.agent_id}' 를 찾을 수 없습니다.")
        except Exception as e:
            raise RuntimeError(f"에이전트 로드 실패: {str(e)}")

    def _get_available_skills(self) -> List[Dict]:
        """에이전트가 사용 가능한 스킬 목록 로드"""
        try:
            skill_ids = self.agent_dna.get('skills', [])
            if not skill_ids:
                return []

            response = supabase.table('agent_skills').select('*').in_('skill_id', skill_ids).execute()
            return response.data if response.data else []
        except Exception as e:
            print(f"스킬 로드 실패: {str(e)}")
            return []

    def _build_system_prompt(self) -> str:
        """시스템 프롬프트 구성 (에이전트 페르소나 + 스킬 정보)"""
        base_prompt = self.agent_dna.get('system_prompt', '')

        skills = self._get_available_skills()
        if skills:
            skills_info = "당신이 사용 가능한 도구:\n"
            for skill in skills:
                skills_info += f"- {skill.get('skill_id')}: {skill.get('description', '')}\n"
            base_prompt += f"\n\n{skills_info}"

        return base_prompt

    def _call_llm(self, user_message: str, llm_provider: Optional[str] = None) -> str:
        """LLM API 호출"""
        provider = llm_provider or self.agent_dna.get('llm_provider', 'gemini')
        system_prompt = self._build_system_prompt()

        self.conversation_history.append({
            'role': 'user',
            'content': user_message
        })

        try:
            if provider == 'claude':
                response = anthropic_client.messages.create(
                    model='claude-3-5-sonnet-20241022',
                    max_tokens=2048,
                    system=system_prompt,
                    messages=self.conversation_history
                )
                assistant_message = response.content[0].text

            elif provider == 'gpt':
                response = openai.ChatCompletion.create(
                    model='gpt-4o',
                    system_prompt=system_prompt,
                    messages=self.conversation_history
                )
                assistant_message = response.choices[0].message.content

            else:  # gemini (기본값)
                model = genai.GenerativeModel('gemini-1.5-flash')
                messages_text = f"시스템: {system_prompt}\n\n"
                for msg in self.conversation_history:
                    if msg['role'] == 'user':
                        messages_text += f"사용자: {msg['content']}\n"
                    else:
                        messages_text += f"어시스턴트: {msg['content']}\n"

                response = model.generate_content(messages_text)
                assistant_message = response.text

            self.conversation_history.append({
                'role': 'assistant',
                'content': assistant_message
            })

            return assistant_message

        except Exception as e:
            error_msg = f"LLM 호출 실패 ({provider}): {str(e)}"
            return error_msg

    def save_conversation(self, user_id: str, session_id: str):
        """대화 히스토리를 Supabase에 저장"""
        try:
            supabase.table('conversation_history').insert({
                'user_id': user_id,
                'agent_id': self.agent_id,
                'session_id': session_id,
                'messages': json.dumps(self.conversation_history),
                'created_at': datetime.utcnow().isoformat()
            }).execute()
        except Exception as e:
            print(f"대화 저장 실패: {str(e)}")

    def process_request(self, user_message: str, user_id: str = 'anonymous', session_id: str = None) -> Dict:
        """사용자 요청 처리"""
        session_id = session_id or datetime.utcnow().isoformat()

        try:
            response = self._call_llm(user_message)
            self.save_conversation(user_id, session_id)

            return {
                'success': True,
                'agent_id': self.agent_id,
                'agent_name': self.agent_dna.get('agent_name', self.agent_id),
                'response': response,
                'session_id': session_id,
                'timestamp': datetime.utcnow().isoformat()
            }
        except Exception as e:
            return {
                'success': False,
                'agent_id': self.agent_id,
                'error': str(e),
                'timestamp': datetime.utcnow().isoformat()
            }


def handler(request):
    """Vercel Serverless Function Handler"""
    try:
        # CORS 헤더
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }

        if request.method == 'OPTIONS':
            return ('', 200, headers)

        # 요청 파싱
        if request.method == 'POST':
            body = json.loads(request.get_data(as_text=True))
        else:
            body = dict(request.args)

        agent_id = body.get('agent_id') or request.args.get('id')
        user_message = body.get('message', '')
        user_id = body.get('user_id', 'anonymous')
        session_id = body.get('session_id')

        if not agent_id:
            return (
                json.dumps({'error': 'agent_id 필수'}),
                400,
                headers
            )

        if not user_message:
            return (
                json.dumps({'error': 'message 필수'}),
                400,
                headers
            )

        # 에이전트 엔진 실행
        engine = AgentEngine(agent_id)
        result = engine.process_request(user_message, user_id, session_id)

        status = 200 if result.get('success') else 400
        return (
            json.dumps(result, ensure_ascii=False, indent=2),
            status,
            headers
        )

    except Exception as e:
        return (
            json.dumps({'error': str(e)}, ensure_ascii=False),
            500,
            {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        )
