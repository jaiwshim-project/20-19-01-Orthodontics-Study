// 교정학 플랫폼 - 자료 관리 시스템

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

function openResourceDetail(type, id) {
    const resources = resourcesData[type];
    const resource = resources.find(r => r.id === id);

    if (!resource) return;

    const modal = document.getElementById('resourceModal');
    if (!modal) {
        console.error('resourceModal not found');
        return;
    }

    const content = document.getElementById('resourceDetail');

    let html = `
        <h3>${resource.title}</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <p><strong>📝 설명:</strong> ${resource.desc}</p>
                <p><strong>🎓 Phase:</strong> <span style="background: #e0f2fe; color: #0066CC; padding: 4px 8px; border-radius: 4px;">${resource.phase}</span></p>
    `;

    if (resource.category) {
        html += `<p><strong>📂 카테고리:</strong> ${resource.category}</p>`;
    }
    if (resource.publisher) {
        html += `<p><strong>📖 출판사:</strong> ${resource.publisher}</p>`;
    }
    if (resource.type) {
        html += `<p><strong>🏷️ 유형:</strong> ${resource.type}</p>`;
    }
    if (resource.duration) {
        html += `<p><strong>⏱️ 소요시간:</strong> ${resource.duration}</p>`;
    }

    html += `</div>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #0066CC;">
            <h4 style="margin-top: 0; color: #0066CC;">📥 액세스</h4>
    `;

    if (type === 'videos' && resource.file.includes('youtube')) {
        html += `
            <p style="margin-bottom: 10px;">이 자료는 YouTube에서 시청할 수 있습니다.</p>
            <a href="${resource.file}" target="_blank" class="btn btn-primary" style="display: inline-block; margin-top: 10px;">🎬 유튜브에서 보기</a>
        `;
    } else {
        html += `
            <p style="margin-bottom: 10px;"><strong>파일:</strong> <code style="background: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${resource.file}</code></p>
            <p style="font-size: 13px; color: #666; margin-bottom: 10px;">📂 자료 폴더에서 다운로드 가능</p>
            <button class="btn btn-primary" onclick="downloadResource('${resource.file}')" style="display: inline-block;">📥 다운로드</button>
        `;
    }

    html += `
        </div>
        </div>

        <div style="background: #d1fae5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #059669;">💡 학습 팁</h4>
            <ul style="margin: 0; padding-left: 20px; color: #059669;">
                <li>이 자료를 공부한 후 진도 페이지에서 학습 기록을 남기세요</li>
                <li>개념정리 페이지에서 핵심 내용을 정리하면 더 효과적입니다</li>
                <li>포럼에서 다른 학습자와 의견을 나누세요</li>
                <li>충분히 학습한 후 퀴즈로 이해도를 확인하세요</li>
            </ul>
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <button class="btn btn-secondary" onclick="closeResourceModal()" style="width: 100%;">닫기</button>
        </div>
    `;

    content.innerHTML = html;
    modal.classList.add('show');
}

function closeResourceModal() {
    const modal = document.getElementById('resourceModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function downloadResource(filePath) {
    alert(`📥 파일: ${filePath}\n\n자료 폴더에서 다운로드해주세요.\n(실제 배포 시 직접 다운로드 기능 추가 예정)`);
}

document.addEventListener('DOMContentLoaded', () => {
    // 모달 HTML이 없으면 추가
    if (!document.getElementById('resourceModal')) {
        const modalHTML = `
            <div id="resourceModal" class="resource-modal">
                <div class="resource-modal-content">
                    <span class="close-btn" onclick="closeResourceModal()" style="float: right; font-size: 24px; cursor: pointer; color: #999;">&times;</span>
                    <div id="resourceDetail"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 각 탭의 resource-grid 생성
    const slidesGrid = document.querySelector('#slides .resource-grid');
    if (slidesGrid && slidesGrid.children.length === 0) {
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

    const textbooksGrid = document.querySelector('#textbooks .resource-grid');
    if (textbooksGrid && textbooksGrid.children.length === 0) {
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

    const videosGrid = document.querySelector('#videos .resource-grid');
    if (videosGrid && videosGrid.children.length === 0) {
        let html = '';
        resourcesData.videos.forEach(video => {
            html += `
                <div class="resource-card" onclick="openResourceDetail('videos', ${video.id})">
                    <h4>🎬 ${video.title}</h4>
                    <p>${video.desc}</p>
                    <span class="resource-badge">${video.phase}</span>
                </div>
            `;
        });
        videosGrid.innerHTML = html;
    }

    const presentationsGrid = document.querySelector('#presentations .resource-grid');
    if (presentationsGrid && presentationsGrid.children.length === 0) {
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
    const existingGrid = documentsDiv.querySelector('.resource-grid');
    if (!existingGrid) {
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

    // 모달 외부 클릭 시 닫기
    const modal = document.getElementById('resourceModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeResourceModal();
            }
        });
    }
});
