# 📱 KD Agent House 사용 가이드

**상태**: ✅ 배포 완료 후 사용 설명서  
**대상**: 플랫폼 사용자, 관리자  
**시간**: 5분 빠른 시작 + 상세 기능 설명

---

## 🚀 5분 빠른 시작

### Step 1: 배포된 웹사이트 접속 (30초)

```
웹브라우저에서 배포 URL 방문:
https://your-project.vercel.app
```

**배포 URL 확인하는 방법:**
```bash
# 터미널에서 (배포 후)
vercel ls your-project-name

# 또는 Vercel 대시보드에서 프로젝트 선택 → Deployment
```

---

### Step 2: 💬 채팅 버튼 찾기 (15초)

```
웹페이지 우측 하단에 있는 💬 채팅 아이콘 클릭
```

![Chat Button Location]
```
┌─────────────────────────────┐
│  교정학 플랫폼               │
│                             │
│                             │
│                             │
│                    💬 ← 클릭│
└─────────────────────────────┘
```

---

### Step 3: 에이전트 선택 (15초)

```
채팅 팝업이 열리면 상단 드롭다운에서 에이전트 선택:
```

| 에이전트 | 아이콘 | 용도 | 예시 |
|---------|--------|------|------|
| **질문 응답** | 📚 | 교정학 전반 질문 답변 | "EZM이 뭐야?" |
| **개념 설명** | 💡 | 복잡한 개념 단계별 설명 | "Deep Bite를 설명해줄래?" |
| **케이스 분석** | 🔍 | 임상 사례 분석 및 진단 | "이 환자의 치료계획은?" |
| **학습 튜터** | 🎓 | 개인 맞춤형 학습 가이드 | "교정학 공부 어디서부터?" |

---

### Step 4: 메시지 입력 및 응답 받기 (2-3초)

```
1. 메시지 입력창에 질문 입력
2. Enter 또는 [전송] 버튼 클릭
3. AI 응답 대기 (2-5초)
4. 응답 표시됨
```

**예시 대화:**
```
사용자: "EZM이 뭐야?"
Q&A Agent: "EZM은 Ezure-Mertens의 약자로 교정학에서..."
```

---

## 🎯 각 에이전트 상세 사용법

### 1️⃣ 📚 질문 응답 에이전트 (QA Assistant)

**역할**: 교정학 기초 & 심화 질문에 정확하게 답변

**추천 질문**:
```
- "교정학이란 무엇인가?"
- "부정교합의 종류는?"
- "EZM, PCA, ANB 차이점은?"
- "교정 치료 기간은 얼마나 되나?"
- "교정 부작용은?"
```

**응답 스타일**: 
- 정확하고 객관적
- 교정학 전문 용어 사용
- 이론 중심

**추천 대상**: 교정학 학생, 치과의사, 교정 환자

---

### 2️⃣ 💡 개념 설명 에이전트 (Concept Explainer)

**역할**: 어려운 개념을 단계별로 쉽게 설명

**추천 질문**:
```
- "Deep Bite를 쉽게 설명해줄래?"
- "Class II Division 1이 뭐야?"
- "T-M joint dysfunction을 그림으로 설명해줄래"
- "Torque Control이 필요한 이유는?"
- "Cephalometric Analysis는?"
```

**응답 스타일**:
- 기본부터 심화까지 단계별
- 비유와 예시 활용
- 다이어그램 설명 포함

**추천 대상**: 교정학 초급자, 환자 교육

---

### 3️⃣ 🔍 케이스 분석 에이전트 (Case Analyzer)

**역할**: 임상 케이스를 분석하고 진단 및 치료계획 제시

**추천 질문**:
```
- "환자 나이 25세, Angle Class III, Deep Bite인데 어떻게 치료할까?"
- "이 X-ray 분석 결과 진단은?"
- "교정 + 수술 필요한 케이스인가?"
- "Treatment outcome을 예측해줄래"
```

**응답 스타일**:
- 임상 데이터 기반 분석
- 진단 및 치료계획 수립
- 예측 가능한 결과 제시

**추천 대상**: 치과의사, 교정 전문의, 학생 실습

---

### 4️⃣ 🎓 학습 튜터 에이전트 (Learning Tutor)

**역할**: 개인 맞춤형 교육 제공, 학습 수준에 따른 가이드

**추천 질문**:
```
- "교정학 공부를 어디서부터 시작할까?"
- "나는 초보인데 어떤 순서로 배워야 해?"
- "핵심 개념 10개만 골라줄래"
- "시험 대비 공부 계획을 짜줄래"
- "이 개념이 잘 안 이해돼, 다시 설명해줄래"
```

**응답 스타일**:
- 학습자 수준에 맞춤
- 학습 경로 제시
- 복습 자료 추천
- 격려와 동기부여

**추천 대상**: 교정학 학생, 자기주도 학습자

---

## 💾 세션 & 대화 이력 관리

### 대화 저장

**자동 저장됨** (별도 조작 불필요):
```
각 메시지는 자동으로 Supabase에 저장:
- user_id: 사용자 식별 (localStorage)
- session_id: 대화 세션 (timestamp + random)
- agent_id: 선택한 에이전트
- messages: 메시지 내용
```

### 대화 이력 조회

```
웹 UI에서:
- 같은 세션 내: 위로 스크롤하면 이전 메시지 표시
- 다른 세션: localStorage 초기화되면 새 세션 시작
```

**Supabase에서 조회 (관리자용):**
```sql
-- Supabase → SQL Editor
SELECT * FROM conversation_history 
WHERE user_id = 'xxxx'
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🛠️ 관리자 기능

### 새로운 에이전트 추가 (코드 배포 불필요!)

**방법 1️⃣: Supabase 웹 대시보드 (추천)**

```
1. https://supabase.com 로그인
2. 프로젝트 선택
3. 좌측 메뉴 → "Table Editor"
4. "agents" 테이블 선택
5. [+ Insert] 버튼
6. 다음 정보 입력:

   agent_id:        진단_전문가      (영문, 언더스코어 사용)
   agent_name:      진단 전문가      (한글 표시명)
   description:     환자 진단 전문가 (테이블 설명)
   system_prompt:   당신은 교정학 진단 전문가입니다. 임상 증상으로부터...
   skills:          ["diagnosis", "patient_assessment"]
   llm_provider:    claude           (또는 gpt, gemini)
   status:          active
   created_at/updated_at: 자동 입력
   
7. [Save] 클릭
8. 즉시 적용! (웹 UI 새로고침 시 드롭다운에 나타남)
```

**방법 2️⃣: SQL 쿼리 (빠름)**

```
Supabase → SQL Editor:

INSERT INTO agents (
    agent_id, agent_name, description, 
    system_prompt, skills, llm_provider, status
) VALUES (
    'diagnosis_expert',
    '진단 전문가',
    '환자 증상으로부터 진단',
    '당신은 교정학 진단 전문가입니다...',
    '["diagnosis", "patient_assessment"]'::jsonb,
    'claude',
    'active'
);
```

### 에이전트 수정

```
Supabase → Table Editor:
1. agents 테이블
2. 수정할 행 선택
3. 필드 편집 (예: system_prompt 프롬프트 조정)
4. [Save]
5. 즉시 적용 (전체 사용자에게)
```

**예시: 프롬프트 개선**
```
기존: "당신은 교정학 전문가입니다..."
개선: "당신은 교정학 전문가입니다. 환자 중심의 설명을 제공하고..."
```

### 에이전트 비활성화

```
Supabase → Table Editor:
1. agents 테이블
2. 비활성화할 행의 status 필드 변경: active → inactive
3. [Save]
4. 드롭다운에서 사라짐 (새로고침 필요)
```

---

## 📊 성능 및 모니터링

### Vercel 로그 확인

```
터미널:
vercel logs <프로젝트명>

또는

Vercel 대시보드:
1. 프로젝트 선택
2. "Deployments" 탭
3. 최신 배포 선택
4. "Logs" 탭
```

### 대화 통계 확인

```sql
-- Supabase SQL Editor

-- 1. 일일 사용자 수
SELECT DATE(created_at), COUNT(DISTINCT user_id) as users
FROM conversation_history
GROUP BY DATE(created_at)
ORDER BY DATE(created_at) DESC;

-- 2. 에이전트별 사용 빈도
SELECT agent_id, COUNT(*) as count
FROM conversation_history
GROUP BY agent_id
ORDER BY count DESC;

-- 3. 평균 응답 시간 (초)
-- (message_count로 대략 추정)
SELECT agent_id, COUNT(*) / COUNT(DISTINCT session_id) as avg_msgs
FROM conversation_history
GROUP BY agent_id;
```

---

## 🆘 문제 해결

### "에이전트가 응답하지 않음"

**1단계: LLM API 키 확인**
```
Vercel 대시보드:
1. 프로젝트 선택 → Settings
2. "Environment Variables"
3. ANTHROPIC_API_KEY, OPENAI_API_KEY, GOOGLE_API_KEY 확인
4. 키가 없으면:
   vercel env add ANTHROPIC_API_KEY
   (키 입력 후 재배포)
```

**2단계: Vercel 로그 확인**
```bash
vercel logs <프로젝트명>
# "KeyError", "API Error" 등 메시지 확인
```

**3단계: 배포 재시도**
```bash
vercel --prod
```

---

### "에이전트 드롭다운이 비어있음"

```
Supabase agents 테이블이 비어있을 가능성:

python scripts/setup_supabase.py

다시 실행하면 4개 기본 에이전트 자동 삽입
```

---

### "한글이 깨짐"

```
일반적으로 자동 처리되지만, 문제 발생 시:

Vercel → Settings → Environment Variables:
NODE_OPTIONS=-–enable-source-maps

재배포:
vercel --prod
```

---

## 📱 사용 팁

### 💡 팁 1: 에이전트 전환

```
같은 세션 중에도 에이전트 변경 가능:
1. 드롭다운에서 다른 에이전트 선택
2. 이전 대화는 유지됨
3. 새 메시지부터 새 에이전트 사용
```

### 💡 팁 2: 정확한 질문

```
더 정확한 응답을 위해:
❌ "뭐하는 거야?" (모호함)
✅ "Deep Bite의 정의와 진단 기준은?" (구체적)
```

### 💡 팁 3: 다중 에이전트 활용

```
같은 주제를 여러 에이전트로:
1. Q&A 에이전트: 정의 및 이론
2. 개념 설명: 단계별 이해
3. 케이스 분석: 실제 진단

→ 다각도 이해 가능
```

### 💡 팁 4: 세션 저장

```
중요한 대화는 스크린샷으로 저장:
1. 대화창 스크린샷
2. 또는 Supabase에서 CSV 내보내기
```

---

## 🔐 보안 및 프라이버시

### 데이터 저장

```
모든 대화는 Supabase에 암호화되어 저장:
- 사용자 정보: user_id (UUID)
- 메시지: 원문 저장
- 타임스탬프: 자동 기록
```

### 데이터 삭제

```
특정 사용자 대화 삭제:

Supabase → SQL Editor:
DELETE FROM conversation_history 
WHERE user_id = 'xxxx';
```

---

## 🚀 다음 단계

### 1. 에이전트 커스터마이징

```
각 에이전트의 system_prompt 수정:
- 톤(tone) 조정: 공식적 ↔ 친근함
- 언어: 한국어 ↔ 영어
- 스킬 추가: skills 필드에 추가

Supabase Table Editor에서 즉시 적용
```

### 2. 신규 에이전트 추가

```
위의 "새로운 에이전트 추가" 섹션 참고
```

### 3. 분석 및 최적화

```
- 사용 통계 수집
- 응답 품질 평가
- 프롬프트 개선
- 비용 최적화 (LLM 변경)
```

---

## 📞 링크 모음

| 항목 | 링크 |
|------|------|
| **배포 후 관리** | Vercel 대시보드 |
| **데이터 관리** | Supabase 웹 UI |
| **기술 문서** | DEPLOYMENT_GUIDE.md |
| **배포 가이드** | DEPLOY_NOW.md |
| **설정 명세** | IMPLEMENTATION_SUMMARY.md |

---

## ✅ 체크리스트 (배포 후 첫 사용)

- [ ] 배포 URL 접속 확인
- [ ] 💬 채팅 버튼 클릭
- [ ] 4개 에이전트 모두 드롭다운에 표시
- [ ] 각 에이전트마다 테스트 메시지 전송
- [ ] 응답이 정상적으로 표시됨
- [ ] 이전 메시지가 저장됨 (위로 스크롤 시)

---

## 🎉 완료!

이제 완전한 AI 에이전트 플랫폼을 사용할 수 있습니다.

**핵심 정리:**
1. **웹 UI**: 💬 버튼 → 에이전트 선택 → 메시지 입력
2. **에이전트**: 4가지 역할로 다양한 질문 처리
3. **관리**: DB 행만 추가해서 무중단 확장
4. **모니터링**: Vercel 로그 + Supabase 통계

---

**최종 업데이트**: 2024-05-23  
**버전**: 1.0.0  
**상태**: ✅ Ready to Use
