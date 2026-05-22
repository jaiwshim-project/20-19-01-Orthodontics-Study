---
title: Phase 3 - 플랫폼 적용 (2-3주)
goal: 플랫폼 자주적 기획·개선·업그레이드 능력 확보
status: 학습 시작 전
---

# 📚 Phase 3: 플랫폼 적용 & 독립적 개발 능력 (2-3주)

## 🎯 목표

당신이 이 단계를 마치면:
- ✅ 플랫폼 버그 자주적 수정 가능
- ✅ AI 알고리즘 개선 아이디어 → 구현 가능
- ✅ 새로운 기능 기획 및 설계 능력 보유
- ✅ 임상 요구사항 → 기술 구현 변환 가능
- ✅ 플랫폼 성능 최적화 및 확장 가능

---

## 📖 학습 자료 & 활동

### **Week 1: 플랫폼 분석 & 버그 수정 (Day 1-7)**

#### Phase 1, 2 학습 내용 복습

**학습 활동** (Day 1):
- 교정학 01.mp4 다시 보기 (15분, 배속 1.5배)
- PHASE1_기초이해.md 핵심 요점 복습 (15분)
- PHASE2_고급이해.md 4대 AI 엔진 요약 정리 (15분)

**목표**: Phase 1-2 지식을 플랫폼 코드와 연결

---

#### 플랫폼 코드 구조 이해

**학습 자료**:
- 플랫폼 GitHub 저장소 (20-19 Orthodontics AI)
- API 코드 파일들
- 프론트엔드 구조

**코드 분석** (Day 2-4):

```
플랫폼 디렉토리 구조
├─ api/
│  ├─ extraction-ai.js (발치 판단)
│  ├─ growth-prediction.js (성장 예측)
│  ├─ recurrence.js (재발 예측)
│  ├─ login.js (로그인)
│  └─ chatbot.js (AI 챗봇)
├─ js/
│  ├─ facial-simulation-core.js
│  ├─ 3d-viewer.js
│  ├─ common.js (세션 관리)
│  └─ dashboard.js
├─ html/
│  ├─ dashboard.html (환자 대시보드)
│  ├─ diagnosis.html (진단 도구)
│  ├─ treatment-plan.html (치료 계획)
│  └─ patient-profile.html
└─ docs/
   └─ API_REFERENCE.md
```

**구체 학습**:
- Day 2: 플랫폼 주요 파일 5개 읽기 (extraction-ai.js, growth-prediction.js 등)
- Day 3: 각 파일의 입출력 데이터 흐름 파악
- Day 4: 함수별 로직 상세 분석

**학습 체크리스트**:
```
□ 플랫폼 전체 파일 구조 이해
□ 4대 API 파일 위치 및 기능 파악
□ 각 API의 주요 함수 3개 이상 설명 가능
□ 데이터베이스 스키마 이해
□ 프론트엔드-백엔드 통신 흐름 파악
```

---

#### 버그 분석 & 수정 실습

**활동** (Day 5-7):

**버그 탐지 방법**:
1. **로그 분석**: 플랫폼 에러 로그 확인
2. **성능 모니터링**: API 응답 시간 분석
3. **임상 피드백**: 사용자 보고된 오류
4. **코드 리뷰**: 잠재적 버그 찾기

**버그 수정 실습** (3가지 유형):

**Type A: 로직 버그**
```javascript
// 예: Extraction AI 공간분석 계산 오류
// 원본 코드 (버그 있음)
const space_deficit = total_tooth_width - available_space;
if (space_deficit > 4) {
  return "extraction_required";
}
// 문제: AND 조건이 누락됨 (성장량도 고려해야 함)

// 수정 코드
const space_deficit = total_tooth_width - available_space;
const growth_potential = calculateGrowthPotential(cvms, age);
if (space_deficit > 4 && growth_potential < 2) {
  return "extraction_required"; // 성장 여유 < 2mm이고 공간 부족 > 4mm일 때만
}
```

**Type B: 데이터 타입 오류**
```javascript
// 예: CVMS stage 비교
// 버그: 문자열 비교
if (cvms_stage > "5") { ... } // 문제: "5" > "6"은 true! (문자열 비교)

// 수정
const cvms_value = parseInt(cvms_stage);
if (cvms_value > 5) { ... }
```

**Type C: 경계 조건 버그**
```javascript
// 예: 재발 예측 범위 체크
// 버그: 상한값 체크 없음
if (risk_score < 0) risk_score = 0;
// 문제: risk_score가 100을 넘을 수 있음!

// 수정
risk_score = Math.max(0, Math.min(100, risk_score));
```

**실습 과제**:
- 플랫폼 코드에서 버그 3개 찾기 및 분석
- 각 버그의 영향도 (심각성) 평가
- 수정 코드 작성 및 테스트

---

### **Week 2: 알고리즘 개선 & 새 기능 기획 (Day 8-14)**

#### 알고리즘 개선 분석

**학습 자료**:
- 임상 케이스 데이터 (100+ 사례)
- AI 엔진 성능 리포트
- 임상의 피드백

**개선 기회 식별** (Day 8-10):

**1. Extraction AI 개선**
```
현재 로직의 한계:
├─ 혼합치열기 분석만 가능 (영구치열기 미지원)
├─ 비뚤어진 치아 크기 측정 미지원
└─ 환자별 개인차 반영 부족

개선 제안:
├─ 영구치열기 발치 판단 알고리즘 추가
├─ AI 이미지 인식으로 치아 크기 자동 측정
└─ 유전 정보 + 부모 턱 크기 학습 모델 추가
```

**2. Growth Prediction 개선**
```
현재 로직의 한계:
├─ 선형 성장 가정 (실제는 비선형)
├─ 성인 초기 환자는 성장 예측 불가
└─ 호르몬 요인 미반영

개선 제안:
├─ 성장 속도 곡선 (Gompertz 모델) 도입
├─ 사춘기 피크 타이밍 개선 알고리즘
└─ 내분비 데이터 통합 옵션 추가
```

**3. Facial Simulation 개선**
```
현재 로직의 한계:
├─ 2D 안모 사진만 입력 가능 (3D 미지원)
├─ 잇몸 라인 변화 미반영
└─ 코 모양 변화 미반영

개선 제안:
├─ 3D 스캔 데이터 지원
├─ 잇몸선 후퇴 예측 모델 추가
└─ 비성형 치료의 영향 분석 추가
```

**4. Recurrence Prediction 개선**
```
현재 로직의 한계:
├─ 정적 위험 점수 (개인별 추적 불가)
├─ 유지 방법 순응도 미반영
└─ 임플란트 보철의 영향 미반영

개선 제안:
├─ 실시간 모니터링 데이터 통합
├─ 환자 순응도 알고리즘 추가
└─ 복합 보철 케이스 지원
```

**실습 과제** (Day 8-10):
1. 현재 AI 엔진의 성능 데이터 분석
2. 임상 요구사항 정리 (의사 인터뷰)
3. 개선 아이디어 문서화 (5개 이상)
4. 구현 우선순위 평가

---

#### 새 기능 기획

**기획 방법론** (Day 11-12):

**Phase 1: 문제 정의**
```
질문:
1. 현재 플랫폼에서 해결하지 못하는 임상 문제는?
2. 의료진이 반복적으로 하는 수작업은?
3. 환자 만족도를 높일 수 있는 기능은?

예시: Open Bite 환자는 재발 위험이 높은데
      현재 플랫폼은 특수 대책이 없다.
      → Open Bite 전용 진단 및 예방 기능 필요
```

**Phase 2: 솔루션 설계**
```
기능: Open Bite 진단 및 예방 시스템
├─ Input:
│  ├─ 환자 나이, 성별
│  ├─ 측면 두부 X선 (vertical dimension)
│  ├─ 저작근 상태 분석
│  └─ 혀 용적 및 위치
├─ AI 분석:
│  ├─ Open bite 원인 3가지 식별
│  │  ├─ 골격 원인 (vertical growth pattern)
│  │  ├─ 기능 원인 (low tongue position)
│  │  └─ 습관 원인 (thumb sucking, tongue thrust)
│  └─ 각 원인별 치료 방향 제시
└─ Output:
   ├─ Open bite 진단 보고서
   ├─ 예방 방법 가이드
   ├─ 치료 계획 제안
   └─ 예상 치료 기간 및 재발 위험도
```

**Phase 3: 기술 스펙 작성**
```
Function: analyzeBiteOpening()

입력:
- patientId: string
- cephalometricData: { 
    AFH, PFH, ANS-Xi-Pm, PP-MP angle, ... 
  }
- functionalData: {
    tongueTip.x, tongueTip.y,
    masticatoryMuscleActivity,
    swallowPattern
  }

출력:
- biteOpeningAnalysis: {
    severity: "mild|moderate|severe",
    causes: [
      { type: "skeletal", probability: 0.7 },
      { type: "functional", probability: 0.2 },
      { type: "habitual", probability: 0.1 }
    ],
    treatmentPlan: [
      { phase: 1, duration: "3-6 months", method: "..." },
      { phase: 2, duration: "6-12 months", method: "..." }
    ],
    relapseProbability: { 1y: 0.65, 3y: 0.75, 5y: 0.82 }
  }

에러 처리:
- MissingDataError: 필수 입력값 부족
- InvalidDataError: 데이터 범위 초과
```

**실습 과제** (Day 11-12):
1. 새 기능 5개 제안
2. 각 기능별 상세 설계 문서 (1개 선택)
3. API 명세 작성
4. 구현 예상 기간 및 난이도 평가

---

#### 성능 최적화 & 확장

**분석** (Day 13-14):

**성능 최적화 영역**:
```
1. API 응답 시간
   현재: 평균 2-3초
   목표: < 1초
   방법:
   ├─ 이미지 전처리 병렬화
   ├─ 계산 결과 캐싱
   └─ 데이터베이스 쿼리 최적화

2. 메모리 사용량
   현재: 3D 시뮬레이션 시 250MB+
   목표: < 100MB
   방법:
   ├─ 메시 단순화
   ├─ 스트리밍 처리
   └─ 메모리 풀링

3. 확장성 (동시 사용자)
   현재: 10명 동시 사용 가능
   목표: 100명 동시 사용
   방법:
   ├─ 마이크로서비스 아키텍처
   ├─ 로드 밸런싱
   └─ 캐싱 레이어 추가
```

**기술 부채 정리**:
```
심각도 높음:
□ 레거시 코드 리팩토링 (10시간)
□ 단위 테스트 추가 (8시간)
□ 문서 업데이트 (4시간)

중간:
□ 에러 핸들링 개선 (6시간)
□ 로깅 체계 정비 (4시간)

낮음:
□ 코드 스타일 통일 (3시간)
```

---

## 📋 Week 3 선택 심화 주제

### Option A: 임상 데이터 분석
- 100+ 케이스 데이터 수집 및 정제
- AI 엔진 정확도 검증
- 임상 피드백 반영 알고리즘 개선

### Option B: 신 AI 모델 개발
- 머신러닝 기초 학습
- 기존 알고리즘을 ML 모델로 변환
- 모델 학습 및 검증

### Option C: 플랫폼 확장 기능
- 다국어 지원 추가
- 모바일 앱 개발
- 클라우드 배포 설정

### Option D: 임상 가이드 작성
- 플랫폼 사용 매뉴얼
- 임상의를 위한 교육 영상
- 환자용 설명 자료

---

## 💡 실제 개발 워크플로

### 아이디어 → 구현 → 배포

```
Step 1: 요구사항 정의 (1일)
├─ 임상의 인터뷰
├─ 기술 실현성 검토
└─ 우선순위 결정

Step 2: 상세 설계 (2-3일)
├─ 알고리즘 설계
├─ API 명세 작성
└─ 테스트 계획 수립

Step 3: 구현 (3-5일)
├─ 백엔드 API 개발
├─ 프론트엔드 연동
└─ 단위 테스트

Step 4: QA 및 검증 (2-3일)
├─ 임상 데이터 테스트
├─ 의사 검증
└─ 버그 수정

Step 5: 배포 (1일)
├─ 스테이징 배포
├─ 모니터링
└─ 프로덕션 배포
```

### 예시: Growth Prediction 성인 지원 기능

**Step 1: 요구사항** (1일)
```
문제: 18세 이상 성인 환자는 성장 예측 불가
      → 많은 성인 환자의 나이별 치료 계획 불가

요구사항:
- 성인 초기(18-22세)도 미소 성장 가능성 지원
- 경추 성숙도가 8단계여도 성장 경향 분석
- 성별/유전 요인 포함한 개인화 분석
```

**Step 2: 설계** (2일)
```
Algorithm: Adult Growth Remnant Analysis

입력:
- currentCephalometricValues
- historicalData (과거 2년 X선)
- age (18-30)
- gender
- familyHeightTrend

분석:
1. 과거 연 성장률 계산 (mm/year)
2. 성인기 성장 감속 곡선 적용
3. 개인별 성장 잠재력 점수화

출력:
- remainingGrowthPotential: 0.5-2.0mm
- growthDirection: anterior|posterior|vertical|mixed
- confidenceScore: 40-70%
- recommendation: "conservative 계획" or "aggresive 계획"
```

**Step 3: 구현** (4일)
```javascript
// api/growth-prediction.js - 신규 함수 추가
async function analyzeAdultGrowthRemnant(patientData) {
  // 1. 과거 성장률 계산
  const historicalGrowthRate = calculateHistoricalGrowth(
    patientData.historicalCephalometrics
  );
  
  // 2. 성인기 감속 계수
  const decelerationFactor = getAdultDecelerationFactor(
    patientData.age,
    patientData.gender
  );
  
  // 3. 잠재력 계산
  const remainingGrowth = historicalGrowthRate * decelerationFactor;
  
  // 4. 방향 분석
  const growthVector = analyzeGrowthVector(
    patientData.currentCephalometrics,
    patientData.historicalCephalometrics
  );
  
  return {
    remainingGrowth,
    growthVector,
    confidenceScore: calculateConfidence(patientData),
    recommendation: generateRecommendation(remainingGrowth, growthVector)
  };
}
```

**Step 4: QA** (2일)
```
테스트 케이스:
1. 18세 남성, 과거 1년 3mm 성장
   → 예상: 0.5-1mm 성장 가능성, 60% 신뢰도
   
2. 22세 여성, 완전 성인 형태
   → 예상: < 0.5mm, 40% 신뢰도
   
3. 임상의 수동 검증: 100개 케이스
   → 정확도 > 85% 목표
```

**Step 5: 배포** (1일)
```
Version: 2.5.1 (Growth Prediction Enhancement)
Changes:
- Added adult growth analysis for patients 18-30yo
- Improved CVMS stage 8 handling
- New API endpoint: /api/growth-prediction/adult-remnant

Migration:
- 기존 성인 환자 데이터 재분석
- 의사 피드백 수집
```

---

## 🎓 이해도 자가 평가

### 플랫폼 분석 능력
```
□ 플랫폼 전체 파일 구조 설명 가능
□ 4대 API의 핵심 로직 설명 가능
□ 코드 버그 3개 이상 찾기 가능
□ 버그의 임상 영향도 평가 가능
```

### 알고리즘 개선 능력
```
□ 현재 AI 엔진의 한계 식별 가능
□ 개선 아이디어 5개 이상 제안 가능
□ 개선안의 기술 실현성 평가 가능
□ 개선 로직을 의사코드로 작성 가능
```

### 새 기능 기획 능력
```
□ 임상 요구사항 → 기술 스펙 변환 가능
□ API 명세를 상세히 작성 가능
□ 구현 일정 및 난이도 추정 가능
□ 테스트 계획 수립 가능
```

### 성능 최적화 능력
```
□ 병목 지점 식별 가능
□ 최적화 방법 제안 가능
□ 성능 개선 효과 예측 가능
```

---

## 🚀 최종 산출물

### Phase 3 완료 시 제출할 문서

**1. 플랫폼 분석 보고서** (10-15쪽)
- 현재 상태 분석
- 발견된 버그 3개
- 성능 병목 3개
- 개선 제안 5개

**2. 알고리즘 개선 제안서** (5-10쪽)
- 각 AI 엔진별 개선 아이디어
- 기술 실현성 평가
- 임상 효과 분석
- 우선순위 평가

**3. 신규 기능 설계 문서** (10-15쪽)
- 기능 설명 및 목적
- 사용자 스토리 5개 이상
- API 상세 명세
- 테스트 계획

**4. 코드 컨트리뷰션** (최소 1개)
- 버그 수정 1개 이상
- 또는 신규 기능 구현 1개
- 또는 성능 개선 1개

**5. 임상 가이드** (선택)
- 신 기능 사용 매뉴얼
- 의사용 설명 영상
- 환자용 설명 자료

---

## 📞 마지막 팁

### 성공적인 Phase 3를 위해

1. **실제 코드와 친해지기**
   - IDE에서 플랫폼 코드 열기
   - 라인별로 읽으면서 주석 추가
   - 로컬에서 실행해보기

2. **임상의와 대화하기**
   - 실제 진료에서 어려운 점 물어보기
   - 플랫폼 사용 경험 청취
   - 개선 아이디어 피드백

3. **점진적 난이도 상향**
   - 쉬운 버그부터 시작 (변수명 오류 등)
   - 중간 난이도 (로직 버그)
   - 복잡한 기능 (새로운 AI 엔진)

4. **문서화 습관**
   - 배운 내용 정리
   - 코드 수정할 때마다 이유 기록
   - 주간 보고서 작성

---

**기간**: 2-3주 (자신의 속도에 맞춰 조정 가능)
**최종 목표**: 플랫폼 주도적 개선·확장 가능 수준 달성!

**축하합니다!** Phase 3 완료 후 당신은:
- ✅ 교정학 깊이 있는 이해
- ✅ 플랫폼 아키텍처 완벽 파악
- ✅ 독립적 기획·개발·개선 능력

→ 플랫폼 개발 팀의 핵심 멤버로 활동 가능!

