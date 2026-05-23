// 교정학 플랫폼 - 퀴즈 시스템

const quizzes = {
    phase1: {
        title: "Phase 1: 기초 이해",
        description: "EZM 기초 개념 확인",
        questions: [
            {
                id: 1,
                text: "Equilibrium Zone Method (EZM)란 무엇인가?",
                options: [
                    "Kim Yong Eul이 개발한 교정 진단 및 치료 방법론",
                    "전통적인 세팔로메트릭 분석 방법",
                    "현대 교정의 가장 일반적인 방법",
                    "컴퓨터 기반 분석 방법"
                ],
                correct: 0,
                explanation: "EZM은 Kim Yong Eul이 개발한 혁신적인 교정 진단 및 치료 방법론입니다."
            },
            {
                id: 2,
                text: "정상교합 (Normal Occlusion)의 특징이 아닌 것은?",
                options: [
                    "양쪽 제1대구치가 근심 관계이다",
                    "상악 전치가 하악 전치를 약 2-3mm 피복한다",
                    "상악 전치가 하악 전치를 5-6mm 피복한다",
                    "상악과 하악이 적절한 골격 관계를 가진다"
                ],
                correct: 2,
                explanation: "정상교합에서 상악 전치는 하악 전치를 2-3mm만 피복합니다. 5-6mm는 과개교합입니다."
            },
            {
                id: 3,
                text: "부정교합 (Malocclusion)의 분류 중 가장 흔한 것은?",
                options: [
                    "Class I",
                    "Class II",
                    "Class III",
                    "Open bite"
                ],
                correct: 0,
                explanation: "Class I 부정교합 (대구치 정상 관계)이 전체 부정교합의 약 50%를 차지합니다."
            },
            {
                id: 4,
                text: "성장 패턴 분석에서 수직 성장 (Vertical growth)의 특징은?",
                options: [
                    "아래턱이 앞으로 자라는 패턴",
                    "얼굴 높이가 증가하는 패턴",
                    "옆얼굴이 길어지는 패턴",
                    "골격 Angle 증가"
                ],
                correct: 1,
                explanation: "수직 성장은 얼굴 높이가 증가하는 패턴으로, 개방교합 경향을 보입니다."
            },
            {
                id: 5,
                text: "진단의 기초가 되는 가장 중요한 사진은?",
                options: [
                    "정면 사진만",
                    "측면 사진만",
                    "5방향 사진 (정면, 측면, 구강 내 사진)",
                    "비디오 촬영"
                ],
                correct: 2,
                explanation: "정확한 진단을 위해서는 정면, 측면, 구강 내 사진 등 5방향 사진이 필요합니다."
            }
        ]
    },

    phase2: {
        title: "Phase 2: 고급 이해",
        description: "진단 및 치료 계획 확인",
        questions: [
            {
                id: 1,
                text: "공간분석 (Space Analysis)에서 혼잡도 -6mm는?",
                options: [
                    "공간이 6mm 부족함",
                    "공간이 6mm 남음",
                    "치아 크기가 작음",
                    "정상 공간"
                ],
                correct: 0,
                explanation: "음수는 공간 부족을 의미합니다. -6mm는 발치를 고려해야 합니다."
            },
            {
                id: 2,
                text: "발치 판단에서 가장 중요한 인자는?",
                options: [
                    "환자의 나이",
                    "공간분석 결과",
                    "부모의 의견",
                    "환자의 성별"
                ],
                correct: 1,
                explanation: "공간분석 결과가 발치 판단의 가장 객관적이고 중요한 인자입니다."
            },
            {
                id: 3,
                text: "Class II 부정교합의 특징이 아닌 것은?",
                options: [
                    "상악 대구치가 하악 대구치보다 앞에 위치",
                    "하악 열등감",
                    "상악 대구치가 하악 대구치보다 뒤에 위치",
                    "보통 상악 전돌 경향"
                ],
                correct: 2,
                explanation: "Class II는 상악 대구치가 앞에 위치합니다. 뒤에 위치하면 Class III입니다."
            },
            {
                id: 4,
                text: "성장 예측 시 가장 신뢰할 수 있는 방법은?",
                options: [
                    "부모의 얼굴 형태",
                    "환자의 현재 나이",
                    "손목 골 성숙도 지수",
                    "키의 성장 정도"
                ],
                correct: 2,
                explanation: "손목 골 성숙도 (Cervical vertebrae maturation)가 성장 예측의 가장 신뢰할 수 있는 방법입니다."
            },
            {
                id: 5,
                text: "치료 계획 수립 시 가장 먼저 고려할 사항은?",
                options: [
                    "환자의 심미 요구",
                    "진단 및 성장 예측",
                    "부모의 의견",
                    "사용할 교정 장치"
                ],
                correct: 1,
                explanation: "정확한 진단과 성장 예측을 바탕으로 개별화된 치료 계획을 수립해야 합니다."
            }
        ]
    },

    phase3: {
        title: "Phase 3: 플랫폼 적용",
        description: "AI 플랫폼 적용 능력 확인",
        questions: [
            {
                id: 1,
                text: "20-19 Orthodontics AI 플랫폼의 목적은?",
                options: [
                    "환자 관리",
                    "EZM을 기반으로 한 자동 진단 및 치료 계획 제시",
                    "의료 기록 저장",
                    "진료비 관리"
                ],
                correct: 1,
                explanation: "AI 플랫폼은 EZM을 기반으로 사진 분석 후 자동으로 진단과 치료 계획을 제시합니다."
            },
            {
                id: 2,
                text: "플랫폼에서 사용되는 가장 중요한 입력값은?",
                options: [
                    "환자의 나이",
                    "5방향 사진",
                    "부모 정보",
                    "치료 경험"
                ],
                correct: 1,
                explanation: "5방향 사진이 AI 분석의 기초 입력값이며 정확도를 좌우합니다."
            },
            {
                id: 3,
                text: "AI 진단의 신뢰도를 높이기 위해 필요한 것은?",
                options: [
                    "더 많은 환자 데이터",
                    "정확한 임상 검증 및 피드백",
                    "높은 컴퓨팅 성능",
                    "복잡한 알고리즘"
                ],
                correct: 1,
                explanation: "실제 임상 검증을 통한 피드백이 AI 모델의 신뢰도와 정확도를 높입니다."
            },
            {
                id: 4,
                text: "플랫폼 개선의 가장 중요한 방향은?",
                options: [
                    "UI 개선",
                    "속도 최적화",
                    "임상 정확도 향상",
                    "기능 추가"
                ],
                correct: 2,
                explanation: "무엇보다 임상에서 실제로 신뢰할 수 있는 진단 정확도가 가장 중요합니다."
            },
            {
                id: 5,
                text: "AI 진단 결과를 의사가 검증해야 하는 이유는?",
                options: [
                    "AI가 항상 틀릴 수 있음",
                    "의료 책임 때문",
                    "개별 환자의 특수성 고려",
                    "모두 정답"
                ],
                correct: 3,
                explanation: "의료 책임, AI의 한계, 환자 개별성 등 모든 이유로 의료 전문가의 검증이 필수적입니다."
            }
        ]
    }
};

let currentPhase = 'phase1';
let userAnswers = {};

// Phase 선택
function selectPhase(phase) {
    currentPhase = `phase${phase}`;
    document.querySelectorAll('.phase-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    loadQuiz();
}

// 퀴즈 로드
function loadQuiz() {
    const quiz = quizzes[currentPhase];
    const container = document.getElementById('quizContainer');
    const questions = quiz.questions;

    let html = `<h3>${quiz.title}</h3><p style="color: #666;">${quiz.description}</p>`;

    questions.forEach((q, idx) => {
        html += `
            <div class="quiz-question">
                <div class="question-number">Q${idx + 1}. ${q.text}</div>
                <div class="options">
        `;

        q.options.forEach((opt, optIdx) => {
            const isChecked = userAnswers[`${currentPhase}_${q.id}`] === optIdx ? 'checked' : '';
            html += `
                <label class="option">
                    <input type="radio" name="q${q.id}" value="${optIdx}" ${isChecked}
                           onchange="userAnswers['${currentPhase}_${q.id}'] = ${optIdx}">
                    ${opt}
                </label>
            `;
        });

        html += `</div></div>`;
    });

    html += `<button class="btn btn-primary" onclick="submitQuiz()" style="width: 100%; margin-top: 20px;">✅ 제출</button>`;

    container.innerHTML = html;
    document.getElementById('resultContainer').classList.remove('show');
}

// 퀴즈 제출
function submitQuiz() {
    const quiz = quizzes[currentPhase];
    let correct = 0;
    let results = [];

    quiz.questions.forEach(q => {
        const userAnswer = userAnswers[`${currentPhase}_${q.id}`];
        const isCorrect = userAnswer === q.correct;

        if (isCorrect) correct++;

        results.push({
            question: q.text,
            isCorrect: isCorrect,
            userAnswered: q.options[userAnswer] || '미응답',
            correct: q.options[q.correct],
            explanation: q.explanation
        });
    });

    showResults(correct, quiz.questions.length, results);
}

// 결과 표시
function showResults(correct, total, results) {
    const percentage = Math.round((correct / total) * 100);
    const resultContainer = document.getElementById('resultContainer');

    let html = `
        <h3>📊 퀴즈 결과</h3>
        <div class="score-display">${percentage}%</div>
        <p style="text-align: center; font-size: 18px; margin: 10px 0;">
            ${correct}개 / ${total}개 정답
        </p>
        <p style="text-align: center; color: #666;">
            ${percentage >= 80 ? '🌟 훌륭합니다! 계속 노력하세요!' :
              percentage >= 60 ? '👍 좋습니다! 약간 더 복습하세요.' :
              '📚 더 복습이 필요합니다.'}
        </p>

        <div class="answer-review">
            <h4>✅ 상세 답안</h4>
    `;

    results.forEach((result, idx) => {
        html += `
            <div class="answer-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                <strong>Q${idx + 1}. ${result.question}</strong>
                <p style="margin: 8px 0;">
                    <strong>내 답:</strong> ${result.userAnswered}
                </p>
                ${!result.isCorrect ? `<p style="margin: 8px 0;"><strong>정답:</strong> ${result.correct}</p>` : ''}
                <p style="margin: 8px 0; font-size: 13px; color: #0066CC;">
                    <strong>해설:</strong> ${result.explanation}
                </p>
            </div>
        `;
    });

    html += '</div>';
    resultContainer.innerHTML = html;
    resultContainer.classList.add('show');

    // 결과 저장
    saveQuizResult(currentPhase, correct, total, percentage);
}

// 결과 저장
function saveQuizResult(phase, correct, total, percentage) {
    const results = JSON.parse(localStorage.getItem('quiz_results') || '{}');
    results[phase] = {
        correct: correct,
        total: total,
        percentage: percentage,
        date: new Date().toISOString()
    };
    localStorage.setItem('quiz_results', JSON.stringify(results));
}
