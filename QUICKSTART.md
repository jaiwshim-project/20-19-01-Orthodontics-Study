# 🚀 KD Agent House - 5분 빠른 시작 가이드

## 사전 준비 (1분)

```bash
cd "C:\01 클로드코드\000 특허-저작권\01 치과 교정학"

# Python 의존성 설치
pip install -r requirements.txt

# Vercel CLI 설치
npm install -g vercel
```

---

## 1단계: Supabase 프로젝트 생성 (2분)

### 1-1. Supabase 계정 생성
- 웹: [supabase.com](https://supabase.com) 접속
- "Start your project" → "New project" 클릭
- 설정:
  - **Organization**: 생성 또는 선택
  - **Project name**: `orthodontics-ai`
  - **Database password**: 안전한 비밀번호 설정
  - **Region**: 가장 가까운 지역 (Tokyo 권장)
  - **Pricing**: Free 플랜 선택
- **Create new project** 클릭

### 1-2. 테이블 초기화
Supabase 대시보드에서:
1. **SQL Editor** 탭 클릭
2. **New query** → 아래 SQL 복사-붙여넣기:

```sql
-- (scripts/init_supabase.sql의 전체 내용을 여기 붙여넣기)
-- 또는 아래 간단한 버전:

CREATE TABLE agents (
    agent_id VARCHAR(255) PRIMARY KEY,
    agent_name VARCHAR(255) NOT NULL,
    system_prompt TEXT NOT NULL,
    skills JSONB DEFAULT '[]'::jsonb,
    llm_provider VARCHAR(50) DEFAULT 'gemini'
);

INSERT INTO agents VALUES
    ('qa_assistant', '질문 응답 에이전트', '당신은 교정학 전문가입니다...', '["web_search"]', 'gemini'),
    ('concept_explainer', '개념 설명 에이전트', '당신은 교육 전문가입니다...', '["visualize"]', 'claude'),
    ('case_analyzer', '케이스 분석 에이전트', '당신은 임상 전문가입니다...', '["pdf_parser"]', 'gpt'),
    ('learning_tutor', '학습 튜터', '당신은 개인 맞춤형 튜터입니다...', '["quiz_generator"]', 'gemini');

CREATE TABLE agent_skills (
    skill_id VARCHAR(255) PRIMARY KEY,
    agent_id VARCHAR(255),
    skill_name VARCHAR(255)
);

CREATE TABLE conversation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255),
    agent_id VARCHAR(255),
    messages JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. **Execute** 또는 **Run** 버튼 클릭

### 1-3. API 키 복사
Supabase 대시보드에서:
1. **Settings** → **API** 탭
2. 다음 복사:
   - **Project URL** (아래 `.env`에서 `SUPABASE_URL`)
   - **service_role key** (아래 `.env`에서 `SUPABASE_SERVICE_ROLE_KEY`)

---

## 2단계: 환경 변수 설정 (1분)

### 2-1. .env 파일 생성

```bash
cp .env.example .env
```

### 2-2. .env 파일 편집 (메모장 등)

```bash
# Supabase (위에서 복사한 값)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# LLM API 키 (선택사항 - 1개 이상)
# https://console.anthropic.com에서
ANTHROPIC_API_KEY=sk-ant-...

# https://platform.openai.com/api-keys에서
OPENAI_API_KEY=sk-...

# https://aistudio.google.com/app/apikey에서
GOOGLE_API_KEY=AIzaSy...
```

**주의**: API 키 없어도 로컬 테스트는 가능합니다 (Gemini 기본값).

---

## 3단계: Supabase 데이터 초기화 (1분)

```bash
python scripts/setup_supabase.py
```

**결과 예상**:
```
✅ Supabase 연결 성공
✅ 에이전트 데이터 삽입...
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

## 4단계: 로컬 테스트 (선택사항)

### 4-1. 로컬 개발 서버 시작

```bash
vercel dev
```

**결과 예상**:
```
Vercel CLI 16.X.X
> Ready! Available at http://localhost:3000
```

### 4-2. API 테스트 (다른 터미널)

```bash
python scripts/test_agent.py
```

**결과 예상**:
```
✔️  환경 설정 확인...
✅ SUPABASE_URL
✅ SUPABASE_SERVICE_ROLE_KEY

🧪 테스트 케이스
[테스트 1/4]
✅ qa_assistant: EZM이 뭐야?
[테스트 2/4]
✅ concept_explainer: Deep Bite를 쉽게 설명해줄래?
...

📊 테스트 결과 요약
✅ PASS: qa_assistant
✅ PASS: concept_explainer
✅ PASS: case_analyzer
✅ PASS: learning_tutor

총 4/4 테스트 통과
🎉 모든 테스트 통과! 배포 준비 완료.
```

---

## 5단계: Vercel 배포

### 5-1. Vercel 계정 로그인

```bash
vercel login
```

### 5-2. 환경 변수 추가

```bash
# 각 변수를 하나씩 추가
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ANTHROPIC_API_KEY
vercel env add OPENAI_API_KEY
vercel env add GOOGLE_API_KEY

# 또는 Vercel 웹 대시보드에서
# 프로젝트 → Settings → Environment Variables
```

### 5-3. 프로덕션 배포

```bash
vercel --prod
```

**결과 예상**:
```
✅ Production: https://your-project.vercel.app
```

---

## 6단계: 웹 UI 테스트

1. **브라우저 열기**: `https://your-project.vercel.app`
2. **채팅 아이콘 클릭**: 💬 (우측 하단)
3. **에이전트 선택**: 드롭다운에서 선택
   - 📚 질문 응답
   - 💡 개념 설명
   - 🔍 케이스 분석
   - 🎓 학습 튜터
4. **메시지 입력**: "EZM이 뭐야?"
5. **응답 확인**: LLM 응답이 나타나는지 확인

---

## ✅ 완료! 다음은?

### 신규 에이전트 추가 (DB만으로)

**코드 배포 불필요!**

Supabase 대시보드에서:
1. **Table Editor** → `agents` 테이블
2. **Insert row** 클릭
3. 데이터 입력:
   ```json
   {
     "agent_id": "diagnosis_expert",
     "agent_name": "진단 전문가",
     "system_prompt": "당신은 진단 전문가입니다...",
     "skills": ["diagnosis_engine"],
     "llm_provider": "claude"
   }
   ```
4. 저장 → 즉시 활성화 (프론트엔드 드롭다운에 자동 추가)

---

## 🆘 문제 해결

### "Supabase 연결 실패"
```bash
# .env 파일 확인
cat .env | grep SUPABASE

# URL과 Key가 정확한지 확인
# https://supabase.com 대시보드 → Settings → API
```

### "에이전트를 찾을 수 없습니다"
```bash
# Supabase 테이블 확인
# 대시보드 → Table Editor → agents 테이블 확인

# 데이터 초기화 다시 실행
python scripts/setup_supabase.py
```

### "API 호출 실패 (500)"
```bash
# LLM API 키 확인
cat .env | grep ANTHROPIC\|OPENAI\|GOOGLE

# Vercel 로그 확인
vercel logs
```

### "로컬 테스트 연결 실패"
```bash
# vercel dev 확인
ps aux | grep vercel

# 재시작
vercel dev --debug
```

---

## 📚 더 읽기

- **전체 가이드**: `docs/KD_AGENT_HOUSE_SETUP.md`
- **API 명세**: 같은 파일의 "API 엔드포인트 명세" 섹션
- **아키텍처**: README의 "고도화 시스템 아키텍처"

---

## ⏱️ 예상 소요 시간

| 단계 | 시간 | 누적 |
|------|------|------|
| 1. Supabase 프로젝트 | 2분 | 2분 |
| 2. 환경 변수 | 1분 | 3분 |
| 3. 데이터 초기화 | 1분 | 4분 |
| 4. Vercel 배포 | 2-3분 | 6-7분 |
| **총합** | **~10분** | |

---

**🎯 지금 바로 시작하세요!** 

위 5단계를 따르면 5-10분 안에 완전한 AI 에이전트 플랫폼이 준비됩니다.

> **마지막 업데이트**: 2024-05-23
> **버전**: 1.0.0 (Production Ready)
