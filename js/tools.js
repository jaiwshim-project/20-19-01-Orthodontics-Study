// 교정학 플랫폼 - 실습 도구 시스템

let currentTool = 'cephalometric';
let canvas = null;
let ctx = null;
let image = null;
let points = [];
let measurements = [];

// 도구 선택
function selectTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.tool-section').forEach(section => section.style.display = 'none');
    document.getElementById(tool + 'Tool').style.display = 'block';

    if (tool === 'cephalometric') {
        initializeCephalometric();
    }
}

// ==================== 세팔로메트릭 분석 ====================

function initializeCephalometric() {
    canvas = document.getElementById('cephCanvas');
    ctx = canvas.getContext('2d');

    const imageInput = document.getElementById('cephImageInput');
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    image = img;
                    canvas.width = canvas.offsetWidth;
                    canvas.height = 400;

                    // 이미지를 캔버스에 맞추어 그리기
                    const imgAspect = img.width / img.height;
                    const canvasAspect = canvas.width / canvas.height;

                    let drawWidth, drawHeight, drawX, drawY;
                    if (imgAspect > canvasAspect) {
                        drawWidth = canvas.width;
                        drawHeight = drawWidth / imgAspect;
                        drawX = 0;
                        drawY = (canvas.height - drawHeight) / 2;
                    } else {
                        drawHeight = canvas.height;
                        drawWidth = drawHeight * imgAspect;
                        drawX = (canvas.width - drawWidth) / 2;
                        drawY = 0;
                    }

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                    points = [];
                    measurements = [];
                    updateMeasurementList();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    canvas.addEventListener('click', (e) => {
        if (!image) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const pointType = document.getElementById('pointType').value;
        if (!pointType) {
            alert('기준점을 먼저 선택해주세요');
            return;
        }

        points.push({ x, y, type: pointType });
        redrawCanvas();
    });

    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        points = points.filter(p => {
            const distance = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
            return distance > 10;
        });
        redrawCanvas();
    });
}

function redrawCanvas() {
    if (!image) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgAspect = image.width / image.height;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, drawX, drawY;
    if (imgAspect > canvasAspect) {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imgAspect;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
    } else {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgAspect;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

    // 점 그리기
    points.forEach(p => {
        ctx.fillStyle = '#0066CC';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#0066CC';
        ctx.font = '12px Arial';
        ctx.fillText(p.type, p.x + 10, p.y - 10);
    });

    // 선 그리기 (기준점 연결)
    if (points.length > 1) {
        ctx.strokeStyle = '#0066CC';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }

    calculateMeasurements();
}

function calculateMeasurements() {
    measurements = [];

    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const distance = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

        measurements.push({
            from: p1.type,
            to: p2.type,
            distance: distance.toFixed(1),
            mmDistance: (distance * 0.264).toFixed(2) // 픽셀을 mm로 변환 (대략)
        });
    }

    updateMeasurementList();
}

function updateMeasurementList() {
    const list = document.getElementById('measurementList');

    if (measurements.length === 0) {
        list.innerHTML = '<p style="color: #999; text-align: center;">측정할 항목이 없습니다</p>';
        return;
    }

    let html = '';
    measurements.forEach((m, idx) => {
        html += `
            <div class="measurement-item">
                <strong>${m.from} → ${m.to}</strong>
                <br/>
                픽셀: ${m.distance}px | 예상: ${m.mmDistance}mm
            </div>
        `;
    });

    list.innerHTML = html;
}

function saveMeasurement() {
    if (measurements.length === 0) {
        alert('측정 항목이 없습니다');
        return;
    }

    const saved = JSON.parse(localStorage.getItem('cephalometric_measurements') || '{}');
    const timestamp = new Date().toISOString();
    saved[timestamp] = {
        points: points,
        measurements: measurements
    };

    localStorage.setItem('cephalometric_measurements', JSON.stringify(saved));
    alert('✅ 측정 결과가 저장되었습니다!');
}

function clearMeasurements() {
    if (confirm('모든 측정을 초기화하시겠습니까?')) {
        points = [];
        measurements = [];
        if (canvas) {
            redrawCanvas();
        }
    }
}

function downloadReport() {
    if (measurements.length === 0) {
        alert('저장할 측정 항목이 없습니다');
        return;
    }

    let report = '세팔로메트릭 분석 리포트\n';
    report += '========================\n\n';
    report += `작성일: ${new Date().toLocaleString('ko-KR')}\n\n`;

    report += '측정 결과:\n';
    measurements.forEach((m, idx) => {
        report += `${idx + 1}. ${m.from} → ${m.to}: ${m.mmDistance}mm\n`;
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `세팔로메트릭_${new Date().getTime()}.txt`;
    a.click();
}

// ==================== 공간분석 계산기 ====================

function calculateSpace() {
    const maxCrowding = parseFloat(document.getElementById('maxCrowding').value || 0);
    const mandCrowding = parseFloat(document.getElementById('mandCrowding').value || 0);
    const anteroposterior = parseFloat(document.getElementById('anteroposterior').value || 0);
    const growthPotential = parseFloat(document.getElementById('growthPotential').value || 0);

    const totalCrowding = maxCrowding + mandCrowding;
    const totalAvailableSpace = anteroposterior + growthPotential;
    const spaceDifference = totalAvailableSpace + totalCrowding;

    let diagnosis = '';
    let recommendation = '';
    let color = '';

    if (spaceDifference < -4) {
        diagnosis = '🔴 발치 필수';
        recommendation = '공간이 심하게 부족합니다. 양측 또는 편측 발치를 권장합니다.';
        color = '#ef4444';
    } else if (spaceDifference < 0) {
        diagnosis = '🟡 발치 검토';
        recommendation = '공간이 부족합니다. 발치 여부를 신중히 결정하세요.';
        color = '#f59e0b';
    } else if (spaceDifference < 3) {
        diagnosis = '🟢 비발치 가능';
        recommendation = '공간이 충분합니다. 확대 또는 근기능 치료로 해결 가능합니다.';
        color = '#10b981';
    } else {
        diagnosis = '🟢 여유 공간 있음';
        recommendation = '공간이 충분히 있습니다. 비발치 치료를 적극 권장합니다.';
        color = '#10b981';
    }

    const resultDiv = document.getElementById('spaceResult');
    const resultText = document.getElementById('spaceResultText');

    resultText.innerHTML = `
        <strong>${diagnosis}</strong>
        <p style="margin: 10px 0; line-height: 1.6;">
            상악 혼잡도: ${maxCrowding}mm<br/>
            하악 혼잡도: ${mandCrowding}mm<br/>
            전후 관계: ${anteroposterior}mm<br/>
            성장 가능성: ${growthPotential}mm<br/>
            <br/>
            <strong style="color: ${color};">공간 차이: ${spaceDifference.toFixed(1)}mm</strong>
        </p>
        <p>${recommendation}</p>
    `;

    resultDiv.style.display = 'block';
    resultDiv.style.borderColor = color;
    resultDiv.style.backgroundColor = color === '#10b981' ? '#d1fae5' : color === '#f59e0b' ? '#fef3c7' : '#fee2e2';
    document.querySelector('#spaceResult h4').style.color = color;
}

// ==================== 진단 보조 도구 ====================

function diagnosisAssist() {
    const patientAge = parseInt(document.getElementById('patientAge').value);
    const patientGender = document.getElementById('patientGender').value;
    const skeletalPattern = document.getElementById('skeletalPattern').value;
    const complaint = document.getElementById('complaint').value;

    if (!patientAge || !patientGender || !skeletalPattern || !complaint) {
        alert('모든 항목을 입력해주세요');
        return;
    }

    let diagnosis = '';
    let recommendedAge = '';
    let treatmentApproach = '';

    // 나이별 치료 시기
    if (patientAge < 10) {
        recommendedAge = '💚 성장 치료 최적기';
    } else if (patientAge < 13) {
        recommendedAge = '💙 성장 치료 진행 중기';
    } else if (patientAge < 16) {
        recommendedAge = '💜 성장 치료 말기';
    } else {
        recommendedAge = '⚪ 성인 단계 (골격 완성)';
    }

    // 골격 패턴별 진단
    if (skeletalPattern === 'I') {
        diagnosis = 'Skeletal Class I - 정상 골격 관계';
        if (complaint === 'crowding') {
            treatmentApproach = '혼잡: 확대 또는 발치 + 고정식 교정';
        } else if (complaint === 'spacing') {
            treatmentApproach = '간격: 비발치 공간폐쇄 교정';
        } else if (complaint === 'bite') {
            treatmentApproach = '교합: 수직 치료 또는 근기능 치료';
        } else {
            treatmentApproach = '심미: 경미한 위치 조정으로 해결 가능';
        }
    } else if (skeletalPattern === 'II') {
        diagnosis = 'Skeletal Class II - 상악 우위 또는 하악 결손';
        if (patientAge < 13) {
            treatmentApproach = '성장기: 하악 성장 유도 + 상악 제약';
        } else {
            treatmentApproach = '성인: 상악 발치 또는 수술적 접근 고려';
        }
    } else if (skeletalPattern === 'III') {
        diagnosis = 'Skeletal Class III - 하악 우위 또는 상악 결손';
        if (patientAge < 13) {
            treatmentApproach = '성장기: 상악 성장 유도 + 하악 제약';
        } else {
            treatmentApproach = '성인: 양악 수술 또는 제약만 가능';
        }
    }

    const resultDiv = document.getElementById('diagnosisResult');
    const resultText = document.getElementById('diagnosisResultText');

    resultText.innerHTML = `
        <p style="margin: 10px 0;">
            <strong>환자:</strong> ${patientGender === 'M' ? '남성' : '여성'} ${patientAge}세<br/>
            <strong>진단:</strong> ${diagnosis}<br/>
            <strong>진단 단계:</strong> ${recommendedAge}<br/>
        </p>
        <div style="background: white; padding: 10px; border-radius: 6px; margin: 10px 0;">
            <strong style="color: #059669;">추천 치료 방향:</strong>
            <p style="margin: 8px 0; color: #059669;">${treatmentApproach}</p>
        </div>
        <p style="font-size: 13px; color: #666; margin-top: 10px;">
            💡 <strong>주의:</strong> 본 진단은 보조 도구입니다. 정확한 진단은 전문의 상담이 필수입니다.
        </p>
    `;

    resultDiv.style.display = 'block';
}

// 초기화 (페이지 로드 시)
document.addEventListener('DOMContentLoaded', () => {
    initializeCephalometric();
});
