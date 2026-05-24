// 교정학 플랫폼 - 자료 관리 시스템

// 기본 요약 슬라이드 생성 (슬라이드 제목 기반)
function generateDefaultSummaries(slideTitle) {
    const templates = {
        "안모분석 기초": [
            { title: "안모분석의 정의", subtitle: "Facial Analysis Overview", image: "images/안모분석.png", content: ["안모분석은 환자의 얼굴 특성을 객관적으로 평가하는 교정 진단의 중요한 부분입니다.", "정상 안모의 특징을 이해하고 부정교합 환자의 안모 특성을 파악합니다.", "세팔로메트릭 분석과 임상 진찰을 결합하여 종합적인 평가를 수행합니다.", "개인의 미용적 특성과 생물학적 특성을 동시에 고려합니다."], keyPoints: ["얼굴 분석", "미용성 평가", "개인 특성", "종합 진단", "심미 목표"] },
            { title: "정상 안모의 특징", subtitle: "Esthetic Characteristics", image: "images/안모분석.png", content: ["정상 안모는 특정한 미용적 특징을 가지고 있습니다.", "얼굴의 대칭성, 비율, 그리고 조화를 평가합니다.", "안면각, 입술 돌출도, 턱의 위치 등이 평가 대상입니다.", "이러한 특징들은 교정 치료의 목표 설정에 중요한 역할을 합니다."], keyPoints: ["대칭성", "비율", "조화", "입술 위치", "턱 위치"] },
            { title: "측면 분석", subtitle: "Sagittal Analysis", image: "images/안모분석.png", content: ["측면에서 본 안모 분석은 전후방 관계를 평가합니다.", "이마, 코, 입술, 턱의 위치와 돌출도를 측정합니다.", "안면각, 입술각, 턱의 각도 등을 분석합니다.", "부정교합의 골격적 특성을 파악하는 데 중요합니다."], keyPoints: ["전후방", "돌출도", "각도", "골격 특성", "미학"] },
            { title: "정면 분석", subtitle: "Frontal Analysis", image: "images/안모분석.png", content: ["정면에서 본 안모의 대칭성과 비율을 평가합니다.", "양쪽의 높이, 폭, 그리고 비대칭을 평가합니다.", "얼굴의 세로비율과 가로비율을 측정합니다.", "치열의 정렬과 미소 라인을 평가합니다."], keyPoints: ["대칭성", "비율", "정렬", "미소", "얼굴폭"] },
            { title: "안모와 교합의 관계", subtitle: "Facial-Dental Relationship", image: "images/안모분석.png", content: ["안모와 교합은 밀접한 관계가 있습니다.", "부정교합이 안모에 미치는 영향을 이해합니다.", "치료를 통한 안모 변화를 예측할 수 있습니다.", "환자의 심미적 요구와 생물학적 현실의 균형을 맞춥니다."], keyPoints: ["상관관계", "영향 평가", "변화 예측", "심미 목표", "협력"] },
            { title: "성장과 안모 변화", subtitle: "Growth and Facial Changes", image: "images/안모분석.png", content: ["성장 과정에서 안모는 변합니다.", "성장 방향에 따른 안모 변화를 예측합니다.", "수평 성장과 수직 성장의 안모적 차이를 이해합니다.", "성장기 교정 치료 계획에 이러한 예측을 반영합니다."], keyPoints: ["성장 예측", "방향", "변화", "시간적 변화", "치료 계획"] },
            { title: "개인 특성 고려", subtitle: "Individual Characteristics", image: "images/안모분석.png", content: ["각 개인의 안모 특성은 다릅니다.", "인종적, 문화적, 유전적 특성을 고려합니다.", "개인의 선호도와 미용 기준을 존중합니다.", "이를 통해 맞춤형 치료 목표를 설정합니다."], keyPoints: ["개인차", "인종 특성", "문화", "유전", "선호도"] },
            { title: "안모분석과 진단", subtitle: "Analysis to Diagnosis", image: "images/안모분석.png", content: ["안모분석 결과는 부정교합 진단에 활용됩니다.", "세팔로메트릭 분석과 통합하여 종합 진단을 수행합니다.", "안모적 특성이 부정교합의 원인이나 특성을 나타냅니다.", "이를 바탕으로 치료 계획을 수립합니다."], keyPoints: ["통합 진단", "세팔로 연결", "원인 파악", "특성 분석", "계획 수립"] },
            { title: "안모 개선의 목표", subtitle: "Aesthetic Goals", image: "images/안모분석.png", content: ["교정 치료의 주요 목표 중 하나는 안모 개선입니다.", "기능적 개선과 심미적 개선을 동시에 추구합니다.", "환자가 만족하는 결과를 달성하는 것이 중요합니다.", "이를 위해 치료 전 계획과 예측이 필수적입니다."], keyPoints: ["미학 개선", "기능성", "환자 만족", "예측", "결과"] },
            { title: "안모분석 실습", subtitle: "Practical Application", image: "images/안모분석.png", content: ["이론을 바탕으로 실제 환자 케이스에 적용합니다.", "다양한 안모 유형을 분석하고 분류합니다.", "각 케이스에 맞는 분석 기법을 적용합니다.", "다음 단계인 세팔로메트릭 분석으로 진행합니다."], keyPoints: ["실습", "케이스 분석", "기법 적용", "분류", "다음 단계"] }
        ],
        "세팔로메트릭 분석": Array.from({length: 10}, (_, i) => ({
            title: `세팔로 분석 ${i+1}`,
            subtitle: "Cephalometric Landmarks",
            image: "images/세팔로.png",
            content: [
                "세팔로메트릭 분석은 교정 진단의 핵심 도구입니다.",
                "두부 X선 사진에서 특정 점과 선을 표시하여 분석합니다.",
                "해부학적 구조의 정확한 위치와 각도를 측정합니다.",
                "이를 통해 골격과 치아의 3차원적 관계를 파악합니다."
            ],
            keyPoints: ["X선 분석", "랜드마크", "각도", "거리", "비율"]
        })),
        "성장 예측": Array.from({length: 10}, (_, i) => ({
            title: `성장 예측 ${i+1}`,
            subtitle: "Growth Prediction Methods",
            image: "images/성장예측.png",
            content: [
                "성장 예측은 교정 치료 계획의 기초입니다.",
                "이전 성장 기록으로부터 향후 성장을 예측합니다.",
                "각 환자의 성장 양상과 방향을 파악합니다.",
                "이를 바탕으로 최적의 치료 시기를 결정합니다."
            ],
            keyPoints: ["성장률", "예측식", "방향", "시간", "계획"]
        }))
    };

    if (templates[slideTitle]) {
        return templates[slideTitle];
    }

    return Array.from({length: 10}, (_, i) => ({
        title: `${slideTitle} - 주제 ${i+1}`,
        subtitle: "Learning Content",
        image: "images/default.png",
        content: [
            `이 슬라이드의 핵심 개념 ${i+1}을 학습합니다.`,
            `${slideTitle}과 관련된 중요한 특성과 원리를 이해합니다.`,
            `임상적 적용과 실무에서의 활용 방법을 배웁니다.`,
            `다음 단계의 학습으로 나아가기 위한 기초를 다집니다.`
        ],
        keyPoints: ["핵심개념", "이해", "적용", "실무", "진행"]
    }));
}

// 각 슬라이드의 10개 요약 슬라이드 생성 (실제 학습 내용 포함)
function generateSummarySlidesForSlide(slideId, slideTitle) {
    const slides = {
        1: generateDefaultSummaries("EZM 개념의 정의 및 역사"),
        2: generateDefaultSummaries("정상교합의 특징"),
        3: generateDefaultSummaries("부정교합의 분류"),
        4: generateDefaultSummaries("성장 패턴 분석"),
        5: generateDefaultSummaries("진단의 기초"),
        6: generateDefaultSummaries("공간분석 입문"),
        7: generateDefaultSummaries("공간분석 심화"),
        8: generateDefaultSummaries("발치 판단 기준"),
        9: generateDefaultSummaries("안모분석 기초"),
        10: generateDefaultSummaries("세팔로메트릭 분석"),
        11: generateDefaultSummaries("성장 예측"),
        12: generateDefaultSummaries("성장 방향 분석"),
        13: generateDefaultSummaries("Class I 진단"),
        14: generateDefaultSummaries("Class II 진단"),
        15: generateDefaultSummaries("Class III 진단"),
        16: generateDefaultSummaries("수직 부정교합"),
        17: generateDefaultSummaries("수평 부정교합"),
        18: generateDefaultSummaries("치료계획 수립"),
        19: generateDefaultSummaries("치료 방법론"),
        20: generateDefaultSummaries("장치 선택"),
        21: generateDefaultSummaries("Case Study 1"),
        22: generateDefaultSummaries("Case Study 2"),
        23: generateDefaultSummaries("Case Study 3"),
        24: generateDefaultSummaries("AI 진단 개론"),
        25: generateDefaultSummaries("GEO-AIO 소개"),
        26: generateDefaultSummaries("AI 진단 프로세스"),
        27: generateDefaultSummaries("AI 검증 방법"),
        28: generateDefaultSummaries("플랫폼 도입 사례 1"),
        29: generateDefaultSummaries("플랫폼 도입 사례 2"),
        30: generateDefaultSummaries("플랫폼 도입 사례 3"),
        31: generateDefaultSummaries("고급 진단 기법"),
        32: generateDefaultSummaries("3D 분석"),
        33: generateDefaultSummaries("CBCT 활용"),
        34: generateDefaultSummaries("디지털 계획"),
        35: generateDefaultSummaries("AI 통합 워크플로우"),
        36: generateDefaultSummaries("복합 부정교합"),
        37: generateDefaultSummaries("성인 케이스"),
        38: generateDefaultSummaries("수술 병합 케이스"),
        39: generateDefaultSummaries("미니스크류 활용"),
        40: generateDefaultSummaries("심미성 최적화"),
        41: generateDefaultSummaries("미소 디자인"),
        42: generateDefaultSummaries("리테이너 관리"),
        43: generateDefaultSummaries("장기 안정성"),
        44: generateDefaultSummaries("임상 토론 1"),
        45: generateDefaultSummaries("임상 토론 2")
    };

    return slides[slideId] || [];
}

const resourcesData = {
    slides: [
        { id: 1, title: "슬라이드 1", desc: "EZM 개념의 정의 및 역사", phase: "Phase 1", category: "기초 개념", file: "slides/01_EZM_개념.pdf" },
        { id: 2, title: "슬라이드 2", desc: "정상교합의 특징", phase: "Phase 1", category: "기초 개념", file: "slides/02_정상교합.pdf" },
        { id: 3, title: "슬라이드 3", desc: "부정교합의 분류", phase: "Phase 1", category: "기초 개념", file: "slides/03_부정교합분류.pdf" },
        { id: 4, title: "슬라이드 4", desc: "성장 패턴 분석", phase: "Phase 1", category: "기초 개념", file: "slides/04_성장패턴.pdf" },
        { id: 5, title: "슬라이드 5", desc: "진단의 기초", phase: "Phase 1", category: "기초 개념", file: "slides/05_진단기초.pdf" },
        { id: 6, title: "슬라이드 6", desc: "공간분석 입문", phase: "Phase 2", category: "공간분석", file: "slides/06_공간분석1.pdf" },
        { id: 7, title: "슬라이드 7", desc: "공간분석 심화", phase: "Phase 2", category: "공간분석", file: "slides/07_공간분석2.pdf" },
        { id: 8, title: "슬라이드 8", desc: "발치 판단 기준", phase: "Phase 2", category: "공간분석", file: "slides/08_발치판단.pdf" },
        { id: 9, title: "슬라이드 9", desc: "안모분석 기초", phase: "Phase 2", category: "안모분석", file: "slides/09_안모분석1.pdf" },
        { id: 10, title: "슬라이드 10", desc: "세팔로메트릭 분석", phase: "Phase 2", category: "안모분석", file: "slides/10_세팔로.pdf" },
        { id: 11, title: "슬라이드 11", desc: "성장 예측", phase: "Phase 2", category: "성장예측", file: "slides/11_성장예측.pdf" },
        { id: 12, title: "슬라이드 12", desc: "성장 방향 분석", phase: "Phase 2", category: "성장예측", file: "slides/12_성장방향.pdf" },
        { id: 13, title: "슬라이드 13", desc: "Class I 진단", phase: "Phase 2", category: "부정교합진단", file: "slides/13_ClassI.pdf" },
        { id: 14, title: "슬라이드 14", desc: "Class II 진단", phase: "Phase 2", category: "부정교합진단", file: "slides/14_ClassII.pdf" },
        { id: 15, title: "슬라이드 15", desc: "Class III 진단", phase: "Phase 2", category: "부정교합진단", file: "slides/15_ClassIII.pdf" },
        { id: 16, title: "슬라이드 16", desc: "수직 부정교합", phase: "Phase 2", category: "부정교합진단", file: "slides/16_수직.pdf" },
        { id: 17, title: "슬라이드 17", desc: "수평 부정교합", phase: "Phase 2", category: "부정교합진단", file: "slides/17_수평.pdf" },
        { id: 18, title: "슬라이드 18", desc: "치료계획 수립", phase: "Phase 2", category: "치료계획", file: "slides/18_치료계획1.pdf" },
        { id: 19, title: "슬라이드 19", desc: "치료 방법론", phase: "Phase 2", category: "치료계획", file: "slides/19_치료계획2.pdf" },
        { id: 20, title: "슬라이드 20", desc: "장치 선택", phase: "Phase 2", category: "치료계획", file: "slides/20_장치선택.pdf" },
        { id: 21, title: "슬라이드 21", desc: "Case Study 1", phase: "Phase 2", category: "케이스분석", file: "slides/21_Case1.pdf" },
        { id: 22, title: "슬라이드 22", desc: "Case Study 2", phase: "Phase 2", category: "케이스분석", file: "slides/22_Case2.pdf" },
        { id: 23, title: "슬라이드 23", desc: "Case Study 3", phase: "Phase 2", category: "케이스분석", file: "slides/23_Case3.pdf" },
        { id: 24, title: "슬라이드 24", desc: "AI 진단 개론", phase: "Phase 3", category: "AI플랫폼", file: "slides/24_AI개론.pdf" },
        { id: 25, title: "슬라이드 25", desc: "GEO-AIO 소개", phase: "Phase 3", category: "AI플랫폼", file: "slides/25_GEO_AIO.pdf" },
        { id: 26, title: "슬라이드 26", desc: "AI 진단 프로세스", phase: "Phase 3", category: "AI플랫폼", file: "slides/26_AI프로세스.pdf" },
        { id: 27, title: "슬라이드 27", desc: "AI 검증 방법", phase: "Phase 3", category: "AI플랫폼", file: "slides/27_AI검증.pdf" },
        { id: 28, title: "슬라이드 28", desc: "플랫폼 도입 사례 1", phase: "Phase 3", category: "도입사례", file: "slides/28_도입1.pdf" },
        { id: 29, title: "슬라이드 29", desc: "플랫폼 도입 사례 2", phase: "Phase 3", category: "도입사례", file: "slides/29_도입2.pdf" },
        { id: 30, title: "슬라이드 30", desc: "플랫폼 도입 사례 3", phase: "Phase 3", category: "도입사례", file: "slides/30_도입3.pdf" },
        { id: 31, title: "슬라이드 31", desc: "고급 진단 기법", phase: "Phase 2", category: "고급주제", file: "slides/31_고급진단.pdf" },
        { id: 32, title: "슬라이드 32", desc: "3D 분석", phase: "Phase 3", category: "고급주제", file: "slides/32_3D분석.pdf" },
        { id: 33, title: "슬라이드 33", desc: "CBCT 활용", phase: "Phase 3", category: "고급주제", file: "slides/33_CBCT.pdf" },
        { id: 34, title: "슬라이드 34", desc: "디지털 계획", phase: "Phase 3", category: "고급주제", file: "slides/34_디지털계획.pdf" },
        { id: 35, title: "슬라이드 35", desc: "AI 통합 워크플로우", phase: "Phase 3", category: "고급주제", file: "slides/35_통합워크플로우.pdf" },
        { id: 36, title: "슬라이드 36", desc: "복합 부정교합", phase: "Phase 2", category: "특수케이스", file: "slides/36_복합.pdf" },
        { id: 37, title: "슬라이드 37", desc: "성인 케이스", phase: "Phase 2", category: "특수케이스", file: "slides/37_성인.pdf" },
        { id: 38, title: "슬라이드 38", desc: "수술 병합 케이스", phase: "Phase 3", category: "특수케이스", file: "slides/38_수술.pdf" },
        { id: 39, title: "슬라이드 39", desc: "미니스크류 활용", phase: "Phase 3", category: "특수케이스", file: "slides/39_미니스크류.pdf" },
        { id: 40, title: "슬라이드 40", desc: "심미성 최적화", phase: "Phase 2", category: "심미치료", file: "slides/40_심미.pdf" },
        { id: 41, title: "슬라이드 41", desc: "미소 디자인", phase: "Phase 3", category: "심미치료", file: "slides/41_미소디자인.pdf" },
        { id: 42, title: "슬라이드 42", desc: "리테이너 관리", phase: "Phase 2", category: "유지관리", file: "slides/42_리테이너.pdf" },
        { id: 43, title: "슬라이드 43", desc: "장기 안정성", phase: "Phase 3", category: "유지관리", file: "slides/43_안정성.pdf" },
        { id: 44, title: "슬라이드 44", desc: "임상 토론 1", phase: "Phase 3", category: "토론", file: "slides/44_토론1.pdf" },
        { id: 45, title: "슬라이드 45", desc: "임상 토론 2", phase: "Phase 3", category: "토론", file: "slides/45_토론2.pdf" }
    ],
    textbooks: [
        { id: 1, title: "교과서 1", desc: "정상교합과 성장 개론", phase: "Phase 1", publisher: "명문출판", file: "documents/textbook_01_정상교합.pdf" },
        { id: 2, title: "교과서 2", desc: "치아 배열의 원리", phase: "Phase 1", publisher: "명문출판", file: "documents/textbook_02_치아배열.pdf" },
        { id: 3, title: "교과서 3", desc: "공간분석 이론", phase: "Phase 2", publisher: "명문출판", file: "documents/textbook_03_공간분석.pdf" },
        { id: 4, title: "교과서 4", desc: "안모분석 및 성장예측", phase: "Phase 2", publisher: "명문출판", file: "documents/textbook_04_안모분석.pdf" },
        { id: 5, title: "교과서 5", desc: "부정교합의 원인과 분류", phase: "Phase 2", publisher: "명문출판", file: "documents/textbook_05_부정교합.pdf" },
        { id: 6, title: "교과서 6", desc: "수직 부정교합 진단", phase: "Phase 2", publisher: "명문출판", file: "documents/textbook_06_수직.pdf" },
        { id: 7, title: "교과서 7", desc: "수평 부정교합 치료", phase: "Phase 2", publisher: "명문출판", file: "documents/textbook_07_수평.pdf" },
        { id: 8, title: "교과서 8", desc: "치료 계획 수립", phase: "Phase 2", publisher: "명문출판", file: "documents/textbook_08_치료계획.pdf" },
        { id: 9, title: "교과서 9", desc: "보정력과 력학", phase: "Phase 2", publisher: "명문출판", file: "documents/textbook_09_력학.pdf" },
        { id: 10, title: "교과서 10", desc: "보정치료의 실제", phase: "Phase 2", publisher: "명문출판", file: "documents/textbook_10_치료실제.pdf" },
        { id: 11, title: "교과서 11", desc: "유지와 안정성", phase: "Phase 2", publisher: "명문출판", file: "documents/textbook_11_유지.pdf" }
    ],
    videos: [
        { id: 1, title: "영상 1", desc: "EZM 기초 개념 설명", phase: "Phase 1", duration: "45분", file: "https://youtube.com/watch?v=example1" },
        { id: 2, title: "영상 2", desc: "공간분석 실습", phase: "Phase 2", duration: "60분", file: "https://youtube.com/watch?v=example2" },
        { id: 3, title: "영상 3", desc: "케이스 분석 워크숍", phase: "Phase 2", duration: "90분", file: "https://youtube.com/watch?v=example3" },
        { id: 4, title: "영상 4", desc: "플랫폼 사용법", phase: "Phase 3", duration: "30분", file: "https://youtube.com/watch?v=example4" }
    ],
    presentations: [
        { id: 1, title: "프레젠테이션 1", desc: "Deep Bite 케이스 분석", phase: "Phase 2", type: "임상사례", file: "documents/presentation_01_DeepBite.pptx" },
        { id: 2, title: "프레젠테이션 2", desc: "Open Bite 치료 결과", phase: "Phase 2", type: "임상사례", file: "documents/presentation_02_OpenBite.pptx" },
        { id: 3, title: "프레젠테이션 3", desc: "Class II 부정교합 사례", phase: "Phase 2", type: "임상사례", file: "documents/presentation_03_ClassII.pptx" },
        { id: 4, title: "프레젠테이션 4", desc: "Class III 부정교합 사례", phase: "Phase 2", type: "임상사례", file: "documents/presentation_04_ClassIII.pptx" },
        { id: 5, title: "프레젠테이션 5", desc: "전후방 치조골 부족", phase: "Phase 2", type: "임상사례", file: "documents/presentation_05_치조골.pptx" },
        { id: 6, title: "프레젠테이션 6", desc: "성인 복합 부정교합", phase: "Phase 2", type: "임상사례", file: "documents/presentation_06_성인.pptx" },
        { id: 7, title: "프레젠테이션 7", desc: "GEO-AIO 도입 사례 1", phase: "Phase 3", type: "도입사례", file: "documents/presentation_07_도입1.pptx" },
        { id: 8, title: "프레젠테이션 8", desc: "GEO-AIO 도입 사례 2", phase: "Phase 3", type: "도입사례", file: "documents/presentation_08_도입2.pptx" },
        { id: 9, title: "프레젠테이션 9", desc: "GEO-AIO 도입 사례 3", phase: "Phase 3", type: "도입사례", file: "documents/presentation_09_도입3.pptx" }
    ],
    documents: [
        { id: 1, title: "문서 1", desc: "EZM 연구논문", phase: "Phase 1", type: "논문", file: "documents/research_01_EZM.pdf" },
        { id: 2, title: "문서 2", desc: "공간분석 가이드", phase: "Phase 2", type: "가이드", file: "documents/guide_01_공간분석.pdf" },
        { id: 3, title: "문서 3", desc: "진단 체크리스트", phase: "Phase 1", type: "참고자료", file: "documents/checklist_진단.pdf" },
        { id: 4, title: "문서 4", desc: "치료계획 템플릿", phase: "Phase 2", type: "템플릿", file: "documents/template_치료계획.docx" },
        { id: 5, title: "문서 5", desc: "케이스 리뷰 양식", phase: "Phase 2", type: "양식", file: "documents/form_케이스리뷰.pdf" },
        { id: 6, title: "문서 6", desc: "성장 예측 표", phase: "Phase 2", type: "참고자료", file: "documents/table_성장예측.xlsx" },
        { id: 7, title: "문서 7", desc: "세팔로메트릭 기준값", phase: "Phase 2", type: "참고자료", file: "documents/reference_세팔로.pdf" },
        { id: 8, title: "문서 8", desc: "부정교합 분류표", phase: "Phase 1", type: "참고자료", file: "documents/classification_부정교합.pdf" },
        { id: 9, title: "문서 9", desc: "AI 진단 가이드", phase: "Phase 3", type: "가이드", file: "documents/guide_AI진단.pdf" },
        { id: 10, title: "문서 10", desc: "플랫폼 사용자 매뉴얼", phase: "Phase 3", type: "매뉴얼", file: "documents/manual_플랫폼.pdf" },
        { id: 11, title: "문서 11", desc: "윤리 가이드라인", phase: "Phase 1", type: "가이드", file: "documents/guide_윤리.pdf" },
        { id: 12, title: "문서 12", desc: "환자 동의서", phase: "Phase 2", type: "양식", file: "documents/form_동의서.pdf" },
        { id: 13, title: "문서 13", desc: "치료 결과 기록", phase: "Phase 2", type: "양식", file: "documents/form_결과기록.pdf" },
        { id: 14, title: "문서 14", desc: "학습 목표", phase: "Phase 1", type: "참고자료", file: "documents/objectives_학습목표.pdf" },
        { id: 15, title: "문서 15", desc: "임상 근거", phase: "Phase 2", type: "논문", file: "documents/evidence_임상근거.pdf" },
        { id: 16, title: "문서 16", desc: "비용-효율 분석", phase: "Phase 3", type: "참고자료", file: "documents/analysis_비용효율.pdf" },
        { id: 17, title: "문서 17", desc: "FAQ 모음", phase: "Phase 3", type: "참고자료", file: "documents/faq_자주묻는질문.pdf" },
        { id: 18, title: "문서 18", desc: "용어 사전", phase: "Phase 1", type: "참고자료", file: "documents/glossary_용어.pdf" },
        { id: 19, title: "문서 19", desc: "참고문헌 목록", phase: "Phase 2", type: "참고자료", file: "documents/references_참고문헌.pdf" },
        { id: 20, title: "문서 20", desc: "학습 계획안", phase: "Phase 1", type: "가이드", file: "documents/guide_학습계획.pdf" },
        { id: 21, title: "문서 21", desc: "개선 제안", phase: "Phase 3", type: "피드백", file: "documents/feedback_제안.pdf" }
    ]
};

let currentSummaryIndex = 0;
let currentSummarySlides = [];

function openResourceDetail(type, id) {
    const resources = resourcesData[type];
    const resource = resources.find(r => r.id === id);

    if (!resource) return;

    const modal = document.getElementById('resourceModal');
    const content = document.getElementById('resourceDetail');

    if (type === 'slides') {
        currentSummarySlides = generateSummarySlidesForSlide(id, resource.title);
        currentSummaryIndex = 0;
        showSummarySlide();
    } else {
        const html = `
            <div style="text-align: center; padding: 20px;">
                <h2>${resource.title}</h2>
                <p>${resource.desc}</p>
                <p style="color: #666; font-size: 13px; margin: 10px 0;">파일: ${resource.file}</p>
            </div>
        `;
        content.innerHTML = html;
        modal.classList.add('show');
    }
}

function showSummarySlide() {
    const modal = document.getElementById('resourceModal');
    const content = document.getElementById('resourceDetail');

    if (!currentSummarySlides || currentSummarySlides.length === 0) return;

    const slide = currentSummarySlides[currentSummaryIndex];
    const html = `
        <div style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h2 style="margin: 0; color: #0066CC;">${slide.title}</h2>
                <span style="font-size: 12px; color: #666;">${currentSummaryIndex + 1} / ${currentSummarySlides.length}</span>
            </div>
            <p style="color: #666; font-size: 14px; margin: 10px 0;">${slide.subtitle}</p>
            <div style="margin: 20px 0;">
                ${slide.content.map(p => `<p style="line-height: 1.6; margin: 10px 0;">${p}</p>`).join('')}
            </div>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
                <strong style="color: #0066CC;">핵심 포인트:</strong>
                <ul style="list-style: none; padding: 0; margin: 10px 0;">
                    ${slide.keyPoints.map(point => `<li style="padding: 5px 0;">• ${point}</li>`).join('')}
                </ul>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                <button onclick="previousSummarySlide()" style="padding: 10px 20px; background: #e5e7eb; border: none; border-radius: 4px; cursor: pointer;">← 이전</button>
                <button onclick="jumpToSummarySlide(0)" style="padding: 8px 12px; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; font-size: 12px;">처음</button>
                <button onclick="nextSummarySlide()" style="padding: 10px 20px; background: #0066CC; color: white; border: none; border-radius: 4px; cursor: pointer;">다음 →</button>
            </div>
        </div>
    `;

    content.innerHTML = html;
    modal.classList.add('show');
    setupSummaryKeyboardNavigation();
}

function jumpToSummarySlide(index) {
    if (index >= 0 && index < currentSummarySlides.length) {
        currentSummaryIndex = index;
        showSummarySlide();
    }
}

function nextSummarySlide() {
    if (currentSummaryIndex < currentSummarySlides.length - 1) {
        currentSummaryIndex++;
        showSummarySlide();
    }
}

function previousSummarySlide() {
    if (currentSummaryIndex > 0) {
        currentSummaryIndex--;
        showSummarySlide();
    }
}

function setupSummaryKeyboardNavigation() {
    document.removeEventListener('keydown', handleSummaryKeydown);
    document.addEventListener('keydown', handleSummaryKeydown);
}

function handleSummaryKeydown(event) {
    if (event.key === 'ArrowRight') nextSummarySlide();
    if (event.key === 'ArrowLeft') previousSummarySlide();
}

function removeSummaryKeyboardNavigation() {
    document.removeEventListener('keydown', handleSummaryKeydown);
}

function closeResourceModal() {
    const modal = document.getElementById('resourceModal');
    modal.classList.remove('show');
    removeSummaryKeyboardNavigation();
}

function downloadResource(filePath) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 리소스 페이지 초기화
document.addEventListener('DOMContentLoaded', () => {
    const slidesGrid = document.querySelector('[data-resource="slides"]');
    if (slidesGrid) {
        let html = '';
        resourcesData.slides.forEach(slide => {
            html += `
                <div class="resource-card" onclick="openResourceDetail('slides', ${slide.id})">
                    <h4>📸 ${slide.title}</h4>
                    <p>${slide.desc}</p>
                    <span class="resource-badge">${slide.phase}</span>
                </div>
            `;
        });
        slidesGrid.innerHTML = html;
    }

    const textbooksGrid = document.querySelector('[data-resource="textbooks"]');
    if (textbooksGrid) {
        let html = '';
        resourcesData.textbooks.forEach(book => {
            html += `
                <div class="resource-card" onclick="openResourceDetail('textbooks', ${book.id})">
                    <h4>📖 ${book.title}</h4>
                    <p>${book.desc}</p>
                    <span class="resource-badge">${book.phase}</span>
                </div>
            `;
        });
        textbooksGrid.innerHTML = html;
    }

    const videosGrid = document.querySelector('[data-resource="videos"]');
    if (videosGrid) {
        let html = '';
        resourcesData.videos.forEach(video => {
            html += `
                <div class="resource-card" onclick="openResourceDetail('videos', ${video.id})">
                    <h4>🎬 ${video.title}</h4>
                    <p>${video.desc}</p>
                    <span class="resource-badge">${video.duration}</span>
                </div>
            `;
        });
        videosGrid.innerHTML = html;
    }

    const presentationsGrid = document.querySelector('[data-resource="presentations"]');
    if (presentationsGrid) {
        let html = '';
        resourcesData.presentations.forEach(pres => {
            html += `
                <div class="resource-card" onclick="openResourceDetail('presentations', ${pres.id})">
                    <h4>📊 ${pres.title}</h4>
                    <p>${pres.desc}</p>
                    <span class="resource-badge">${pres.phase}</span>
                </div>
            `;
        });
        presentationsGrid.innerHTML = html;
    }

    const documentsDiv = document.querySelector('#documents');
    const existingGrid = documentsDiv ? documentsDiv.querySelector('.resource-grid') : null;
    if (!existingGrid && documentsDiv) {
        let html = '<div class="resource-grid">';
        resourcesData.documents.forEach(doc => {
            html += `
                <div class="resource-card" onclick="openResourceDetail('documents', ${doc.id})">
                    <h4>📄 ${doc.title}</h4>
                    <p>${doc.desc}</p>
                    <span class="resource-badge">${doc.phase}</span>
                </div>
            `;
        });
        html += '</div>';
        const noteDiv = documentsDiv.querySelector('div[style*="background: #d1fae5"]');
        if (noteDiv) {
            noteDiv.insertAdjacentHTML('afterend', html);
        }
    }

    const modal = document.getElementById('resourceModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeResourceModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeResourceModal();
            }
        });
    }
});
