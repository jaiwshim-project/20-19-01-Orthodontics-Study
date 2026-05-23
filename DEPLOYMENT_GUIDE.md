# 🚀 KD Agent House - 최종 배포 가이드

> **상태**: ✅ Production Ready  
> **마지막 업데이트**: 2024-05-23  
> **모든 코드**: GitHub에 커밋됨

---

## 📋 핵심 요약 (2분)

| 항목 | 완료 | 설명 |
|------|------|------|
| **Backend API** | ✅ | `api/agent_engine.py` - 통합 엔진 (277행) |
| **Database Schema** | ✅ | `scripts/init_supabase.sql` - 3개 테이블 |
| **Frontend** | ✅ | `js/chatbot.js` - API 통합 UI |
| **Automation** | ✅ | 3개 스크립트 (setup, test, deploy) |
| **Documentation** | ✅ | 5개 가이드 문서 |

**총 구현**: ~1,500 라인 코드 + 문서  
**신규 파일**: 15개  
**초기 에이전트**: 4개 (DB에서 무한 확장 가능)

---

## 🎯 배포 3가지 방법

### **방법 1️⃣ : 완전 자동 배포 (가장 쉬움)**

```bash
cd "C:\01 클로드코드\000 특허-저작권\01 치과 교정학"

# 하지만 먼저 Supabase 프로젝트 생성 필요:
# 1. https://supabase.com → "New project"
# 2. SQL 쿼리 실행 (DEPLOYMENT_CHECKLIST.md 참고)
# 3. API 키 복사 (.env에 입력)

# 그 다음:
bash scripts/deploy.sh

# 또는 Windows PowerShell에서:
# python scripts/setup_supabase.py
# vercel env add SUPABASE_URL
# vercel env add SUPABASE_SERVICE_ROLE_KEY
# vercel --prod
```

**소요 시간**: 5-10분  
**장점**: 자동으로 모든 단계 처리

---

### **방법 2️⃣ : 단계별 수동 배포 (추천 - 명확함)**

다음 5단계를 따릅니다:

#### **1단계: Supabase 프로젝트 생성 (2분)**

```
웹브라우저: https://supabase.com
1. "New project" 클릭
2. Project name: "orthodontics-ai"
3. Database password: 복잡하게 설정
4. Region: "Asia Pacific (Tokyo)"
5. "Create new project" 클릭
6. 대기 (약 1분)
```

#### **2단계: 데이터베이스 테이블 생성 (1분)**

```
Supabase 대시보드 → SQL Editor:
1. "New query" 클릭
2. SQL 복사 (DEPLOYMENT_CHECKLIST.md 참고)
3. "Execute" 클릭
4. 완료 메시지 확인
```

#### **3단계: API 키 복사 (30초)**

```
Supabase 대시보드 → Settings → API:
1. "Project URL" 복사
2. "service_role key" 복사
3. 메모장에 임시 저장
```

#### **4단계: .env 파일 설정 (1분)**

```bash
cd "C:\01 클로드코드\000 특허-저작권\01 치과 교정학"

# .env 파일 생성
cp .env.example .env

# 메모장에서 .env 편집:
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# (선택) LLM API 키 추가:
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=AIzaSy...
```

#### **5단계: Vercel 배포 (2-3분)**

```bash
# Python 의존성 설치
pip install -r requirements.txt

# Supabase 데이터 초기화
python scripts/setup_supabase.py

# (선택) 로컬 테스트
# vercel dev
# python scripts/test_agent.py

# Vercel에 배포
vercel login
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel --prod
```

**총 소요 시간**: 약 10분

---

### **방법 3️⃣ : 읽기만 (구조 이해)**

파일들을 읽고 이해하려면:

1. **QUICKSTART.md** (5분 빠른 시작)
2. **DEPLOYMENT_CHECKLIST.md** (상세 체크리스트)
3. **docs/KD_AGENT_HOUSE_SETUP.md** (완전 가이드)

---

## 📊 배포 후 확인

### 웹 UI 테스트 (2분)

```
1. 웹브라우저: https://your-project.vercel.app

2. 💬 채팅 버튼 클릭 (우측 하단)

3. 드롭다운에서 에이전트 선택:
   📚 질문 응답 (QA)
   💡 개념 설명 (Education)
   🔍 케이스 분석 (Analysis)
   🎓 학습 튜터 (Tutoring)

4. 메시지 입력:
   "EZM이 뭐야?" 또는 "Deep bite를 설명해줄래?"

5. 응답 확인:
   LLM이 정상 응답하는지 확인 (2-5초 소요)

6. 각 에이전트별로 테스트
```

### 배포 완료 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] SQL 쿼리 실행
- [ ] API 키 복사
- [ ] `.env` 파일 설정
- [ ] Python 의존성 설치
- [ ] Supabase 데이터 초기화
- [ ] Vercel 배포
- [ ] 웹 UI에서 테스트

---

## 💡 주요 파일 설명

```
📦 api/agent_engine.py
   Vercel Serverless 함수
   - POST /api/agent_engine 처리
   - Supabase에서 에이전트 DNA 로드
   - LLM API 호출 (Claude/GPT/Gemini)
   - 대화 히스토리 저장

📦 js/chatbot.js (리팩토링)
   - 에이전트 선택 드롭다운
   - API 호출 (/api/agent_engine)
   - 세션 관리 (localStorage)
   - RAG 폴백 (로컬)

📦 scripts/setup_supabase.py
   Supabase 데이터 자동 초기화
   - 4개 에이전트 삽입
   - 6개 스킬 삽입
   - 검증 (데이터 개수 확인)

📦 scripts/test_agent.py
   API 자동 테스트
   - 4개 에이전트 테스트
   - HTTP 요청/응답 검증
   - 결과 요약 (4/4 통과)

📦 scripts/deploy.sh
   배포 자동화 (선택사항)
   - 환경 확인
   - 의존성 설치
   - Supabase 초기화
   - 로컬 테스트
   - Vercel 배포

📦 vercel.json
   Vercel 설정
   - Python 함수 설정
   - 환경 변수 정의
   - 라우팅 설정

📦 .env.example
   환경 변수 템플릿
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - LLM API 키 (선택)
```

---

## 🔑 필수 API 키

| 서비스 | 필수 | 비용 | 설정 |
|--------|------|------|------|
| **Supabase** | ✅ | 무료 | https://supabase.com |
| **Vercel** | ✅ | 무료 | https://vercel.com |
| **Claude (Anthropic)** | ❌ | 유료 | https://console.anthropic.com |
| **GPT-4o (OpenAI)** | ❌ | 유료 | https://platform.openai.com |
| **Gemini (Google)** | ❌ | 무료 | https://aistudio.google.com |

**최소 필수**: Supabase + Vercel (무료)  
**권장**: 위의 LLM 1개 이상 (Gemini 무료 추천)

---

## 🎯 배포 후 다음 단계

### 1. 모니터링
```
Vercel 대시보드:
- 프로젝트 → Logs
- 실시간 요청/오류 확인
```

### 2. 신규 에이전트 추가 (코드 배포 불필요!)
```sql
Supabase → SQL Editor:
INSERT INTO agents VALUES (
    'new_agent_id',
    '새 에이전트 이름',
    '설명',
    '페르소나...',
    '["skill1"]',
    'claude',
    'active',
    NOW(),
    NOW()
);
-- 즉시 프로덕션 적용
```

### 3. 프롬프트 최적화
```
Supabase → Table Editor:
agents 테이블 → system_prompt 수정
즉시 모든 사용자에게 적용됨
```

---

## 🆘 문제 해결

| 오류 | 원인 | 해결책 |
|------|------|--------|
| "에이전트를 찾을 수 없습니다" | Supabase 초기화 안 됨 | `python scripts/setup_supabase.py` |
| "API 호출 실패 (500)" | LLM API 키 없음 | `.env`에 API 키 추가 |
| "Supabase 연결 실패" | URL/Key 오류 | DEPLOYMENT_CHECKLIST.md 참고 |
| "Vercel 배포 실패" | 환경 변수 누락 | `vercel env add ...` |

**더 자세한 문제 해결**: DEPLOYMENT_CHECKLIST.md의 "배포 중 오류" 섹션

---

## 📚 문서 로드맵

| 문서 | 용도 | 길이 |
|------|------|------|
| **QUICKSTART.md** | 5분 빠른 시작 | 5분 |
| **DEPLOYMENT_CHECKLIST.md** | 단계별 체크리스트 | 10분 |
| **docs/KD_AGENT_HOUSE_SETUP.md** | 완전 설정 가이드 | 30분 |
| **IMPLEMENTATION_SUMMARY.md** | 기술 명세 | 20분 |
| **DEPLOYMENT_GUIDE.md** | 배포 방법 (현재) | 10분 |

---

## ✅ 최종 체크리스트

배포 전 확인:

- [ ] GitHub 커밋 완료 (ac6177d)
- [ ] 모든 파일 작성됨 (15개)
- [ ] 문서 완성 (5개)
- [ ] 자동화 스크립트 준비 (3개)

배포 중:

- [ ] Supabase 프로젝트 생성
- [ ] SQL 실행 (테이블 생성)
- [ ] API 키 복사
- [ ] `.env` 파일 설정
- [ ] 의존성 설치
- [ ] 데이터 초기화
- [ ] Vercel 배포

배포 후:

- [ ] 웹 UI 접속 확인
- [ ] 4개 에이전트 테스트
- [ ] 응답 정상 확인

---

## 🎉 완료!

모든 준비가 완료되었습니다.

**지금 바로 시작하세요:**
1. Supabase 프로젝트 생성 (2분)
2. `.env` 설정 (1분)
3. `vercel --prod` 배포 (3분)

**총 6분 안에 AI 에이전트 플랫폼 준비 완료!**

---

## 📞 지원

- **빠른 시작**: QUICKSTART.md
- **상세 가이드**: docs/KD_AGENT_HOUSE_SETUP.md
- **문제 해결**: DEPLOYMENT_CHECKLIST.md

---

**버전**: 1.0.0  
**상태**: ✅ Production Ready  
**마지막 업데이트**: 2024-05-23
