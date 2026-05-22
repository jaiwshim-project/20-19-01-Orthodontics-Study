# Supabase 설정 가이드

## 프로젝트 정보
- **Project ID**: yrefhwvpopmqqvgalomt
- **Project URL**: https://yrefhwvpopmqqvgalomt.supabase.co
- **Anon Key**: (환경 변수에 저장됨)

## 1단계: Supabase SQL Editor에서 테이블 생성

### 방법 1: 간단한 방법 (추천)
1. `SUPABASE_SCHEMA.sql` 파일의 전체 내용 복사
2. Supabase 대시보드 → SQL Editor → 새 쿼리 생성
3. 복사한 SQL 전체를 붙여넣기
4. ▶️ "Run" 클릭

### 방법 2: 직접 코드 입력
Supabase 대시보드 → SQL Editor → 새 쿼리 생성 후 다음 코드를 실행하세요:

**파일**: `SUPABASE_SCHEMA.sql`를 참고하세요.

테이블 생성:
- `users` - 사용자 정보
- `progress` - 학습 진도
- `concepts` - 개념 정리
- `ideas` - 플랫폼 개선 아이디어
- `notes` - 학습 노트

Row Level Security (RLS) Policies가 자동으로 설정됩니다.

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
