// 교정학 학습 플랫폼 - 공통 JavaScript

// Data Store (localStorage)
const DATA_KEY = 'orthodontics_learning_data';

// Initialize data
function initializeData() {
    if (!localStorage.getItem(DATA_KEY)) {
        localStorage.setItem(DATA_KEY, JSON.stringify({
            phase1Progress: 0,
            phase2Progress: 0,
            phase3Progress: 0,
            hoursSpent: 0,
            filesReviewed: [],
            concepts: [],
            ideas: [],
            lastUpdated: new Date().toISOString()
        }));
    }
}

// Get data
function getData() {
    initializeData();
    return JSON.parse(localStorage.getItem(DATA_KEY)) || {};
}

// Save data
function saveData(data) {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
    updateAllStats();
}

// Get current page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('resources.html')) return 'resources';
    if (path.includes('learning-path.html')) return 'learning-path';
    if (path.includes('concepts.html')) return 'concepts';
    if (path.includes('ideas.html')) return 'ideas';
    if (path.includes('progress.html')) return 'progress';
    if (path.includes('application.html')) return 'application';
    if (path.includes('webceph.html')) return 'webceph';
    if (path.includes('comparison.html')) return 'comparison';
    return 'index';
}

// Set active nav link
function setActiveNav() {
    const currentPage = getCurrentPage();
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(currentPage + '.html') ||
            (currentPage === 'index' && link.href.includes('index.html'))) {
            link.classList.add('active');
        }
    });
}

// Update stats
function updateAllStats() {
    const data = getData();
    const statsElement = document.getElementById('stats');
    if (statsElement) {
        const totalConcepts = (data.concepts || []).length;
        const totalIdeas = (data.ideas || []).length;
        statsElement.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                <div style="padding: 15px; background: #dbeafe; border-radius: 6px; text-align: center;">
                    <div style="font-size: 24px; font-weight: 700; color: #0284c7;">${data.hoursSpent || 0}</div>
                    <div style="font-size: 12px; color: #1e40af; margin-top: 5px;">총 학습 시간</div>
                </div>
                <div style="padding: 15px; background: #d1fae5; border-radius: 6px; text-align: center;">
                    <div style="font-size: 24px; font-weight: 700; color: #059669;">${totalConcepts}</div>
                    <div style="font-size: 12px; color: #047857; margin-top: 5px;">정리된 개념</div>
                </div>
                <div style="padding: 15px; background: #fef3c7; border-radius: 6px; text-align: center;">
                    <div style="font-size: 24px; font-weight: 700; color: #d97706;">${totalIdeas}</div>
                    <div style="font-size: 12px; color: #b45309; margin-top: 5px;">제안된 아이디어</div>
                </div>
            </div>
        `;
    }
}

// 89개 파일 메타데이터
const ALL_FILES = [
    // MP4 영상 (4개)
    { name: '교정학 01.mp4', type: 'MP4', size: '20037.25KB', phase: '1', category: '🎬 영상' },
    { name: '교정학 02.mp4', type: 'MP4', size: '26777.31KB', phase: '1-2', category: '🎬 영상' },
    { name: '교정학 03.mp4', type: 'MP4', size: '27678.31KB', phase: '2', category: '🎬 영상' },
    { name: '현대_교정학의_두_얼굴.mp4', type: 'MP4', size: '49677.47KB', phase: '2-3', category: '🎬 영상' },

    // PPTX 프레젠테이션
    { name: 'The_Bio-Digital_Blueprint.pptx', type: 'PPTX', size: '20916.87KB', phase: '1-2', category: '📊 PPTX' },
    { name: 'The_Equilibrium_Blueprint.pptx', type: 'PPTX', size: '20138.88KB', phase: '2', category: '📊 PPTX' },
    { name: 'Bio-AI_Orthodontics.pptx', type: 'PPTX', size: '15141.19KB', phase: '2', category: '📊 PPTX' },
    { name: 'Open_Bite_Clinical_Blueprint.pptx', type: 'PPTX', size: '18104.68KB', phase: '3', category: '📊 PPTX' },
    { name: '20-19_Orthodontic_AI_Copilot.pptx', type: 'PPTX', size: '12952.38KB', phase: '3', category: '📊 PPTX' },
    { name: 'Orthodontic_AI_Blueprint.pptx', type: 'PPTX', size: '9878.31KB', phase: '2-3', category: '📊 PPTX' },
    { name: 'AI_Powered_Precision_Orthodontics.pptx', type: 'PPTX', size: '9449.56KB', phase: '2-3', category: '📊 PPTX' },
    { name: '교정학 자료.pptx', type: 'PPTX', size: '168130.83KB', phase: '1-3', category: '📊 PPTX' },

    // PDF 문서 (6개)
    { name: '웹셉.pdf', type: 'PDF', size: '3891.78KB', phase: '1', category: '📄 PDF' },
    { name: '웹셉 매뉴얼.pdf', type: 'PDF', size: '2592.78KB', phase: '1-2', category: '📄 PDF' },
    { name: '1. 현대 교정학의 발전과 과제.pdf', type: 'PDF', size: '3064.8KB', phase: '1-2', category: '📄 PDF' },
    { name: '교정학 자료.pdf', type: 'PDF', size: '7620.28KB', phase: '1-2', category: '📄 PDF' },
    { name: '대전치과 교정학.pdf', type: 'PDF', size: '680.46KB', phase: '1', category: '📄 PDF' },

    // DOCX 문서
    { name: '웹셉 세팔로.docx', type: 'DOCX', size: '995.01KB', phase: '1', category: '📋 DOCX' },
    { name: '1. 현대 교정학의 발전과 과제.docx', type: 'DOCX', size: '21772.31KB', phase: '1-2', category: '📋 DOCX' },
    { name: 'Innovative Aesthetic and Functional Orthodontic Planning.docx', type: 'DOCX', size: '832.61KB', phase: '2-3', category: '📋 DOCX' },
    { name: '대전치과 교정학.docx', type: 'DOCX', size: '50.64KB', phase: '1', category: '📋 DOCX' },

    // JPG 슬라이드 - 11개 챕터별 그룹화
    // 슬라이드 1-5: Ch.1
    ...Array.from({length: 5}, (_, i) => ({
        name: `슬라이드${i+1}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '1',
        category: '📸 JPG (Ch.1)',
        relatedChapter: '1. 현대 교정학의 발전과 과제'
    })),

    // 슬라이드 6-10: Ch.2
    ...Array.from({length: 5}, (_, i) => ({
        name: `슬라이드${i+6}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '1-2',
        category: '📸 JPG (Ch.2)',
        relatedChapter: '2. Growth and Development'
    })),

    // 슬라이드 11-15: Ch.3
    ...Array.from({length: 5}, (_, i) => ({
        name: `슬라이드${i+11}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '1-2',
        category: '📸 JPG (Ch.3)',
        relatedChapter: '3. Normal occlusion and malocclusion'
    })),

    // 슬라이드 16-21: Ch.4
    ...Array.from({length: 6}, (_, i) => ({
        name: `슬라이드${i+16}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '2',
        category: '📸 JPG (Ch.4)',
        relatedChapter: '4. Facial type'
    })),

    // 슬라이드 22-26: Ch.5
    ...Array.from({length: 5}, (_, i) => ({
        name: `슬라이드${i+22}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '2',
        category: '📸 JPG (Ch.5)',
        relatedChapter: '5. Ext & non Ext'
    })),

    // 슬라이드 27-30: Ch.6
    ...Array.from({length: 4}, (_, i) => ({
        name: `슬라이드${i+27}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '1-2',
        category: '📸 JPG (Ch.6)',
        relatedChapter: '6. Intra-arch malocclusion'
    })),

    // 슬라이드 31-34: Ch.7
    ...Array.from({length: 4}, (_, i) => ({
        name: `슬라이드${i+31}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '2',
        category: '📸 JPG (Ch.7)',
        relatedChapter: '7. Class II malocclusion'
    })),

    // 슬라이드 35-39: Ch.8
    ...Array.from({length: 5}, (_, i) => ({
        name: `슬라이드${i+35}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '2',
        category: '📸 JPG (Ch.8)',
        relatedChapter: '8. Class III malocclusion'
    })),

    // 슬라이드 40-42: Ch.9-10
    ...Array.from({length: 3}, (_, i) => ({
        name: `슬라이드${i+40}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '2-3',
        category: '📸 JPG (Ch.9-10)',
        relatedChapter: '9-10. Vertical malocclusion'
    })),

    // 슬라이드 43-45: Ch.11
    ...Array.from({length: 3}, (_, i) => ({
        name: `슬라이드${i+43}.JPG`,
        type: 'JPG',
        size: '150KB~240KB',
        phase: '1-3',
        category: '📸 JPG (Ch.11)',
        relatedChapter: '11. Retention and Stability'
    })),

    // PNG 이미지 (8개)
    { name: '05.png', type: 'PNG', size: '4570.33KB', phase: '1-2', category: '🎨 PNG' },
    { name: '11.png', type: 'PNG', size: '4759.06KB', phase: '1-2', category: '🎨 PNG' },
    { name: 'Gemini_Generated_Image_ceylfdceylfdceyl.png', type: 'PNG', size: '6104.11KB', phase: '2-3', category: '🎨 PNG' },
    { name: 'unnamed (10).png', type: 'PNG', size: '4305.57KB', phase: '2', category: '🎨 PNG' },
    { name: 'unnamed (19).png', type: 'PNG', size: '4591.47KB', phase: '2', category: '🎨 PNG' },
    { name: 'unnamed (6).png', type: 'PNG', size: '4657.98KB', phase: '2', category: '🎨 PNG' },
    { name: 'unnamed (8).png', type: 'PNG', size: '5129.51KB', phase: '2', category: '🎨 PNG' },
    { name: 'unnamed (9).png', type: 'PNG', size: '4190.85KB', phase: '2', category: '🎨 PNG' },

    // 명문출판사 자료 (15개)
    { name: 'presentation-1.pptx', type: 'PPTX', size: '146903.02KB', phase: '2-3', category: '📊 PPTX' },
    { name: '2. Growth and Developement.docx', type: 'DOCX', size: '31148.99KB', phase: '2', category: '📋 DOCX' },
    { name: '3. Normal occlusion and malocclusion.docx', type: 'DOCX', size: '38658.12KB', phase: '1-2', category: '📋 DOCX' },
    { name: '4. Facial type.docx', type: 'DOCX', size: '33695.31KB', phase: '2', category: '📋 DOCX' },
    { name: '5. Ext & non Ext.docx', type: 'DOCX', size: '35116.51KB', phase: '2', category: '📋 DOCX' },
    { name: '6. Intra-arch malocclusion; Diastema, Crowding & protrusion.docx', type: 'DOCX', size: '49691.97KB', phase: '1-2', category: '📋 DOCX' },
    { name: '7. Class ll malocclusion.docx', type: 'DOCX', size: '25982.06KB', phase: '2', category: '📋 DOCX' },
    { name: '8. Class lll malocclusion.docx', type: 'DOCX', size: '48344.28KB', phase: '2', category: '📋 DOCX' },
    { name: '9. Vertical malocclusion; Deepbite.docx', type: 'DOCX', size: '21804.95KB', phase: '2', category: '📋 DOCX' },
    { name: '10. Vertical malocclusion; Openbite.docx', type: 'DOCX', size: '69937.22KB', phase: '3', category: '📋 DOCX' },
    { name: '11. Retention and Stability.docx', type: 'DOCX', size: '25043.98KB', phase: '1-3', category: '📋 DOCX' },
    { name: '1. Preface.docx', type: 'DOCX', size: '19.14KB', phase: '1', category: '📋 DOCX' },
    { name: '1, Beyond Contemporaly 정리.docx', type: 'DOCX', size: '31.67KB', phase: '3', category: '📋 DOCX' },
    { name: 'presentation-1.pdf', type: 'PDF', size: '4247.27KB', phase: '2-3', category: '📄 PDF' },
    { name: 'settings.local.json', type: 'JSON', size: '0.19KB', phase: '1', category: '⚙️ 설정' }
];

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setActiveNav();
    updateAllStats();
});
