// AI Chatbot for Orthodontics Learning Platform
// RAG (Retrieval Augmented Generation) based Q&A system

class AIChatbot {
    constructor() {
        this.isOpen = false;
        this.conversations = [];
        this.ragDatabase = this.buildRAGDatabase();
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.attachEventListeners();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <button class="ai-chat-floating" id="aiChatBtn" title="EZM 플랫폼 Q&A">
                💬
            </button>

            <div class="ai-chat-modal" id="aiChatModal">
                <div class="ai-chat-header">
                    <h3>🤖 EZM 플랫폼 AI 어시스턴트</h3>
                    <button class="ai-chat-close" id="aiChatCloseBtn">✕</button>
                </div>

                <div class="ai-chat-messages" id="aiChatMessages">
                    <div class="ai-chat-message assistant">
                        안녕하세요! 👋 교정학 플랫폼의 EZM, 수직부정교합, 유지프로토콜, 플랫폼 개발에 대한 모든 질문에 답변해드립니다. 편하게 질문해주세요!
                    </div>
                </div>

                <div class="ai-chat-input-box">
                    <input type="text" id="aiChatInput" placeholder="질문을 입력하세요..." autocomplete="off">
                    <button id="aiChatSendBtn">전송</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const floatingBtn = document.getElementById('aiChatBtn');
        const closeBtn = document.getElementById('aiChatCloseBtn');
        const sendBtn = document.getElementById('aiChatSendBtn');
        const input = document.getElementById('aiChatInput');
        const modal = document.getElementById('aiChatModal');

        floatingBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !modal.contains(e.target) && !floatingBtn.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        const modal = document.getElementById('aiChatModal');
        const btn = document.getElementById('aiChatBtn');
        modal.classList.add('active');
        btn.classList.add('active');
        document.getElementById('aiChatInput').focus();
    }

    closeChat() {
        this.isOpen = false;
        const modal = document.getElementById('aiChatModal');
        const btn = document.getElementById('aiChatBtn');
        modal.classList.remove('active');
        btn.classList.remove('active');
    }

    sendMessage() {
        const input = document.getElementById('aiChatInput');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show loading indicator
        this.addLoadingIndicator();

        // Simulate delay for better UX
        setTimeout(() => {
            this.removeLoadingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'assistant');
        }, 500);
    }

    addMessage(text, role) {
        const messagesDiv = document.getElementById('aiChatMessages');
        const messageEl = document.createElement('div');
        messageEl.className = `ai-chat-message ${role}`;
        messageEl.textContent = text;
        messagesDiv.appendChild(messageEl);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    addLoadingIndicator() {
        const messagesDiv = document.getElementById('aiChatMessages');
        const loadingEl = document.createElement('div');
        loadingEl.className = 'ai-chat-loading';
        loadingEl.id = 'aiChatLoading';
        loadingEl.innerHTML = '<span></span><span></span><span></span>';
        messagesDiv.appendChild(loadingEl);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    removeLoadingIndicator() {
        const loading = document.getElementById('aiChatLoading');
        if (loading) loading.remove();
    }

    buildRAGDatabase() {
        // RAG 데이터베이스: 플랫폼 내 모든 주요 콘텐츠
        return {
            ezm: {
                definition: "EZM (Equilibrium Zone Methodology)은 김용을 원장이 20년간 검증한 교정학 진단 및 치료 방법론입니다.",
                principles: [
                    "5방향 사진 분석 (정면, 좌측면, 우측면, 상악교합면, 하악교합면)",
                    "개인별 평형존 개념 도입",
                    "3D 공간 분석",
                    "성장 예측 기반 치료계획"
                ],
                advantages: [
                    "전통 교정학과 달리 환자의 개별적 특성 고려",
                    "더 정확한 진단",
                    "예측 가능한 치료 결과",
                    "재발 위험 감소"
                ]
            },
            deepBite: {
                definition: "Deep Bite (과심교합): 상악 전치부가 하악 전치부를 과도하게 덮는 상태 (Overbite > 4mm)",
                causes: [
                    "저성장형 (SN-GoGn < 30°)",
                    "Thumb sucking 습관",
                    "상하악 전치 과도한 크기",
                    "후상방 하악 회전"
                ],
                treatment: [
                    "상악 전치 내주 (Intrusion)",
                    "하악 전치 내주 강화",
                    "Molar anchorage control",
                    "Vertical stop 등 보조기구 사용"
                ],
                retention: "2-3년 능동적 유지장치 필요"
            },
            openBite: {
                definition: "Open Bite (개방교합): 전치부에서 3mm 이상의 교합이 없는 상태",
                causes: [
                    "혀 내밀기 습관 (Tongue thrust) - 40%",
                    "수직성장 (고성장형, SN-GoGn > 40°) - 30%",
                    "손가락 빨기 습관 - 20%",
                    "골격 이상 - 10%"
                ],
                treatment: [
                    "Tongue thrust 교정 (Speech therapy 병행)",
                    "Mouth breathing 개선",
                    "전치부 gentle intrusion",
                    "Miniscrew 보조 고려",
                    "후방부 압출 억제"
                ],
                retention: "3-5년 이상, 고정식(Fixed) 권장",
                warning: "고성장형의 경우 재발 위험 높음"
            },
            retention: {
                definition: "Retention: 치료 완료 후 달성한 교합 위치를 장기간 안정적으로 유지하는 과정",
                objectives: [
                    "단기 (0-6개월): 급성 재발 방지",
                    "중기 (6-24개월): 골적응 및 근육적응 완료",
                    "장기 (2년 이상): 생리적 변화에 따른 변위 최소화"
                ],
                fixedRetainer: {
                    description: "본딩된 철사를 치아 설측에 고정",
                    advantages: ["24시간 지속력", "환자 순응도 불필요", "조정 가능"],
                    disadvantages: ["음식물 축적", "철사 파절 위험", "본딩 탈락"]
                },
                removableRetainer: {
                    description: "야간에 착용하는 가철식 유지장치",
                    types: [
                        "Hawley: 재조정 가능, 수명 길음",
                        "Clear (Vacuum-formed): 심미성 우수"
                    ]
                },
                bestPractice: "Fixed (치아 설측) + Removable (야간 8시간) 병용"
            },
            space: {
                formula: "Space Needed - Space Available = Space Deficiency",
                spaceNeeded: "영구치 근원심 폭경 합계 (Bolton index 활용)",
                spaceAvailable: "치열궁 길이 (distal of canine to distal of canine)",
                judgment: {
                    "0-2mm": "경도 협착 (Mild crowding)",
                    "2-4mm": "중도 협착 (Moderate crowding)",
                    "4-6mm": "심도 협착 (Severe crowding)",
                    "6mm+": "매우 심한 협착 (Very severe)"
                },
                extractionDecision: "Space deficiency, 골격패턴, 안모특성 종합고려"
            },
            platform: {
                description: "20-19 Orthodontics AI: EZM 기반 진단 및 치료계획 자동화 플랫폼",
                modules: [
                    "Photo Analysis: 5방향 사진 분석 및 특징점 인식",
                    "Space Calculation: 공간분석 자동화",
                    "Growth Prediction: 성장 유형 및 방향 예측",
                    "Diagnosis Engine: 부정교합 자동 분류",
                    "Treatment Plan: 치료계획 생성",
                    "Retention Protocol: 유지프로토콜 제시"
                ],
                usage: "플랫폼은 참고 도구이며, 최종 진단과 치료 결정은 임상의의 판단이 우선입니다."
            }
        };
    }

    generateResponse(query) {
        const question = query.toLowerCase();

        // EZM 관련 질문
        if (question.includes('ezm') || question.includes('평형존')) {
            return this.formatResponse(
                "EZM (Equilibrium Zone Methodology)",
                this.ragDatabase.ezm.definition,
                [
                    `원칙: ${this.ragDatabase.ezm.principles.join(', ')}`,
                    `장점: ${this.ragDatabase.ezm.advantages[0]}`
                ]
            );
        }

        // Deep Bite 관련 질문
        if (question.includes('deep bite') || question.includes('과심교합') || question.includes('오버바이트')) {
            return this.formatResponse(
                "Deep Bite (과심교합)",
                this.ragDatabase.deepBite.definition,
                [
                    `원인 1: ${this.ragDatabase.deepBite.causes[0]}`,
                    `원인 2: ${this.ragDatabase.deepBite.causes[1]}`,
                    `원인 3: ${this.ragDatabase.deepBite.causes[2]}`,
                    `진단 포인트: 정면에서 상악 전치 노출도 4mm 이상, 측면에서 Overbite 측정`,
                    `치료 1단계: ${this.ragDatabase.deepBite.treatment[0]}`,
                    `치료 2단계: ${this.ragDatabase.deepBite.treatment[1]}`,
                    `기계력: ${this.ragDatabase.deepBite.treatment[2]}`,
                    `유지 방법: ${this.ragDatabase.deepBite.retention}`
                ]
            );
        }

        // Open Bite 관련 질문
        if (question.includes('open bite') || question.includes('개방교합')) {
            return this.formatResponse(
                "Open Bite (개방교합)",
                this.ragDatabase.openBite.definition,
                [
                    `원인 1 (40%): ${this.ragDatabase.openBite.causes[0]}`,
                    `원인 2 (30%): ${this.ragDatabase.openBite.causes[1]}`,
                    `원인 3 (20%): ${this.ragDatabase.openBite.causes[2]}`,
                    `원인 4 (10%): ${this.ragDatabase.openBite.causes[3]}`,
                    `진단: Anterior vs Posterior open bite 구분, 혀 위치 평가`,
                    `치료 1: ${this.ragDatabase.openBite.treatment[0]} (중요!)`,
                    `치료 2: ${this.ragDatabase.openBite.treatment[1]}`,
                    `기계적 치료: ${this.ragDatabase.openBite.treatment[2]}`,
                    `보조기구: ${this.ragDatabase.openBite.treatment[3]}`,
                    `유지: ${this.ragDatabase.openBite.retention}`,
                    `특별히 주의: ${this.ragDatabase.openBite.warning}`
                ]
            );
        }

        // 유지/Retention 관련 질문
        if (question.includes('retention') || question.includes('유지') || question.includes('유지장치')) {
            return this.formatResponse(
                "Retention Protocol (유지프로토콜)",
                this.ragDatabase.retention.definition,
                [
                    `목표 1 (0-6개월): ${this.ragDatabase.retention.objectives[0]}`,
                    `목표 2 (6-24개월): ${this.ragDatabase.retention.objectives[1]}`,
                    `목표 3 (2년+): ${this.ragDatabase.retention.objectives[2]}`,
                    `\n고정식 유지장치:`,
                    `  - ${this.ragDatabase.retention.fixedRetainer.description}`,
                    `  - 장점: ${this.ragDatabase.retention.fixedRetainer.advantages.join(', ')}`,
                    `\n가철식 유지장치:`,
                    `  - ${this.ragDatabase.retention.removableRetainer.types[0]}`,
                    `  - ${this.ragDatabase.retention.removableRetainer.types[1]}`,
                    `\n최고 권장: ${this.ragDatabase.retention.bestPractice}`
                ]
            );
        }

        // 공간분석 관련 질문
        if (question.includes('space') || question.includes('공간분석') || question.includes('협착')) {
            return this.formatResponse(
                "Space Analysis (공간분석)",
                this.ragDatabase.space.formula,
                [
                    `계산: Space Needed (${this.ragDatabase.space.spaceNeeded}) - Space Available (${this.ragDatabase.space.spaceAvailable})`,
                    `판정: 협착도 0-2mm = 경도, 2-4mm = 중도, 4-6mm = 심도`,
                    `발치 판정: 공간부족, 골격패턴, 안모특성을 종합고려합니다.`
                ]
            );
        }

        // 플랫폼 관련 질문
        if (question.includes('platform') || question.includes('플랫폼') || question.includes('20-19')) {
            return this.formatResponse(
                "20-19 Orthodontics AI Platform",
                this.ragDatabase.platform.description,
                [
                    `주요 기능: ${this.ragDatabase.platform.modules[0]}`,
                    `데이터 기반: EZM 알고리즘`,
                    `주의: ${this.ragDatabase.platform.usage}`
                ]
            );
        }

        // 성장예측 관련
        if (question.includes('성장') || question.includes('growth') || question.includes('fn-gogn')) {
            return "성장예측은 현재 나이, SN-GoGn 각도, FMA 등을 종합고려하여 향후 5-10년의 골격변화를 예측합니다. " +
                   "저성장형(SN-GoGn < 28°)은 상악 우측회전, 고성장형(> 38°)은 하향 성장의 위험이 있습니다. " +
                   "성장 예측도에 따라 치료계획이 달라집니다.";
        }

        // 발치 판정 관련
        if (question.includes('발치') || question.includes('extraction')) {
            return "발치 판정 기준:\n" +
                   "✓ 발치 필요: 심한 공간부족(> 6mm), 심한 돌출, Class I 골격의 치성 문제\n" +
                   "✗ 발치 회피: Open Bite, Class III, 저각 골격\n" +
                   "전략: 1차 소구치, 2차 소구치, 비발치 확장, IPR 등을 고려합니다.";
        }

        // 5방향 분석
        if (question.includes('5방향') || question.includes('사진') || question.includes('정면')) {
            return "EZM 5방향 분석:\n" +
                   "1. 정면 사진: 상하 전치의 수직 관계, 정중선 일치도, 안모칭, 웃을 때 노출도\n" +
                   "2. 좌측면: Overjet, Overbite, 하악 회전 방향, 안모 convexity\n" +
                   "3. 우측면: 대칭성 확인\n" +
                   "4. 상악 교합면: 치열궁 형태, 미드라인, 좌우 폭경\n" +
                   "5. 하악 교합면: 같은 항목\n" +
                   "→ 모든 정보를 종합하여 EZ 진단을 내립니다.";
        }

        // 기본 안내
        return "안녕하세요! 다음 주제에 대해 질문할 수 있습니다:\n\n" +
               "🔹 EZM 개념 및 원칙\n" +
               "🔹 Deep Bite (과심교합) 진단 및 치료\n" +
               "🔹 Open Bite (개방교합) 진단 및 치료\n" +
               "🔹 Retention Protocol (유지프로토콜)\n" +
               "🔹 Space Analysis (공간분석)\n" +
               "🔹 성장 예측 및 발치 판정\n" +
               "🔹 5방향 사진 분석\n" +
               "🔹 20-19 Orthodontics AI 플랫폼\n\n" +
               "구체적인 질문을 입력해주세요! 😊";
    }

    formatResponse(title, description, details) {
        let response = `📌 ${title}\n\n${description}`;
        if (details && details.length > 0) {
            response += '\n\n' + details.map(d => `• ${d}`).join('\n');
        }
        response += '\n\n더 자세한 내용은 학습경로, 개념정리, 자료 페이지에서 확인할 수 있습니다.';
        return response;
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AIChatbot();
    });
} else {
    new AIChatbot();
}
