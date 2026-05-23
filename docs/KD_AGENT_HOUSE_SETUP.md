# KD Agent House - 설정 및 구현 가이드

## 📋 목차
1. [개요](#개요)
2. [시스템 요구사항](#시스템-요구사항)
3. [설치 절차](#설치-절차)
4. [Supabase 설정](#supabase-설정)
5. [API 배포](#api-배포)
6. [테스트](#테스트)
7. [문제 해결](#문제-해결)

---

## 개요

KD Agent House는 DB 기반 동적 에이전트 플랫폼으로, 단일 통합 엔진(`agent_engine.py`)을 통해 다양한 에이전트를 동적으로 로드하고 실행합니다.

**아키텍처:**
- **Frontend**: `js/chatbot.js` (에이전트 선택 UI + API 호출)
- **Backend**: `api/agent_engine.py` (통합 에이전트 런타임)
- **Database**: Supabase (에이전트 DNA 저장소)
- **LLM**: Claude, GPT-4o, Gemini (다중 지원)

---

## 시스템 요구사항

### 필수
- Python 3.9+
- Vercel CLI (배포용)
- Node.js 18+ (로컬 테스트용)
- Supabase 계정

### 선택
- Docker (로컬 개발 환경)

---

## 설치 절차

### 1단계: 저장소 복제 및 의존성 설치

```bash
cd "C:\01 클로드코드\000 특허-저작권\01 치과 교정학"

# Python 의존성
pip install -r requirements.txt

# Vercel CLI
npm install -g vercel
```

### 2단계: 환경 변수 설정

```bash
# .env.example을 .env로 복사
cp .env.example .env

# .env 파일을 편집하여 API 키 입력
# - SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY
# - ANTHROPIC_API_KEY
# - OPENAI_API_KEY
# - GOOGLE_API_KEY
```

---

## Supabase 설정

### Step 1: Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com) 접속
2. "New Project" 클릭
3. 프로젝트명: `orthodontics-ai`
4. Region: 가장 가까운 지역 선택 (예: Tokyo)
5. Password 설정 후 생성

### Step 2: 테이블 초기화

1. Supabase 대시보드 → "SQL Editor" 탭
2. "New Query" 클릭
3. 다음 SQL 스크립트 실행:

```bash
# 방법 1: SQL Editor에서 직접 복사-붙여넣기
# scripts/init_supabase.sql의 모든 내용을 복사

# 방법 2: psql로 실행 (터미널)
psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f scripts/init_supabase.sql
```

### Step 3: API 키 확인

1. 대시보드 → Settings → API
2. "Project URL" 복사 → `.env` 의 `SUPABASE_URL`
3. "service_role key" 복사 → `.env` 의 `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: 초기 데이터 확인

Supabase 대시보드 → Table Editor에서:
- `agents` 테이블: 4개 에이전트 확인 (qa_assistant, concept_explainer, case_analyzer, learning_tutor)
- `agent_skills` 테이블: 스킬 정의 확인

---

## API 배포

### Vercel에 배포

#### Step 1: Vercel 프로젝트 설정

```bash
cd "C:\01 클로드코드\000 특허-저작권\01 치과 교정학"

# Vercel 로그인
vercel login

# 첫 배포 (대화형)
vercel

# 질문에 답변:
# - Scope: 사용자 선택
# - Project name: (Enter로 기본값)
# - Framework: Other (Python)
# - Root directory: (Enter로 기본값)
```

#### Step 2: 환경 변수 설정

```bash
# 방법 1: Vercel CLI로
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ANTHROPIC_API_KEY
vercel env add OPENAI_API_KEY
vercel env add GOOGLE_API_KEY

# 방법 2: Vercel 웹 대시보드
# 프로젝트 → Settings → Environment Variables에서 추가
```

#### Step 3: 배포

```bash
# 프로덕션 배포
vercel --prod

# 배포 후 URL 확인
vercel ls
```

---

## 테스트

### Step 1: 로컬 테스트

```bash
# 로컬 서버 시작
vercel dev

# 별도 터미널에서 테스트
curl -X POST http://localhost:3000/api/agent_engine \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "qa_assistant",
    "message": "EZM이 뭐야?",
    "user_id": "test_user"
  }'
```

### Step 2: 웹 UI 테스트

1. 브라우저에서 프로젝트 열기
2. 💬 채팅 아이콘 클릭
3. 에이전트 선택 (예: 📚 질문 응답)
4. 메시지 입력: "EZM이 뭐야?"
5. 응답 확인

### Step 3: 에이전트 전환 테스트

1. 드롭다운에서 다른 에이전트 선택 (💡 개념 설명, 🔍 케이스 분석 등)
2. 각 에이전트별 응답 스타일 확인

---

## API 엔드포인트 명세

### POST /api/agent_engine

요청 본문:
```json
{
  "agent_id": "qa_assistant",
  "message": "사용자 질문",
  "user_id": "user_123",
  "session_id": "session_xyz"
}
```

응답:
```json
{
  "success": true,
  "agent_id": "qa_assistant",
  "agent_name": "질문 응답 에이전트",
  "response": "LLM 응답 텍스트",
  "session_id": "session_xyz",
  "timestamp": "2024-05-23T10:30:00Z"
}
```

---

## 에이전트 추가 (DB만으로)

새 에이전트 추가 시 코드 배포 **불필요**:

1. Supabase 대시보드 → Table Editor
2. `agents` 테이블 → Insert row
3. 데이터 입력:
   - `agent_id`: `diagnosis_expert` (고유 ID)
   - `agent_name`: `진단 전문가`
   - `system_prompt`: (에이전트 페르소나)
   - `skills`: `["pdf_analysis", "diagnosis_engine"]`
   - `llm_provider`: `claude` 또는 `gpt` 또는 `gemini`

4. 즉시 활성화 (프론트엔드 드롭다운에 자동 추가)

---

## 문제 해결

### 1. "에이전트를 찾을 수 없습니다" 오류

**원인**: Supabase에 에이전트 데이터가 없음

**해결**:
```sql
-- Supabase SQL Editor에서
SELECT * FROM agents WHERE agent_id = 'qa_assistant';

-- 결과가 없으면 초기화 스크립트 다시 실행
-- scripts/init_supabase.sql 실행
```

### 2. "API 호출 실패" (500 에러)

**원인**: 환경 변수 누락 또는 LLM API 키 오류

**확인 사항**:
```bash
# Vercel에서 환경 변수 확인
vercel env ls

# 누락된 환경 변수 추가
vercel env add ANTHROPIC_API_KEY
```

### 3. CORS 오류

**원인**: 프론트엔드 도메인이 API 호출 시 차단됨

**해결**: `agent_engine.py`의 CORS 헤더 확인
```python
headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}
```

### 4. 로컬 `vercel dev`에서 모듈 누락 오류

**원인**: Python 의존성 미설치

**해결**:
```bash
pip install -r requirements.txt
vercel dev --debug
```

---

## 모니터링 및 로깅

### Vercel 대시보드
- 프로젝트 → Logs 탭에서 실시간 로그 확인

### 로컬 디버깅
```bash
# DEBUG 모드로 실행
export DEBUG=1
vercel dev
```

---

## 다음 단계

1. **메트릭 추가**: `conversation_history` 분석으로 사용자 행동 추적
2. **멀티 테넌트**: 조직/사용자별 에이전트 권한 제어
3. **피드백 루프**: 사용자 평가 → 모델 재학습
4. **확장**: 외부 도구 연결 (PDF 분석기, 웹 검색 등)

---

## 지원

- 문제 발생 시: GitHub Issues에 상세히 기록
- 질문: 프로젝트 README 참고

---

**마지막 업데이트**: 2024-05-23
**버전**: 1.0.0 (초기 배포)
