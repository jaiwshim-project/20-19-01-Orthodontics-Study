# ⚡ 한 줄 명령어로 배포하기

## 🚀 모든 준비 완료 후 다음을 실행하세요

### **Step 1: 기본 설정 (한 번만)**

```bash
cd "C:\01 클로드코드\000 특허-저작권\01 치과 교정학"

# Python 의존성 설치
pip install -r requirements.txt
```

### **Step 2: Supabase 준비 완료 후**

```bash
# 로컬 데이터 초기화
python scripts/setup_supabase.py
```

**출력 확인:**
```
✅ Supabase 연결 성공
✅ 에이전트 4개 삽입
✅ 스킬 6개 삽입
✅ 셋업 검증 완료
🎉 Supabase 셋업 완료!
```

### **Step 3: Vercel 배포**

```bash
# 첫 번째: Vercel 로그인
npx vercel login

# 환경 변수 추가 (한 줄씩)
npx vercel env add SUPABASE_URL
npx vercel env add SUPABASE_SERVICE_ROLE_KEY

# 프로덕션 배포
npx vercel --prod
```

**완료!** ✅

배포 URL이 표시됩니다:
```
✅ Production: https://your-project.vercel.app
```

---

## 🎉 배포 후 확인

웹브라우저에서 배포된 URL 방문 → 💬 채팅 아이콘 → 에이전트 선택 → 테스트

---

## 📝 사전 체크리스트

- [ ] Supabase 프로젝트 생성 완료
- [ ] SQL 실행 완료
- [ ] API 키 복사 완료
- [ ] `.env` 파일 작성 완료
- [ ] Python 의존성 설치 완료 (`pip install -r requirements.txt`)
- [ ] Supabase 초기화 완료 (`python scripts/setup_supabase.py`)

**모든 체크 완료 후** Step 3의 Vercel 배포 명령어 실행

---

## 🆘 배포 중 오류

### "Supabase 연결 실패"
```
✅ .env 파일의 SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY 확인
```

### "에이전트 데이터 없음"
```
✅ python scripts/setup_supabase.py 다시 실행
```

### "Vercel 로그인 실패"
```
✅ 웹브라우저에서 https://vercel.com 로그인 후 재시도
```

---

**지금 바로 시작하세요!** 🚀
