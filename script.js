// スクロールアニメーション
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// スムーススクロール
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// CTAボタンのクリックハンドラー
function handlePurchase() {
    // 実際の購入ページへのリダイレクトまたはモーダル表示
    alert('購入ページへリダイレクトします。\n（実装時は適切なURLに変更してください）');
    // window.location.href = '/purchase';
}

function handleContact() {
    // 実際の問い合わせページへのリダイレクトまたはモーダル表示
    alert('お問い合わせページへリダイレクトします。\n（実装時は適切なURLに変更してください）');
    // window.location.href = '/contact';
}

// パララックス効果
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// カウンターアニメーション
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / 200;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// フォームバリデーション（将来的な拡張用）
function validateForm(formData) {
    const errors = [];
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.push('有効なメールアドレスを入力してください。');
    }
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('お名前は2文字以上で入力してください。');
    }
    
    return errors;
}

// ローディングアニメーション
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <p>読み込み中...</p>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// モーダル機能（将来的な拡張用）
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// トップへ戻るボタン
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4bb9a8;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(75, 185, 168, 0.3);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    // スクロール位置に応じて表示/非表示
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
        }
    });
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', function() {
    // スクロールアニメーションの初期化
    const animateElements = document.querySelectorAll('.feature-card, .benefit-item, .problem-item');
    animateElements.forEach(element => {
        element.classList.add('scroll-animate');
    });
    
    // トップへ戻るボタンの作成
    createBackToTopButton();
    
    // 初期アニメーション実行
    handleScrollAnimation();
});

// スクロールイベント
window.addEventListener('scroll', () => {
    handleScrollAnimation();
    handleParallax();
});

// リサイズイベント
window.addEventListener('resize', () => {
    // レスポンシブ対応の追加処理があれば記述
});

// キーボードナビゲーション
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // モーダルが開いている場合は閉じる
        const openModals = document.querySelectorAll('.modal[style*="flex"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

// パフォーマンス最適化：スクロールイベントのスロットリング
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScrollAnimation();
            handleParallax();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('エラーが発生しました:', e.error);
    // 本番環境では適切なエラー報告システムに送信
});

// 未処理のPromise拒否をキャッチ
window.addEventListener('unhandledrejection', (e) => {
    console.error('未処理のPromise拒否:', e.reason);
    e.preventDefault();
});

