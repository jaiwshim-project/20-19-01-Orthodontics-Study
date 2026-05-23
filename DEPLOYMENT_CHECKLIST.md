# ✅ KD Agent House - 배포 완료 체크리스트

**상태**: 🚀 **배포 준비 완료**  
**날짜**: 2024-05-23  
**모든 코드**: GitHub에 커밋됨  

---

## 🎯 배포 전 확인 사항 (5분)

### ✅ Step 1: Supabase 프로젝트 생성

#### 1-1. 웹브라우저에서
```
1. https://supabase.com 접속
2. "Start your project" 또는 "New project" 클릭
3. 가입 또는 로그인
4. 새 프로젝트 생성:
   - Organization: (기본값 또는 생성)
   - Project name: "orthodontics-ai" (필수)
   - Database password: 복잡한 비밀번호 설정 (필수)
   - Region: "Asia Pacific (Tokyo)" 선택
   - Pricing Plan: Free 선택
5. "Create new project" 클릭
6. 약 1분 대기 (프로젝트 생성 중)
```

#### 1-2. Supabase 대시보드 → SQL Editor
```
1. 좌측 메뉴: "SQL Editor"
2. "New query" 클릭
3. 아래 SQL 복사-붙여넣기:

--- START SQL ---
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

-- 초기 데이터
INSERT INTO agents VALUES
    ('qa_assistant', '질문 응답 에이전트', '교정학 전반 질문 응답', '당신은 교정학 전문가입니다...', '["web_search","pdf_parser"]', 'gemini', 'active', NOW(), NOW()),
    ('concept_explainer', '개념 설명 에이전트', '복잡한 개념 단계별 설명', '당신은 교육 전문가입니다...', '["visualize","create_diagram"]', 'claude', 'active', NOW(), NOW()),
    ('case_analyzer', '케이스 분석 에이전트', '임상 케이스 분석', '당신은 임상 전문가입니다...', '["pdf_parser","case_database_search"]', 'gpt', 'active', NOW(), NOW()),
    ('learning_tutor', '맞춤형 학습 에이전트', '개인 맞춤 교육', '당신은 개인 튜터입니다...', '["quiz_generator","progress_tracker"]', 'gemini', 'active', NOW(), NOW());

CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_conversation_user_agent ON conversation_history(user_id, agent_id);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "agents_read_all" ON agents FOR SELECT USING (true);
CREATE POLICY "agent_skills_read_all" ON agent_skills FOR SELECT USING (true);
CREATE POLICY "conversation_insert_authenticated" ON conversation_history FOR INSERT WITH CHECK (true);

--- END SQL ---

4. "Execute" 또는 "Run query" 버튼 클릭
5. ✅ 완료 메시지 확인
```

#### 1-3. API 키 복사
```
Supabase 대시보드:
1. 좌측 메뉴: "Settings"
2. "API" 탭 클릭
3. 복사:
   - "Project URL" → 메모장에 복사 (SUPABASE_URL)
   - "service_role key" → 메모장에 복사 (SUPABASE_SERVICE_ROLE_KEY)
```

---

### ✅ Step 2: 환경 변수 설정

#### 2-1. .env 파일 생성
```bash
# 터미널에서 프로젝트 폴더로 이동
cd "C:\01 클로드코드\000 특허-저작권\01 치과 교정학"

# .env.example을 .env로 복사
cp .env.example .env
```

#### 2-2. .env 파일 편집
```
메모장 또는 VS Code에서 .env 파일 열기:

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# 선택: 1개 이상의 LLM API 키 입력
# (없어도 Gemini 기본값으로 작동)

ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=AIzaSy...
```

---

### ✅ Step 3: Python 의존성 설치

```bash
# 터미널에서
cd "C:\01 클로드코드\000 특허-저작권\01 치과 교정학"

# Python 의존성 설치
pip install -r requirements.txt

# 또는
pip3 install -r requirements.txt
```

**예상 출력**:
```
Successfully installed anthropic openai google-generativeai supabase python-dotenv
```

---

### ✅ Step 4: Supabase 데이터 초기화

```bash
# 터미널에서
python scripts/setup_supabase.py

# 또는
python3 scripts/setup_supabase.py
```

**예상 결과**:
```
✅ Supabase 연결 성공: https://xxx.supabase.co

📝 에이전트 데이터 삽입...
  ✅ 질문 응답 에이전트
  ✅ 개념 설명 에이전트
  ✅ 케이스 분석 에이전트
  ✅ 맞춤형 학습 에이전트

🛠️  스킬 데이터 삽입...
  ✅ ... (6개 스킬)

✔️  셋업 검증...
  ✅ 에이전트: 4 개
  ✅ 스킬: 6+ 개

🎉 Supabase 셋업 완료!
```

---

### ✅ Step 5: 로컬 테스트 (선택사항)

#### 5-1. 로컬 서버 시작
```bash
# 터미널 1
vercel dev

# 예상 출력:
# Vercel CLI 16.X.X
# > Ready! Available at http://localhost:3000
```

#### 5-2. API 테스트 (다른 터미널)
```bash
# 터미널 2
python scripts/test_agent.py

# 예상 결과:
# ✅ PASS: qa_assistant
# ✅ PASS: concept_explainer
# ✅ PASS: case_analyzer
# ✅ PASS: learning_tutor
# 총 4/4 테스트 통과
```

---

### ✅ Step 6: Vercel 배포

#### 6-1. Vercel 계정 설정
```bash
# 터미널에서
vercel login

# 웹 브라우저에서 Vercel 계정으로 로그인
# (또는 새 계정 생성)
```

#### 6-2. 환경 변수 추가
```bash
# 각 변수를 하나씩 추가
vercel env add SUPABASE_URL
# → 프롬프트에 URL 입력

vercel env add SUPABASE_SERVICE_ROLE_KEY
# → 프롬프트에 Key 입력

vercel env add ANTHROPIC_API_KEY
# → 프롬프트에 키 입력 (선택)

vercel env add OPENAI_API_KEY
# → 프롬프트에 키 입력 (선택)

vercel env add GOOGLE_API_KEY
# → 프롬프트에 키 입력 (선택)
```

#### 6-3. 프로덕션 배포
```bash
# 프로덕션 배포
vercel --prod

# 예상 출력:
# ✅ Production: https://your-project.vercel.app
# Deployment complete!
```

---

### ✅ Step 7: 웹 UI 테스트

#### 7-1. 사이트 접속
```
웹 브라우저에서:
https://your-project.vercel.app

(또는 Vercel에서 제공한 URL)
```

#### 7-2. 기능 테스트
```
1. 💬 채팅 아이콘 클릭 (우측 하단)
2. 드롭다운에서 에이전트 선택:
   📚 질문 응답
   💡 개념 설명
   🔍 케이스 분석
   🎓 학습 튜터

3. 메시지 입력:
   "EZM이 뭐야?"

4. 응답 확인:
   LLM이 정상 응답하는지 확인
   (2-5초 소요)

5. 다른 에이전트로 테스트:
   각 에이전트마다 다른 스타일의 응답 확인
```

---

## 🎯 배포 완료 확인

다음을 모두 확인하면 배포 완료:

- [ ] Supabase 프로젝트 생성
- [ ] SQL 쿼리 실행 (테이블 생성)
- [ ] API 키 복사 (Supabase에서)
- [ ] `.env` 파일 생성 및 설정
- [ ] Python 의존성 설치 (`pip install -r requirements.txt`)
- [ ] Supabase 데이터 초기화 (`python scripts/setup_supabase.py`)
- [ ] Vercel 배포 (`vercel --prod`)
- [ ] 웹 UI에서 4개 에이전트 모두 테스트

---

## 💡 배포 후 관리

### 신규 에이전트 추가 (코드 배포 불필요!)

Supabase 웹 대시보드:
```
1. "SQL Editor"
2. 새 쿼리:

INSERT INTO agents VALUES (
    'new_agent_id',
    '새 에이전트 이름',
    '설명',
    '당신은... (페르소나)',
    '["skill1", "skill2"]',
    'claude',  -- LLM 선택
    'active',
    NOW(),
    NOW()
);

3. Execute
4. 즉시 프로덕션 적용 (재배포 불필요)
```

---

## 🆘 배포 중 오류

### "Supabase 연결 실패"
```
✅ 확인사항:
  1. SUPABASE_URL 정확한지 확인
  2. SUPABASE_SERVICE_ROLE_KEY 정확한지 확인
  3. Supabase 프로젝트가 생성되었는지 확인
  4. SQL 쿼리가 성공했는지 확인
```

### "에이전트 데이터가 없습니다"
```
✅ 해결:
  1. Supabase 대시보드 → Table Editor
  2. "agents" 테이블 확인
  3. 데이터가 없으면:
     python scripts/setup_supabase.py 다시 실행
```

### "API 호출 실패 (500)"
```
✅ 확인사항:
  1. LLM API 키가 입력되었는지 확인
  2. Vercel 로그 확인: vercel logs
  3. .env 파일 다시 확인
```

### "로컬 테스트 연결 실패"
```
✅ 해결:
  1. vercel dev 가 실행 중인지 확인
  2. 포트 3000이 사용 중인지 확인 (netstat -an | findstr 3000)
  3. vercel dev를 다시 시작
```

---

## 📞 빠른 링크

- **빠른 시작**: QUICKSTART.md
- **전체 가이드**: docs/KD_AGENT_HOUSE_SETUP.md
- **기술 명세**: IMPLEMENTATION_SUMMARY.md
- **이 체크리스트**: DEPLOYMENT_CHECKLIST.md (현재 파일)

---

## ✅ 다음 단계

배포 후:

1. **모니터링**
   - Vercel 대시보드에서 트래픽 모니터링
   - 오류 로그 확인

2. **사용자 피드백**
   - 각 에이전트별 응답 품질 평가
   - 필요시 프롬프트 조정 (DB에서만)

3. **확장**
   - 신규 에이전트 추가
   - 스킬 추가/수정
   - LLM 전환

---

## 🎉 배포 완료!

이제 완전한 AI 에이전트 플랫폼이 준비되었습니다.

**축하합니다!** 🚀

---

**최종 업데이트**: 2024-05-23  
**버전**: 1.0.0  
**상태**: ✅ Production Ready
