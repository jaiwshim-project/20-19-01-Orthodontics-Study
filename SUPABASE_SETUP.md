# Supabase 설정 가이드

## 프로젝트 정보
- **Project ID**: yrefhwvpopmqqvgalomt
- **Project URL**: https://yrefhwvpopmqqvgalomt.supabase.co
- **Anon Key**: (환경 변수에 저장됨)

## 1단계: Supabase SQL Editor에서 테이블 생성

Supabase 대시보드 → SQL Editor → 새 쿼리 생성 후 다음 코드를 실행하세요:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Progress table (학습 진도)
CREATE TABLE IF NOT EXISTS progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  phase1 INTEGER DEFAULT 0,
  phase2 INTEGER DEFAULT 0,
  phase3 INTEGER DEFAULT 0,
  hoursSpent DECIMAL(10, 2) DEFAULT 0,
  data JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Concepts table (개념 정리)
CREATE TABLE IF NOT EXISTS concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  phase TEXT,
  content TEXT,
  resource TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Ideas table (플랫폼 개선 아이디어)
CREATE TABLE IF NOT EXISTS ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT,
  priority TEXT,
  content TEXT,
  benefit TEXT,
  status TEXT DEFAULT '제출됨',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Notes table (학습 노트)
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  phase INTEGER,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Row Level Security 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies: 사용자는 자신의 데이터만 접근
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own concepts" ON concepts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own concepts" ON concepts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own concepts" ON concepts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own concepts" ON concepts
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own ideas" ON ideas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ideas" ON ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ideas" ON ideas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ideas" ON ideas
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own notes" ON notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON notes
  FOR DELETE USING (auth.uid() = user_id);
```

## 2단계: 인증 설정

Supabase 대시보드 → Authentication → Providers:
- Email 활성화 (기본값: 활성화)
- Google, GitHub 등 추가 제공자 (선택사항)

## 3단계: 플랫폼에서 사용

### Progress 페이지에서:
1. "⚙️ Supabase 설정" 클릭
2. 이미 자동 설정되어 있음
3. "☁️ 클라우드에 저장" 버튼으로 진도 저장
4. "📥 클라우드에서 로드" 버튼으로 진도 복원

### Concepts 페이지에서:
- 개념정리 내용이 자동으로 클라우드에 저장됨

### Ideas 페이지에서:
- 플랫폼 개선 아이디어가 자동으로 클라우드에 저장됨

## 4단계: 환경 변수 관리

### 로컬 개발 (.env.local)
```
VITE_SUPABASE_URL=https://yrefhwvpopmqqvgalomt.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### Vercel 배포
Vercel Dashboard → Settings → Environment Variables에서 설정

## 보안 주의사항

⚠️ **API 키 관리**:
- `.env.local` 파일은 `.gitignore`에 포함됨
- 공개 저장소에 절대 키를 커밋하지 마세요
- 의도치 않게 노출된 경우 즉시 Supabase에서 재생성

## 문제 해결

### "Not authenticated" 오류
- 사용자 인증이 필요합니다
- 아직 구현 대기 중: 인증 로그인 페이지

### "RLS violation" 오류
- 현재 사용자가 자신의 데이터에만 접근 가능
- 테스트 시 auth.uid() 모킹 필요

### 테이블 생성 오류
- SQL 쿼리가 올바른지 확인
- 테이블이 이미 존재하는 경우 DROP TABLE 후 재생성

## 다음 단계

1. **사용자 인증 구현**
   - Supabase Auth UI 통합
   - 회원가입/로그인 페이지 생성

2. **실시간 동기화**
   - Supabase Realtime 기능 활용
   - 다중 기기에서 실시간 데이터 동기화

3. **데이터 분석**
   - 학습 패턴 분석
   - 개선 아이디어 트렌드 분석

4. **백업 및 복구**
   - 정기적인 데이터 백업
   - 복구 계획 수립
