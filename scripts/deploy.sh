#!/bin/bash
# KD Agent House - 통합 배포 스크립트
# 전체 배포 프로세스를 자동화합니다.

set -e

echo "═══════════════════════════════════════════════════════════"
echo "🚀 KD Agent House - 자동 배포 스크립트"
echo "═══════════════════════════════════════════════════════════"

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: 환경 확인
echo -e "\n${YELLOW}[Step 1/5] 환경 확인 중...${NC}"

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3이 설치되지 않았습니다.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Python3 found${NC}"

if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI가 설치되지 않았습니다. 설치 중...${NC}"
    npm install -g vercel
fi
echo -e "${GREEN}✅ Vercel CLI ready${NC}"

if ! test -f ".env"; then
    if test -f ".env.example"; then
        echo -e "${YELLOW}⚠️  .env 파일이 없습니다. .env.example을 복사합니다.${NC}"
        cp .env.example .env
        echo -e "${YELLOW}📝 .env 파일을 편집하고 다시 실행해주세요.${NC}"
        exit 1
    fi
fi

# Step 2: Python 의존성 설치
echo -e "\n${YELLOW}[Step 2/5] Python 의존성 설치 중...${NC}"
pip install -r requirements.txt > /dev/null 2>&1
echo -e "${GREEN}✅ 의존성 설치 완료${NC}"

# Step 3: Supabase 초기화
echo -e "\n${YELLOW}[Step 3/5] Supabase 데이터 초기화 중...${NC}"
python3 scripts/setup_supabase.py
echo -e "${GREEN}✅ Supabase 초기화 완료${NC}"

# Step 4: 로컬 테스트 (선택사항)
echo -e "\n${YELLOW}[Step 4/5] API 테스트 중...${NC}"
read -p "로컬에서 API를 테스트하시겠습니까? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}로컬 서버를 시작합니다. 별도 터미널에서 실행하세요:${NC}"
    echo "  vercel dev"
    echo ""
    read -p "로컬 서버가 시작되었으면 Enter를 누르세요..."
    python3 scripts/test_agent.py
fi

# Step 5: Vercel 배포
echo -e "\n${YELLOW}[Step 5/5] Vercel에 배포 중...${NC}"
echo -e "${YELLOW}💡 Vercel 계정이 없으면 웹 브라우저에서 로그인하세요.${NC}"

vercel login || true
vercel --prod

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}🎉 배포 완료!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📍 배포된 사이트:"
vercel ls 2>/dev/null | grep "orthodontics" || echo "https://your-project.vercel.app"
echo ""
echo "✅ 다음 단계:"
echo "   1. 웹 브라우저에서 사이트 방문"
echo "   2. 💬 채팅 아이콘 클릭"
echo "   3. 에이전트 선택 후 메시지 입력"
echo ""
echo "📚 더 자세한 정보:"
echo "   - QUICKSTART.md: 5분 빠른 시작"
echo "   - docs/KD_AGENT_HOUSE_SETUP.md: 전체 가이드"
