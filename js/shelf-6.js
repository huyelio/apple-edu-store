// Đóng gói logic vào một hàm
const initShelf6 = () => {
    const shelf6Container = document.getElementById('shelf-6');
    
    // Thêm một dòng log nhỏ để bạn biết script có chạy hay không
    if (!shelf6Container) {
        console.warn("JS đã chạy nhưng chưa tìm thấy thẻ <div id='shelf-6'> nào trên trang.");
        return;
    }

    const allSlots = window.pageLevelData?.slots || [];
    const shelf6Data = allSlots.find(slot => slot.slotName === 'shelf-6');

    if (!shelf6Data || !shelf6Data.cards || !shelf6Data.cards.items) return;

    let html = `<div class="apple-shelf-container">`;

    if (shelf6Data.shelfTitle) {
        html += `<div class="shelf-header-wrapper">${shelf6Data.shelfTitle}</div>`;
    }

    html += `<div class="rf-cards-scroller-content" role="region" aria-label="${shelf6Data.navTitle || shelf6Data.shelfTitleA11yText || 'Phụ kiện'}">`;

    let allCards = [];
    shelf6Data.cards.items.forEach((item) => {
        if (item.value && item.value.items && Array.isArray(item.value.items)) {
            allCards = allCards.concat(item.value.items);
        } else {
            allCards.push(item);
        }
    });

    allCards.forEach((cardItem, itemIndex) => {
        try {
            if (!cardItem || !cardItem.value) return;

            let cardWrap = cardItem.value;
            if (cardWrap.items && Array.isArray(cardWrap.items)) {
                cardWrap = cardWrap.items[0].value;
            }
            if (!cardWrap || cardWrap.view === "productNavCard") return;

            // 1. RENDER CONTENT CARD (Banner)
            if (cardWrap.cardType?.contentCard?.contentStoreCard) {
                const card = cardWrap.cardType.contentCard.contentStoreCard;
                const isDark = cardWrap.darkTheme ? 'dark-theme' : '';
                const sizeClass = cardWrap.cardSize ? `size-${cardWrap.cardSize}` : 'size-40';
                const extraClasses = cardWrap.cssClasses || '';

                const tag = card.messagingTag ? `<div class="apple-card-tag">${card.messagingTag}</div>` : '';
                const headline = card.headline || '';
                const subheadline = card.subheadline || '';

                const imgData = card.cardImage;
                const imgUrl = imgData?.sources?.[0]?.srcSet || '';
                const imgWidth = parseInt(imgData?.width) || 400;
                const imgHeight = parseInt(imgData?.height) || 500;

                let rawLink = card.textLink?.link || '#';
                let fullLink = rawLink;
                if (rawLink && !rawLink.startsWith('http') && !rawLink.startsWith('#')) {
                    if (rawLink.startsWith('/vn-edu')) fullLink = 'https://www.apple.com' + rawLink;
                    else if (rawLink.startsWith('/')) fullLink = 'https://www.apple.com/vn-edu' + rawLink;
                    else fullLink = 'https://www.apple.com/vn-edu/' + rawLink;
                }

                const ariaLabel = card.alt || headline.replace(/<[^>]*>/g, '').trim();
                const newTabAttr = card.textLink?.newTab || cardWrap.opensInNewWindow ? 'target="_blank" rel="noopener"' : '';

                html += `
                    <a href="${fullLink}" ${newTabAttr} 
                        class="apple-card ${isDark} ${sizeClass} ${extraClasses}" 
                        style="aspect-ratio: ${imgWidth} / ${imgHeight};"
                        aria-label="${ariaLabel}"
                        role="link"
                        data-card-index="${itemIndex}">
                        <img src="${imgUrl}" 
                             class="apple-card-img" 
                             alt="" 
                             loading="lazy"
                             decoding="async">
                        <div class="apple-card-content">
                            ${tag}
                            <div class="apple-card-title">${headline}</div>
                            ${subheadline ? `<div class="apple-card-desc">${subheadline}</div>` : ''}
                        </div>
                    </a>
                `;
            }
            // 2. RENDER RECOMMENDATION CARD (Sản Phẩm Trắng)
            else if (cardWrap.view === "recommendationCard" && cardWrap.products && cardWrap.products.length > 0) {
                const product = cardWrap.products[0];
                const isDark = cardWrap.darkTheme ? 'dark-theme' : '';
                const sizeClass = cardWrap.cardSize ? `size-${cardWrap.cardSize}` : 'size-33';

                let priceText = "";
                const priceKey = product.price;
                if (cardWrap.dictionaries?.price?.[priceKey]?.currentPrice?.amount) {
                    priceText = cardWrap.dictionaries.price[priceKey].currentPrice.amount;
                }

                let imgUrl = "";
                const imgKey = product.productImage;
                if (cardWrap.dictionaries?.productImage?.[imgKey]?.sources?.[0]?.srcSet) {
                    imgUrl = cardWrap.dictionaries.productImage[imgKey].sources[0].srcSet;
                }

                const headline = product.title || '';
                let fullLink = product.productDetailsUrl || '#';
                const inlineSize = (sizeClass === 'size-33') ? 'flex: 0 0 300px; max-width: 300px; min-width: 240px;' : '';

                html += `
                    <a href="${fullLink}" 
                        class="apple-card product-card ${isDark} ${sizeClass}" 
                        target="_blank" rel="noopener"
                        style="aspect-ratio: 4 / 5; background-color: #ffffff; padding: 30px; display: flex; flex-direction: column; justify-content: space-between; text-decoration: none; ${inlineSize}"
                        data-card-index="${itemIndex}">
                        <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; padding-bottom: 20px; position: relative; z-index: 2;">
                            <img src="${imgUrl}" alt="${headline}" style="max-width: 100%; max-height: 200px; object-fit: contain; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" loading="lazy" decoding="async">
                        </div>
                        <div style="position: relative; z-index: 2; text-align: left;">
                            <div style="font-size: 17px; font-weight: 600; color: #1d1d1f; margin-bottom: 8px; line-height: 1.2;">${headline}</div>
                            <div style="font-size: 14px; color: #1d1d1f;">${priceText}</div>
                        </div>
                    </a>
                `;
            }
        } catch (e) {
            console.error('Lỗi xử lý card ở shelf-6:', e, cardItem);
        }
    });

    html += `</div></div>`;
    shelf6Container.innerHTML = html;

    // SCROLL LOGIC
    const scroller = shelf6Container.querySelector('.rf-cards-scroller-content');
    if (!scroller) return;

    let isDown = false, isDragging = false;
    let startX, startY, scrollLeft, scrollTop, lastX = 0, velocity = 0, animationFrame = null;

    function animateScroll() {
        velocity *= 0.92;
        if (Math.abs(velocity) > 0.5) {
            scroller.scrollLeft -= velocity;
            animationFrame = requestAnimationFrame(animateScroll);
        } else {
            velocity = 0; animationFrame = null;
        }
    }

    scroller.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDown = true; isDragging = false;
        startX = e.pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
        scroller.style.scrollSnapType = 'none';
        scroller.classList.add('dragging');
        if (animationFrame) cancelAnimationFrame(animationFrame);
        velocity = 0; lastX = startX;
    });

    scroller.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false; scroller.classList.remove('dragging');
            setTimeout(() => { if (!isDown) scroller.style.scrollSnapType = 'x mandatory'; }, 100);
        }
    });

    scroller.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false; scroller.classList.remove('dragging');
        setTimeout(() => {
            if (!isDown) { scroller.style.scrollSnapType = 'x mandatory'; isDragging = false; }
        }, 150);
        if (isDragging && Math.abs(velocity) > 1) animateScroll();
    });

    scroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scroller.offsetLeft;
        if (!isDragging && Math.abs(x - startX) > 5) isDragging = true;
        if (isDragging) {
            scroller.scrollLeft = scrollLeft - ((x - startX) * 1.5);
            velocity = (x - lastX) * 0.6;
            lastX = x;
        }
    });

    const links = scroller.querySelectorAll('.apple-card');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (Math.abs(scroller.scrollLeft - scrollLeft) > 10) {
                e.preventDefault(); e.stopPropagation();
            }
        });
    });
};

// GỌI HÀM CHẠY NGAY LẬP TỨC (KHÔNG CHỜ ĐỢI SỰ KIỆN NÀO CẢ)
initShelf6();