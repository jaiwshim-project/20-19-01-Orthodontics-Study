// 교정학 플랫폼 - 케이스 스터디 시스템

const casesData = {
    beginner: [
        {
            id: 1,
            number: "Case 1",
            title: "상악 혼잡 + Class I",
            patient: "여성, 15세",
            complaint: "앞니 혼잡",
            diagnosis: "Skeletal Class I, 상악 혼잡도 -5mm",
            treatment: "상악 4번 발치 후 고정식 교정",
            duration: "24개월",
            results: "정상교합 달성, 심미성 개선",
            imageBefore: "😁",
            imageAfter: "😊",
            difficulty: "초급",
            learningPoints: [
                "혼잡도 -5mm는 경계선 발치 대상",
                "Class I에서는 상악만 발치 가능",
                "성장기에는 심미성 우선 고려"
            ]
        },
        {
            id: 2,
            number: "Case 2",
            title: "간격 + 수직 성장",
            patient: "남성, 12세",
            complaint: "앞니 사이 틈",
            diagnosis: "Skeletal Class I, 간격도 +3mm, 수직 성장",
            treatment: "공간폐쇄 교정, 추적 관찰",
            duration: "18개월",
            results: "간격 폐쇄, 개방교합 예방",
            imageBefore: "😬",
            imageAfter: "😊",
            difficulty: "초급",
            learningPoints: [
                "수직 성장 환자는 개방교합 위험",
                "간격 폐쇄는 비발치 케이스",
                "성장 예측이 치료 방향 결정"
            ]
        },
        {
            id: 3,
            number: "Case 3",
            title: "반대교합 (Class III)",
            patient: "여성, 14세",
            complaint: "아래턱이 나온 모습",
            diagnosis: "Skeletal Class III, 반대교합",
            treatment: "상악 성장 유도 + 하악 제약",
            duration: "36개월",
            results: "정상교합 개선, 얼굴 비율 개선",
            imageBefore: "😔",
            imageAfter: "😊",
            difficulty: "초급",
            learningPoints: [
                "Class III는 성장 치료가 중요",
                "성장기 조기 개입의 효과",
                "악골 관계 분석의 우선순위"
            ]
        },
        {
            id: 4,
            number: "Case 4",
            title: "개방교합 + 혀 내밀기",
            patient: "남성, 16세",
            complaint: "앞니가 안 맞음",
            diagnosis: "개방교합, 혀 내밀기 습관",
            treatment: "습관 제거 + 수직 치료",
            duration: "28개월",
            results: "개방교합 폐쇄, 정상교합",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "초급",
            learningPoints: [
                "개방교합은 습관과 골격의 조합",
                "악습관 제거가 선행되어야 함",
                "근기능 치료의 중요성"
            ]
        },
        {
            id: 5,
            number: "Case 5",
            title: "교차교합",
            patient: "여성, 13세",
            complaint: "측방 교차교합",
            diagnosis: "교차교합, 중심선 편위",
            treatment: "확대 치료 + 교정",
            duration: "22개월",
            results: "교차교합 해결, 중심선 정상화",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "초급",
            learningPoints: [
                "교차교합은 초기 개입 필수",
                "성장기 확대 치료의 효과",
                "중심선 일치의 중요성"
            ]
        }
    ],
    intermediate: [
        {
            id: 6,
            number: "Case 6",
            title: "양측 혼잡 + Class II",
            patient: "남성, 17세",
            complaint: "심한 혼잡, 위턱 돌출",
            diagnosis: "Skeletal Class II, 상악 -6mm + 하악 -5mm",
            treatment: "양측 상악 4번 발치 + 고정식 교정",
            duration: "30개월",
            results: "정상교합, 얼굴 심미성 개선",
            imageBefore: "😭",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "양측 혼잡은 양측 발치 고려",
                "Class II에서는 상악 우선 발치",
                "성인 케이스의 복합적 고려"
            ]
        },
        {
            id: 7,
            number: "Case 7",
            title: "개방교합 + 수직 골격",
            patient: "남성, 18세",
            complaint: "앞니가 안 맞고 길쭉한 얼굴",
            diagnosis: "수직 성장 유형, 개방교합",
            treatment: "상악 이동 + 하악 회전 유도",
            duration: "32개월",
            results: "개방교합 폐쇄, 수직 치수 감소",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "수직 케이스의 복합 진단",
                "골격 개선을 위한 다차원 접근",
                "성인 골격 환자의 한계"
            ]
        },
        {
            id: 8,
            number: "Case 8",
            title: "심한 개방교합",
            patient: "여성, 19세",
            complaint: "앞니 5mm 개방, 미소선 문제",
            diagnosis: "수직 과다, 개방교합",
            treatment: "악정형+교정 병행 (설계안)",
            duration: "예상 48개월",
            results: "정상교합 가능성 높음",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "심한 개방교합의 진단",
                "수술적 개입 판단 기준",
                "성인 환자의 현실적 목표 설정"
            ]
        },
        {
            id: 9,
            number: "Case 9",
            title: "비대칭 + Class III",
            patient: "남성, 16세",
            complaint: "얼굴 비대칭, 반대교합",
            diagnosis: "수평적 비대칭, Skeletal Class III",
            treatment: "비대칭 교정 + 성장 유도",
            duration: "36개월",
            results: "비대칭 개선, 교합 정상화",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "비대칭 진단의 3D적 사고",
                "비대칭 케이스의 어려움",
                "한계와 현실적 개선 목표"
            ]
        },
        {
            id: 10,
            number: "Case 10",
            title: "복합 혼잡 + 과개교합",
            patient: "여성, 17세",
            complaint: "심한 혼잡, 교합 깊음",
            diagnosis: "혼잡도 -8mm + 과개교합 5mm",
            treatment: "발치 + 수직 치료",
            duration: "28개월",
            results: "정상 혼합, 정상 수직 피복",
            imageBefore: "😭",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "복합 케이스의 우선순위 결정",
                "과개교합의 진단과 치료",
                "여러 문제의 통합 해결"
            ]
        },
        {
            id: 11,
            number: "Case 11",
            title: "심미성 개선 (성인)",
            patient: "여성, 25세",
            complaint: "미소선, 입술 노출",
            diagnosis: "지르코니아 보철 병행 필요",
            treatment: "교정 + 미소 재설계",
            duration: "22개월",
            results: "미소선 개선, 심미성 향상",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "성인 환자의 심미 우선순위",
                "보철과의 협진",
                "미소 재설계의 개념"
            ]
        },
        {
            id: 12,
            number: "Case 12",
            title: "치주 건강이 고려된 교정",
            patient: "남성, 35세",
            complaint: "교정과 치주 건강 동시 관리",
            diagnosis: "경증 부정교합 + 치주 문제",
            treatment: "천천한 이동, 치주 전담의 협진",
            duration: "24개월",
            results: "정상교합 + 치주 건강 유지",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "성인의 치주 고려",
                "느린 이동의 필요성",
                "다학제 치료의 중요성"
            ]
        },
        {
            id: 13,
            number: "Case 13",
            title: "재치정 케이스",
            patient: "여성, 22세",
            complaint: "이전 교정 후 재발",
            diagnosis: "부정확한 최종 위치 결정",
            treatment: "세심한 재설정 + 리테이너",
            duration: "18개월",
            results: "안정적 교정 결과",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "재치정의 원인 분석",
                "리테이너의 중요성",
                "장기 안정성 관리"
            ]
        },
        {
            id: 14,
            number: "Case 14",
            title: "부분 교정",
            patient: "남성, 28세",
            complaint: "특정 부위만 교정 원함",
            diagnosis: "전치 부정교합만 해당",
            treatment: "전치 교정만 시행",
            duration: "12개월",
            results: "전치 교합 개선",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "부분 교정의 적응증",
                "대구치 위치의 중요성",
                "제한적 목표 설정"
            ]
        },
        {
            id: 15,
            number: "Case 15",
            title: "인비절라인과 고정식 혼합",
            patient: "여성, 20세",
            complaint: "미용 + 효율성 동시 필요",
            diagnosis: "혼합 장치 사용 적응",
            treatment: "인비절라인 초기 + 고정식 마무리",
            duration: "26개월",
            results: "이상적 교합 + 심미성",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "중급",
            learningPoints: [
                "장치 선택의 유연성",
                "혼합 장치의 장점과 단점",
                "환자 만족도 향상"
            ]
        }
    ],
    advanced: [
        {
            id: 16,
            number: "Case 16",
            title: "양측 Class II 비대칭",
            patient: "남성, 18세",
            complaint: "양측 Class II이나 비대칭",
            diagnosis: "복합 비대칭 + 양측 Class II",
            treatment: "3D 치료 계획, 정밀 진단",
            duration: "40개월",
            results: "복합 문제의 통합 해결",
            imageBefore: "😭",
            imageAfter: "😊",
            difficulty: "고급",
            learningPoints: [
                "3D 사고의 필요성",
                "복합 비대칭의 진단",
                "우선순위의 정교한 설정"
            ]
        },
        {
            id: 17,
            number: "Case 17",
            title: "턱 성형 + 교정 (양악 수술)",
            patient: "남성, 20세",
            complaint: "심한 골격 문제",
            diagnosis: "수직 과다 + Class II",
            treatment: "양악 수술 후 교정",
            duration: "54개월",
            results: "획기적인 골격 개선",
            imageBefore: "😭",
            imageAfter: "😊",
            difficulty: "고급",
            learningPoints: [
                "수술 교정의 계획",
                "수술과의 정확한 협진",
                "수술 후 안정화 기간"
            ]
        },
        {
            id: 18,
            number: "Case 18",
            title: "선천성 결손 + 교정",
            patient: "여성, 16세",
            complaint: "치아 선천성 결손",
            diagnosis: "상악 측절 결손 + 간격",
            treatment: "이식 또는 심미 보철 + 교정",
            duration: "36개월",
            results: "기능과 심미 동시 해결",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "고급",
            learningPoints: [
                "특수 케이스의 다학제 접근",
                "이식과 교정의 협조",
                "생물학적 한계의 이해"
            ]
        },
        {
            id: 19,
            number: "Case 19",
            title: "IMF 해제 후 교정 (악정형 수술)",
            patient: "남성, 35세",
            complaint: "악정형 수술 후 재교정",
            diagnosis: "수술 후 불안정한 교합",
            treatment: "정밀한 위치 재설정",
            duration: "20개월",
            results: "안정적 수술 결과 확보",
            imageBefore: "😐",
            imageAfter: "😊",
            difficulty: "고급",
            learningPoints: [
                "수술 후 교정의 섬세함",
                "골격 안정성의 모니터링",
                "수술의의 피드백 중요성"
            ]
        },
        {
            id: 20,
            number: "Case 20",
            title: "극도의 혼잡 + 다발성 보철",
            patient: "남성, 40세",
            complaint: "심한 혼잡 + 다수 보철 필요",
            diagnosis: "극도 복잡한 성인 케이스",
            treatment: "보철 계획과 함께 정밀 교정",
            duration: "42개월",
            results: "최적 기능과 심미 달성",
            imageBefore: "😭",
            imageAfter: "😊",
            difficulty: "고급",
            learningPoints: [
                "극도 복잡 케이스의 우선순위",
                "성인 케이스의 현실성",
                "다학제 협력의 극치"
            ]
        }
    ]
};

let currentCaseFilter = 'all';

// 케이스 필터링
function filterCases(category) {
    currentCaseFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    loadCases();
}

// 케이스 로드
function loadCases() {
    const casesGrid = document.getElementById('casesGrid');
    let cases = [];

    if (currentCaseFilter === 'all') {
        cases = [...casesData.beginner, ...casesData.intermediate, ...casesData.advanced];
    } else if (currentCaseFilter === 'beginner') {
        cases = casesData.beginner;
    } else if (currentCaseFilter === 'intermediate') {
        cases = casesData.intermediate;
    } else if (currentCaseFilter === 'advanced') {
        cases = casesData.advanced;
    }

    let html = '';
    cases.forEach(c => {
        const difficultyColor = c.difficulty === '초급' ? '#e0f2fe' :
                               c.difficulty === '중급' ? '#fef3c7' : '#fed7aa';
        const difficultyTextColor = c.difficulty === '초급' ? '#0066CC' :
                                   c.difficulty === '중급' ? '#92400e' : '#b45309';

        html += `
            <div class="case-card" onclick="openCaseDetail(${c.id})">
                <div class="case-image">
                    ${c.imageBefore} → ${c.imageAfter}
                </div>
                <div class="case-info">
                    <div class="case-title">${c.title}</div>
                    <div class="case-subtitle">${c.patient}</div>
                    <div style="margin-top: 10px;">
                        <span class="case-difficulty" style="background: ${difficultyColor}; color: ${difficultyTextColor};">
                            ${c.difficulty}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });

    casesGrid.innerHTML = html;
}

// 케이스 상세보기
function openCaseDetail(caseId) {
    let caseData = null;

    // 모든 케이스에서 찾기
    const allCases = [...casesData.beginner, ...casesData.intermediate, ...casesData.advanced];
    caseData = allCases.find(c => c.id === caseId);

    if (!caseData) return;

    const modal = document.getElementById('caseDetailModal');
    const content = document.getElementById('caseDetailContent');

    const difficultyColor = caseData.difficulty === '초급' ? '#e0f2fe' :
                           caseData.difficulty === '중급' ? '#fef3c7' : '#fed7aa';
    const difficultyTextColor = caseData.difficulty === '초급' ? '#0066CC' :
                               caseData.difficulty === '중급' ? '#92400e' : '#b45309';

    let html = `
        <h3>${caseData.number}. ${caseData.title}</h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <h4 style="color: #666; font-size: 13px;">환자 정보</h4>
                <p style="margin: 8px 0; font-size: 15px;"><strong>나이/성별:</strong> ${caseData.patient}</p>
                <p style="margin: 8px 0; font-size: 15px;"><strong>주소증:</strong> ${caseData.complaint}</p>
                <p style="margin: 8px 0; font-size: 15px;">
                    <strong>난이도:</strong>
                    <span class="case-difficulty" style="background: ${difficultyColor}; color: ${difficultyTextColor};">
                        ${caseData.difficulty}
                    </span>
                </p>
            </div>
            <div>
                <h4 style="color: #666; font-size: 13px;">치료 정보</h4>
                <p style="margin: 8px 0; font-size: 15px;"><strong>예상 기간:</strong> ${caseData.duration}</p>
                <p style="margin: 8px 0; font-size: 15px;"><strong>최종 결과:</strong> ${caseData.results}</p>
            </div>
        </div>

        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #1f2937;">📋 EZM 진단</h4>
            <p style="margin: 8px 0; line-height: 1.6; color: #333;">${caseData.diagnosis}</p>
        </div>

        <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #0066CC;">🔧 치료 계획</h4>
            <p style="margin: 8px 0; line-height: 1.6; color: #0066CC;">${caseData.treatment}</p>
        </div>

        <div style="background: #d1fae5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #059669;">✅ 임상 결과</h4>
            <p style="margin: 8px 0; line-height: 1.6; color: #059669;">${caseData.results}</p>
            <div style="font-size: 48px; text-align: center; margin-top: 10px;">
                ${caseData.imageBefore} → ${caseData.imageAfter}
            </div>
        </div>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
            <h4 style="margin-top: 0; color: #92400e;">💡 학습 포인트</h4>
            <ul style="margin: 10px 0; padding-left: 20px; color: #92400e;">
                ${caseData.learningPoints.map(point => `<li style="margin: 8px 0; line-height: 1.5;">${point}</li>`).join('')}
            </ul>
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <button class="btn btn-primary" onclick="saveNoteForCase(${caseData.id})" style="width: 100%;">📝 노트 저장</button>
        </div>
    `;

    content.innerHTML = html;
    modal.classList.add('show');
}

// 케이스 상세보기 닫기
function closeCaseDetail() {
    document.getElementById('caseDetailModal').classList.remove('show');
}

// 케이스 노트 저장
function saveNoteForCase(caseId) {
    const note = prompt(`Case ${caseId} 노트를 작성해주세요:`);
    if (note) {
        const caseNotes = JSON.parse(localStorage.getItem('case_notes') || '{}');
        caseNotes[`case_${caseId}`] = {
            note: note,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem('case_notes', JSON.stringify(caseNotes));
        alert('✅ 노트가 저장되었습니다!');
    }
}

// 초기 로드
document.addEventListener('DOMContentLoaded', () => {
    loadCases();
});
