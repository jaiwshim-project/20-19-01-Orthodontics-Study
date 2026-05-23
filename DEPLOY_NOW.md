# 🚀 지금 바로 배포하기 - 실행 가이드

**현재 상태**: 모든 코드가 준비됨 ✅  
**다음 단계**: 사용자 계정 연결 + 배포 실행

---

## 📝 배포 실행 순서 (7분)

### **Step A: Supabase 프로젝트 생성 (웹브라우저) - 2분**

❗ **직접 손으로 해야 함** (자동화 불가)

```
1. 웹브라우저 열기: https://supabase.com
2. "New project" 또는 "Start your project" 클릭
3. 로그인/가입
4. 프로젝트 생성:
   ┌─────────────────────────────┐
   │ Organization: (기본값)      │
   │ Project name: orthodontics-ai│ ← 정확히 입력
   │ Password: 복잡하게 설정      │
   │ Region: Asia Pacific (Tokyo) │ ← 선택
   │ Pricing: Free              │ ← 선택
   └─────────────────────────────┘
5. "Create new project" 클릭
6. 로딩 대기 (약 1분)
7. 완료되면 대시보드 표시
```

---

### **Step B: SQL 실행 (Supabase 대시보드) - 1분**

```
Supabase 대시보드에서:

1. 좌측 메뉴 → "SQL Editor"
2. "New query" 버튼
3. 아래 SQL을 모두 복사-붙여넣기:
```

#### **SQL 코드:**

```sql
-- KD Agent House 테이블 생성
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

CREATE TABLE IF NOT EXISTS conversation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255),
    agent_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(255),
    messages JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id)
);

-- 초기 에이전트 데이터
INSERT INTO agents (agent_id, agent_name, description, system_prompt, skills, llm_provider, status) VALUES
    ('qa_assistant', '질문 응답 에이전트', '교정학 전반 질문 응답', '당신은 교정학 플랫폼의 전문 AI 어시스턴트입니다. EZM, 부정교합 분류, 교정 치료 계획에 대해 상세하고 친절하게 답변합니다.', '["web_search","pdf_parser"]'::jsonb, 'gemini', 'active'),
    ('concept_explainer', '개념 설명 에이전트', '복잡한 교정학 개념 단계별 설명', '당신은 교정학의 복잡한 개념들을 단계별로 쉽게 설명하는 AI 교육 전문가입니다. 기본부터 고급까지 체계적으로 설명합니다.', '["visualize","create_diagram"]'::jsonb, 'claude', 'active'),
    ('case_analyzer', '케이스 분석 에이전트', '임상 케이스 분석 및 진단', '당신은 교정학 임상 케이스 분석의 전문가입니다. 진단, 치료 계획, 예상 결과를 제시합니다.', '["pdf_parser","case_database_search"]'::jsonb, 'gpt', 'active'),
    ('learning_tutor', '맞춤형 학습 에이전트', '개인 학습 수준에 맞춘 교육', '당신은 개인 맞춤형 교육을 제공하는 AI 튜터입니다. 학습 수준을 파악하고 맞춤형 가이드를 제공합니다.', '["quiz_generator","progress_tracker"]'::jsonb, 'gemini', 'active');

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_conversation_user_agent ON conversation_history(user_id, agent_id);

-- 보안 정책
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "agents_read_all" ON agents FOR SELECT USING (true);
CREATE POLICY "agent_skills_read_all" ON agent_skills FOR SELECT USING (true);
CREATE POLICY "conversation_insert_authenticated" ON conversation_history FOR INSERT WITH CHECK (true);
```

```
4. "Execute" 또는 "Run query" 버튼 클릭
5. 완료 메시지 확인:
   "Query executed successfully"
```

---

### **Step C: API 키 복사 (Supabase 설정) - 1분**

```
Supabase 대시보드:

1. 좌측 메뉴 → "Settings"
2. "API" 탭
3. 복사할 항목:
   - "Project URL" 
   - "service_role key"

4. 메모장에 임시 저장 (다음에 필요)
```

**예시:**
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### **Step D: 로컬에서 .env 설정 (터미널) - 1분**

```bash
cd "C:\01 클로드코드\000 특허-저작권\01 치과 교정학"

# .env 파일 생성
cp .env.example .env
```

**메모장에서 .env 파일 편집:**

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# 선택: LLM API 키 (1개 이상 권장)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_API_KEY=
```

---

### **Step E: 로컬 Supabase 초기화 (자동) - 1분**

```bash
# Python 의존성 설치
pip install -r requirements.txt

# Supabase에 에이전트 데이터 자동 삽입
python scripts/setup_supabase.py
```

**예상 결과:**
```
✅ Supabase 연결 성공: https://xxx.supabase.co
📝 에이전트 데이터 삽입...
  ✅ 질문 응답 에이전트
  ✅ 개념 설명 에이전트
  ✅ 케이스 분석 에이전트
  ✅ 맞춤형 학습 에이전트
✔️  셋업 검증...
  ✅ 에이전트: 4 개
  ✅ 스킬: 6+ 개
🎉 Supabase 셋업 완료!
```

---

### **Step F: Vercel 배포 (자동) - 2분**

```bash
# Vercel에 로그인
npx vercel login

# 환경 변수 추가
npx vercel env add SUPABASE_URL
# → 프롬프트: https://your-project.supabase.co 입력

npx vercel env add SUPABASE_SERVICE_ROLE_KEY
# → 프롬프트: eyJhbGc... 입력

# (선택) LLM API 키
npx vercel env add ANTHROPIC_API_KEY
npx vercel env add OPENAI_API_KEY
npx vercel env add GOOGLE_API_KEY

# 프로덕션 배포
npx vercel --prod
```

**예상 결과:**
```
✅ Production: https://your-project.vercel.app
Deployment complete!
```

---

## ✅ 배포 후 확인

### 웹 UI 테스트

```
1. 웹브라우저: https://your-project.vercel.app
2. 💬 채팅 버튼 (우측 하단)
3. 드롭다운에서 에이전트 선택
4. 메시지 입력: "EZM이 뭐야?"
5. 응답 확인
```

---

## 🎯 핵심 체크포인트

| 단계 | 소요시간 | 상태 | 확인 |
|------|---------|------|------|
| A. Supabase 프로젝트 | 2분 | ⏳ | 대시보드 표시 |
| B. SQL 실행 | 1분 | ⏳ | "Query executed" |
| C. API 키 복사 | 1분 | ⏳ | 메모장에 저장 |
| D. .env 설정 | 1분 | ⏳ | 파일 저장 |
| E. Supabase 초기화 | 1분 | ⏳ | "완료" 메시지 |
| F. Vercel 배포 | 2분 | ⏳ | "Production:" URL |

**총 소요시간: 약 8분**

---

## 📱 배포 완료 후

- 웹사이트: https://your-project.vercel.app
- 채팅 기능: 💬 아이콘 클릭
- 에이전트: 4가지 선택 가능
- 신규 추가: Supabase에서만 (코드 배포 불필요)

---

## 🚨 주의사항

1. **API 키 보안**: .env 파일을 GitHub에 커밋하지 마세요 (.gitignore에 이미 추가됨)
2. **SUPABASE_SERVICE_ROLE_KEY**: 절대 공개하지 마세요 (서버 전용)
3. **LLM API 키**: 무료 Gemini로도 시작 가능 (테스트 후 추가)

---

## 💡 다음 단계

배포 후:
1. 모니터링: Vercel 대시보드에서 로그 확인
2. 확장: 신규 에이전트 Supabase에 추가
3. 최적화: 프롬프트 조정 (DB에서만)

---

지금 바로 시작하세요! 🚀
