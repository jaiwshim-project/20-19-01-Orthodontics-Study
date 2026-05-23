#!/usr/bin/env python3
"""
Supabase 자동 셋업 스크립트
에이전트 DNA와 스킬 초기 데이터를 삽입합니다.
"""

import os
import json
import sys
from typing import Dict, List
from supabase import create_client, Client

def setup_supabase():
    """Supabase 초기화"""
    url = os.environ.get('SUPABASE_URL')
    key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

    if not url or not key:
        print("❌ 환경 변수 누락:")
        print("   - SUPABASE_URL")
        print("   - SUPABASE_SERVICE_ROLE_KEY")
        print("\n.env 파일을 확인하세요.")
        sys.exit(1)

    try:
        supabase: Client = create_client(url, key)
        print(f"✅ Supabase 연결 성공: {url}")
        return supabase
    except Exception as e:
        print(f"❌ Supabase 연결 실패: {str(e)}")
        sys.exit(1)


def insert_agents(supabase: Client) -> bool:
    """에이전트 데이터 삽입"""
    agents = [
        {
            "agent_id": "qa_assistant",
            "agent_name": "질문 응답 에이전트",
            "description": "교정학 플랫폼 전반에 대한 질문에 답변",
            "system_prompt": """당신은 교정학 플랫폼의 전문 AI 어시스턴트입니다.

EZM (Equilibrium Zone Methodology), 부정교합 분류, 교정 치료 계획, 플랫폼 사용법 등에 대해 사용자의 질문에 상세하고 친절하게 답변합니다.

응답 시 다음을 고려하세요:
- 정확한 의학 정보 제공
- 사용자의 지식 수준에 맞춘 설명
- 필요시 구체적인 예시 제시
- 항상 한국어로 응답""",
            "skills": ["web_search", "pdf_parser", "knowledge_base_search"],
            "llm_provider": "gemini",
            "status": "active"
        },
        {
            "agent_id": "concept_explainer",
            "agent_name": "개념 설명 에이전트",
            "description": "복잡한 교정학 개념을 단계별로 설명",
            "system_prompt": """당신은 교정학의 복잡한 개념들을 단계별로 쉽게 설명하는 AI 교육 전문가입니다.

사용자의 질문에 대해:
1. 기본 개념부터 시작
2. 단계별 설명 (초급 → 중급 → 고급)
3. 시각적 비유 및 예시 활용
4. 실제 임상 적용 방법 제시

항상 체계적이고 이해하기 쉬운 방식으로 설명합니다.""",
            "skills": ["visualize", "create_diagram", "step_by_step_guide"],
            "llm_provider": "claude",
            "status": "active"
        },
        {
            "agent_id": "case_analyzer",
            "agent_name": "케이스 분석 에이전트",
            "description": "임상 케이스를 분석하고 진단",
            "system_prompt": """당신은 교정학 임상 케이스 분석의 전문가입니다.

사용자가 제공하는 케이스 정보에 대해:
1. 진단 분석 (진단명, 문제점, 특이사항)
2. 치료 계획 수립
3. 예상 결과 및 합병증 예측
4. 참고할 플랫폼의 해당 자료 제시

항상 증거 기반의 전문적인 분석을 제공합니다.""",
            "skills": ["pdf_parser", "case_database_search", "treatment_plan_generator"],
            "llm_provider": "gpt",
            "status": "active"
        },
        {
            "agent_id": "learning_tutor",
            "agent_name": "맞춤형 학습 에이전트",
            "description": "사용자의 학습 진도와 수준에 맞춘 교육 제공",
            "system_prompt": """당신은 개인 맞춤형 교육을 제공하는 AI 튜터입니다.

사용자와의 상호작용에서:
1. 현재 학습 수준 파악
2. 약점 파악 및 보강 자료 제시
3. Phase별 학습 진도 추적
4. 실시간 피드백 및 격려
5. 맞춤형 학습 계획 수립

항상 긍정적이고 격려적인 톤을 유지합니다.""",
            "skills": ["progress_tracker", "learning_path_generator", "quiz_generator", "performance_analyzer"],
            "llm_provider": "gemini",
            "status": "active"
        }
    ]

    print("\n📝 에이전트 데이터 삽입...")
    for agent in agents:
        try:
            # 기존 데이터 확인
            existing = supabase.table('agents').select('*').eq('agent_id', agent['agent_id']).execute()
            if existing.data:
                print(f"  ⚠️  {agent['agent_name']} (이미 존재, 스킵)")
                continue

            supabase.table('agents').insert(agent).execute()
            print(f"  ✅ {agent['agent_name']}")
        except Exception as e:
            print(f"  ❌ {agent['agent_name']}: {str(e)}")
            return False

    return True


def insert_skills(supabase: Client) -> bool:
    """스킬 데이터 삽입"""
    skills = [
        {
            "skill_id": "web_search",
            "agent_id": "qa_assistant",
            "skill_name": "웹 검색",
            "description": "인터넷에서 최신 정보 검색",
            "function_type": "external_api"
        },
        {
            "skill_id": "pdf_parser",
            "agent_id": "qa_assistant",
            "skill_name": "PDF 파싱",
            "description": "플랫폼의 PDF 자료 분석",
            "function_type": "document_processing"
        },
        {
            "skill_id": "knowledge_base_search",
            "agent_id": "qa_assistant",
            "skill_name": "지식베이스 검색",
            "description": "내부 교정학 지식베이스 검색",
            "function_type": "database_query"
        },
        {
            "skill_id": "visualize",
            "agent_id": "concept_explainer",
            "skill_name": "시각화",
            "description": "개념을 다이어그램으로 표현",
            "function_type": "visualization"
        },
        {
            "skill_id": "create_diagram",
            "agent_id": "concept_explainer",
            "skill_name": "다이어그램 생성",
            "description": "학습용 다이어그램 생성",
            "function_type": "visualization"
        },
        {
            "skill_id": "step_by_step_guide",
            "agent_id": "concept_explainer",
            "skill_name": "단계별 가이드",
            "description": "단계별 학습 가이드 생성",
            "function_type": "educational"
        }
    ]

    print("\n🛠️  스킬 데이터 삽입...")
    for skill in skills:
        try:
            existing = supabase.table('agent_skills').select('*').eq('skill_id', skill['skill_id']).execute()
            if existing.data:
                print(f"  ⚠️  {skill['skill_name']} (이미 존재, 스킵)")
                continue

            supabase.table('agent_skills').insert(skill).execute()
            print(f"  ✅ {skill['skill_name']}")
        except Exception as e:
            print(f"  ❌ {skill['skill_name']}: {str(e)}")
            return False

    return True


def verify_setup(supabase: Client) -> bool:
    """셋업 검증"""
    print("\n✔️  셋업 검증...")
    try:
        agents = supabase.table('agents').select('*').execute()
        skills = supabase.table('agent_skills').select('*').execute()

        print(f"  ✅ 에이전트: {len(agents.data)} 개")
        print(f"  ✅ 스킬: {len(skills.data)} 개")

        if len(agents.data) >= 4 and len(skills.data) >= 3:
            print("\n🎉 Supabase 셋업 완료!")
            return True
        else:
            print("\n⚠️  데이터 부족")
            return False
    except Exception as e:
        print(f"  ❌ 검증 실패: {str(e)}")
        return False


def main():
    """메인 함수"""
    print("=" * 60)
    print("🚀 KD Agent House - Supabase 자동 셋업")
    print("=" * 60)

    # Supabase 연결
    supabase = setup_supabase()

    # 데이터 삽입
    if not insert_agents(supabase):
        sys.exit(1)

    if not insert_skills(supabase):
        sys.exit(1)

    # 검증
    if not verify_setup(supabase):
        sys.exit(1)

    print("\n📚 다음 단계:")
    print("  1. .env 파일에 LLM API 키 입력:")
    print("     - ANTHROPIC_API_KEY")
    print("     - OPENAI_API_KEY")
    print("     - GOOGLE_API_KEY")
    print("  2. vercel --prod 로 배포")
    print("  3. 브라우저에서 웹 UI 테스트")


if __name__ == '__main__':
    main()
