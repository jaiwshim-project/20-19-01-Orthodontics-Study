-- KD Agent House - Supabase 초기화 스크립트
-- 이 스크립트를 Supabase SQL Editor에서 실행하세요

-- 1. agents 테이블 (에이전트 메타데이터)
CREATE TABLE IF NOT EXISTS agents (
    agent_id VARCHAR(255) PRIMARY KEY,
    agent_name VARCHAR(255) NOT NULL,
    description TEXT,
    system_prompt TEXT NOT NULL,
    skills JSONB DEFAULT '[]'::jsonb,
    llm_provider VARCHAR(50) DEFAULT 'gemini',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. agent_skills 테이블 (도구 및 기능 정의)
CREATE TABLE IF NOT EXISTS agent_skills (
    skill_id VARCHAR(255) PRIMARY KEY,
    agent_id VARCHAR(255),
    skill_name VARCHAR(255) NOT NULL,
    description TEXT,
    function_type VARCHAR(50),
    parameters JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
);

-- 3. conversation_history 테이블 (대화 메모리)
CREATE TABLE IF NOT EXISTS conversation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255),
    agent_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(255),
    messages JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
);

-- 4. 초기 에이전트 데이터 삽입

-- 4-1. QA Assistant (질문 응답 에이전트)
INSERT INTO agents (agent_id, agent_name, description, system_prompt, skills, llm_provider) VALUES (
    'qa_assistant',
    '질문 응답 에이전트',
    '교정학 플랫폼 전반에 대한 질문에 답변하는 에이전트',
    '당신은 교정학 플랫폼의 전문 AI 어시스턴트입니다.

EZM (Equilibrium Zone Methodology), 부정교합 분류, 교정 치료 계획, 플랫폼 사용법 등에 대해 사용자의 질문에 상세하고 친절하게 답변합니다.

응답 시 다음을 고려하세요:
- 정확한 의학 정보 제공
- 사용자의 지식 수준에 맞춘 설명
- 필요시 구체적인 예시 제시
- 항상 한국어로 응답',
    '["web_search", "pdf_parser", "knowledge_base_search"]',
    'gemini'
) ON CONFLICT (agent_id) DO NOTHING;

-- 4-2. Concept Explainer (개념 설명 에이전트)
INSERT INTO agents (agent_id, agent_name, description, system_prompt, skills, llm_provider) VALUES (
    'concept_explainer',
    '개념 설명 에이전트',
    '복잡한 교정학 개념을 단계별로 설명하는 에이전트',
    '당신은 교정학의 복잡한 개념들을 단계별로 쉽게 설명하는 AI 교육 전문가입니다.

사용자의 질문에 대해:
1. 기본 개념부터 시작
2. 단계별 설명 (초급 → 중급 → 고급)
3. 시각적 비유 및 예시 활용
4. 실제 임상 적용 방법 제시

항상 체계적이고 이해하기 쉬운 방식으로 설명합니다.',
    '["visualize", "create_diagram", "step_by_step_guide"]',
    'claude'
) ON CONFLICT (agent_id) DO NOTHING;

-- 4-3. Case Analyzer (케이스 분석 에이전트)
INSERT INTO agents (agent_id, agent_name, description, system_prompt, skills, llm_provider) VALUES (
    'case_analyzer',
    '케이스 분석 에이전트',
    '임상 케이스를 분석하고 진단하는 전문 에이전트',
    '당신은 교정학 임상 케이스 분석의 전문가입니다.

사용자가 제공하는 케이스 정보에 대해:
1. 진단 분석 (진단명, 문제점, 특이사항)
2. 치료 계획 수립
3. 예상 결과 및 합병증 예측
4. 참고할 플랫폼의 해당 자료 제시

항상 증거 기반의 전문적인 분석을 제공합니다.',
    '["pdf_parser", "case_database_search", "treatment_plan_generator"]',
    'gpt'
) ON CONFLICT (agent_id) DO NOTHING;

-- 4-4. Learning Tutor (맞춤형 학습 에이전트)
INSERT INTO agents (agent_id, agent_name, description, system_prompt, skills, llm_provider) VALUES (
    'learning_tutor',
    '맞춤형 학습 에이전트',
    '사용자의 학습 진도와 수준에 맞춘 교육을 제공하는 에이전트',
    '당신은 개인 맞춤형 교육을 제공하는 AI 튜터입니다.

사용자와의 상호작용에서:
1. 현재 학습 수준 파악
2. 약점 파악 및 보강 자료 제시
3. Phase별 학습 진도 추적
4. 실시간 피드백 및 격려
5. 맞춤형 학습 계획 수립

항상 긍정적이고 격려적인 톤을 유지합니다.',
    '["progress_tracker", "learning_path_generator", "quiz_generator", "performance_analyzer"]',
    'gemini'
) ON CONFLICT (agent_id) DO NOTHING;

-- 5. 초기 스킬 데이터 삽입
INSERT INTO agent_skills (skill_id, agent_id, skill_name, description, function_type) VALUES
    ('web_search', 'qa_assistant', '웹 검색', '인터넷에서 최신 정보 검색', 'external_api'),
    ('pdf_parser', 'qa_assistant', 'PDF 파싱', '플랫폼의 PDF 자료 분석', 'document_processing'),
    ('knowledge_base_search', 'qa_assistant', '지식베이스 검색', '내부 교정학 지식베이스 검색', 'database_query')
ON CONFLICT (skill_id) DO NOTHING;

-- 6. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_conversation_user_agent ON conversation_history(user_id, agent_id);
CREATE INDEX IF NOT EXISTS idx_conversation_created_at ON conversation_history(created_at);

-- 7. Row Level Security (RLS) 활성화
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;

-- 8. RLS 정책 설정 (모든 사용자 읽기 가능)
CREATE POLICY "agents_read_all" ON agents FOR SELECT USING (true);
CREATE POLICY "agent_skills_read_all" ON agent_skills FOR SELECT USING (true);
CREATE POLICY "conversation_insert_authenticated" ON conversation_history FOR INSERT WITH CHECK (true);
