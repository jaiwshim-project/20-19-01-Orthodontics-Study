// 교정학 플랫폼 - 포럼 시스템

let currentCategory = 'all';
let forumPosts = JSON.parse(localStorage.getItem('forum_posts') || '[]');

// 초기 샘플 데이터 (첫 로드 시만)
function initializeForumData() {
    if (forumPosts.length === 0) {
        forumPosts = [
            {
                id: 1,
                category: 'general',
                title: 'EZM 방법론에 대해 질문합니다',
                author: '김학습',
                content: 'EZM의 핵심 개념인 Equilibrium Zone이 정확히 무엇인가요? 공간분석과의 관계를 알고 싶습니다.',
                timestamp: new Date(Date.now() - 86400000).toISOString(),
                views: 24,
                replies: 3,
                likes: 5
            },
            {
                id: 2,
                category: 'phase1',
                title: '정상교합의 정의',
                author: '박임상',
                content: '정상교합 정의에서 상악 전치의 피복이 왜 2-3mm인지 임상적 근거가 있을까요?',
                timestamp: new Date(Date.now() - 172800000).toISOString(),
                views: 31,
                replies: 5,
                likes: 8
            },
            {
                id: 3,
                category: 'phase2',
                title: '발치 판단 사례',
                author: '이진단',
                content: '혼잡도 -6mm인 경우, 항상 발치해야 하나요? 케이스에 따라 비발치도 가능한가요?',
                timestamp: new Date(Date.now() - 259200000).toISOString(),
                views: 18,
                replies: 4,
                likes: 7
            }
        ];
        localStorage.setItem('forum_posts', JSON.stringify(forumPosts));
    }
}

// 카테고리 선택
function selectCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');

    loadPosts();
}

// 포스트 로드
function loadPosts() {
    initializeForumData();

    const postsList = document.getElementById('postsList');
    let posts = forumPosts;

    if (currentCategory !== 'all') {
        posts = forumPosts.filter(p => p.category === currentCategory);
    }

    // 최신순 정렬
    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (posts.length === 0) {
        postsList.innerHTML = `
            <p style="text-align: center; color: #999; padding: 40px 0;">
                이 카테고리에는 아직 게시물이 없습니다. 첫 번째 질문을 작성해주세요!
            </p>
        `;
        updateCategoryCount();
        return;
    }

    let html = '';
    posts.forEach(post => {
        const date = new Date(post.timestamp);
        const dateStr = formatDate(date);

        html += `
            <div class="post-item" onclick="openPostDetail(${post.id})">
                <div class="post-title">${post.title}</div>
                <div class="post-meta">
                    <span>${post.author}</span>
                    <span>${dateStr}</span>
                </div>
                <div class="post-excerpt">${post.content.substring(0, 100)}...</div>
                <div class="post-stats">
                    <span>👁️ ${post.views}</span>
                    <span>💬 ${post.replies}</span>
                    <span>❤️ ${post.likes}</span>
                </div>
            </div>
        `;
    });

    postsList.innerHTML = html;
    updateCategoryCount();
}

// 날짜 포맷팅
function formatDate(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;

    return date.toLocaleDateString('ko-KR');
}

// 카테고리 게시물 수 업데이트
function updateCategoryCount() {
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach(item => {
        const text = item.textContent;

        let count = 0;
        if (text.includes('전체')) {
            count = forumPosts.length;
        } else if (text.includes('Phase 1')) {
            count = forumPosts.filter(p => p.category === 'phase1').length;
        } else if (text.includes('Phase 2')) {
            count = forumPosts.filter(p => p.category === 'phase2').length;
        } else if (text.includes('Phase 3')) {
            count = forumPosts.filter(p => p.category === 'phase3').length;
        } else if (text.includes('일반')) {
            count = forumPosts.filter(p => p.category === 'general').length;
        }

        item.textContent = text.split('(')[0].trim() + ` (${count})`;
    });

    // 푸터 업데이트
    const totalPostsElement = document.getElementById('totalPosts');
    if (totalPostsElement) {
        totalPostsElement.textContent = forumPosts.length;
    }
}

// 새 포스트 모달 열기
function openNewPostModal() {
    document.getElementById('newPostModal').classList.add('show');
}

// 새 포스트 모달 닫기
function closeNewPostModal() {
    document.getElementById('newPostModal').classList.remove('show');
    document.getElementById('newPostTitle').value = '';
    document.getElementById('newPostContent').value = '';
}

// 새 포스트 제출
function submitNewPost() {
    const category = document.getElementById('newPostCategory').value;
    const title = document.getElementById('newPostTitle').value.trim();
    const content = document.getElementById('newPostContent').value.trim();

    if (!title || !content) {
        alert('제목과 내용을 모두 입력해주세요');
        return;
    }

    if (title.length < 5) {
        alert('제목은 5자 이상이어야 합니다');
        return;
    }

    if (content.length < 10) {
        alert('내용은 10자 이상이어야 합니다');
        return;
    }

    const newPost = {
        id: Math.max(...forumPosts.map(p => p.id), 0) + 1,
        category: category,
        title: title,
        author: getCurrentUser() || '익명',
        content: content,
        timestamp: new Date().toISOString(),
        views: 0,
        replies: 0,
        likes: 0,
        comments: []
    };

    forumPosts.push(newPost);
    localStorage.setItem('forum_posts', JSON.stringify(forumPosts));

    closeNewPostModal();
    loadPosts();

    alert('✅ 게시물이 작성되었습니다!');
}

// 포스트 상세보기
function openPostDetail(postId) {
    const post = forumPosts.find(p => p.id === postId);
    if (!post) return;

    // 조회수 증가
    post.views++;
    localStorage.setItem('forum_posts', JSON.stringify(forumPosts));

    const modal = document.getElementById('postDetailModal');
    const content = document.getElementById('postDetailContent');

    const date = new Date(post.timestamp);
    const dateStr = formatDate(date);

    let html = `
        <h3>${post.title}</h3>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
            <div>
                <span style="color: #666; font-size: 14px;">
                    <strong>${post.author}</strong> · ${dateStr}
                </span>
            </div>
            <div style="display: flex; gap: 20px; color: #999; font-size: 13px;">
                <span>👁️ ${post.views}</span>
                <span>❤️ ${post.likes}</span>
            </div>
        </div>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px; line-height: 1.8; color: #333;">
            ${post.content}
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 30px;">
            <button class="btn btn-primary" onclick="likePost(${post.id})" style="flex: 1;">❤️ 좋아요 (${post.likes})</button>
            <button class="btn btn-secondary" onclick="replyToPost(${post.id})" style="flex: 1;">💬 답글 달기</button>
        </div>

        <div style="border-top: 2px solid #e5e7eb; padding-top: 20px;">
            <h4 style="color: #1f2937; margin-bottom: 15px;">💬 답글 (${post.comments ? post.comments.length : 0})</h4>

            <div id="commentsList_${post.id}" style="margin-bottom: 20px;">
                ${renderComments(post)}
            </div>

            <div id="replyForm_${post.id}" style="display: none; background: #e0f2fe; padding: 15px; border-radius: 8px;">
                <textarea id="replyContent_${post.id}" placeholder="답글을 작성해주세요..." style="width: 100%; padding: 10px; border: 1px solid #0066CC; border-radius: 6px; margin-bottom: 10px; min-height: 100px; box-sizing: border-box;"></textarea>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" onclick="submitReply(${post.id})" style="flex: 1;">✅ 답글 제출</button>
                    <button class="btn btn-secondary" onclick="cancelReply(${post.id})" style="flex: 1;">취소</button>
                </div>
            </div>
        </div>
    `;

    content.innerHTML = html;
    modal.classList.add('show');
}

// 답글 렌더링
function renderComments(post) {
    if (!post.comments || post.comments.length === 0) {
        return '<p style="color: #999; text-align: center; padding: 20px;">아직 답글이 없습니다. 첫 번째 답글을 달아보세요!</p>';
    }

    return post.comments.map((comment, idx) => `
        <div style="background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #0066CC; margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong style="color: #0066CC;">${comment.author}</strong>
                <span style="color: #999; font-size: 12px;">${formatDate(new Date(comment.timestamp))}</span>
            </div>
            <p style="margin: 0; color: #333; line-height: 1.5;">${comment.content}</p>
        </div>
    `).join('');
}

// 답글 달기
function replyToPost(postId) {
    const form = document.getElementById(`replyForm_${postId}`);
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}

// 답글 제출
function submitReply(postId) {
    const post = forumPosts.find(p => p.id === postId);
    if (!post) return;

    const replyContent = document.getElementById(`replyContent_${postId}`).value.trim();

    if (!replyContent) {
        alert('답글 내용을 입력해주세요');
        return;
    }

    if (!post.comments) {
        post.comments = [];
    }

    post.comments.push({
        author: getCurrentUser() || '익명',
        content: replyContent,
        timestamp: new Date().toISOString()
    });

    post.replies = post.comments.length;

    localStorage.setItem('forum_posts', JSON.stringify(forumPosts));

    // UI 업데이트
    document.getElementById(`commentsList_${postId}`).innerHTML = renderComments(post);
    document.getElementById(`replyForm_${postId}`).style.display = 'none';
    document.getElementById(`replyContent_${postId}`).value = '';

    alert('✅ 답글이 등록되었습니다!');
}

// 답글 취소
function cancelReply(postId) {
    const form = document.getElementById(`replyForm_${postId}`);
    if (form) {
        form.style.display = 'none';
        document.getElementById(`replyContent_${postId}`).value = '';
    }
}

// 포스트 좋아요
function likePost(postId) {
    const post = forumPosts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        localStorage.setItem('forum_posts', JSON.stringify(forumPosts));
        openPostDetail(postId); // 상세보기 새로고침
    }
}

// 포스트 상세보기 닫기
function closePostDetailModal() {
    document.getElementById('postDetailModal').classList.remove('show');
}

// 현재 사용자 조회
function getCurrentUser() {
    const session = localStorage.getItem('AUTH_KEY');
    if (session) {
        const auth = JSON.parse(session);
        return auth.name || auth.email;
    }
    return null;
}

// 초기 로드
document.addEventListener('DOMContentLoaded', () => {
    initializeForumData();
    loadPosts();
});

// 모달 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
    const newPostModal = document.getElementById('newPostModal');
    const postDetailModal = document.getElementById('postDetailModal');

    if (e.target === newPostModal) {
        closeNewPostModal();
    }
    if (e.target === postDetailModal) {
        closePostDetailModal();
    }
});
