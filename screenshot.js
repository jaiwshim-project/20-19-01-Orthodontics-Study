const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function takeScreenshots() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const screenshotDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
    }

    const pages = [
        { name: '01_통합허브', path: 'wiki-vault-index.html' },
        { name: '02_플랫폼홈', path: 'index.html' },
        { name: '03_진도페이지', path: 'progress.html' },
        { name: '04_자료페이지', path: 'resources.html' }
    ];

    for (const page of pages) {
        try {
            const filePath = path.join(__dirname, page.path);
            const fileUrl = 'file://' + filePath.replace(/\\/g, '/');

            console.log(`📸 ${page.name} 스크린샷 촬영 중...`);
            const browser_page = await browser.newPage();
            await browser_page.setViewport({ width: 1200, height: 800 });
            await browser_page.goto(fileUrl, { waitUntil: 'networkidle2' });
            await browser_page.screenshot({
                path: path.join(screenshotDir, `${page.name}.png`),
                fullPage: true
            });
            await browser_page.close();
            console.log(`✅ ${page.name} 완료`);
        } catch (err) {
            console.error(`❌ ${page.name} 오류:`, err.message);
        }
    }

    await browser.close();
    console.log('\n✨ 모든 스크린샷이 screenshots/ 폴더에 저장되었습니다!');
}

takeScreenshots();
