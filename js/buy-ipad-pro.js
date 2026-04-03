document.addEventListener("DOMContentLoaded", () => {
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  const toggleAllBtn = document.getElementById('faqToggleAll');

  if (toggleAllBtn) {
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question');
      if (btn) {
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          // Close all
          faqItems.forEach(i => i.classList.remove('open'));
          // Toggle current
          if (!isOpen) item.classList.add('open');
        });
      }
    });

    // Toggle all open/close
    toggleAllBtn.addEventListener('click', () => {
      const anyOpen = document.querySelector('.faq-item.open');
      if (anyOpen) {
        faqItems.forEach(i => i.classList.remove('open'));
        toggleAllBtn.classList.remove('open');
      } else {
        faqItems.forEach(i => i.classList.add('open'));
        toggleAllBtn.classList.add('open');
      }
    });
  }
});

// =======================
// Gallery Slider Logic
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const galleryWrapper = document.querySelector('.raw-image > div');
  const items = document.querySelectorAll('.inline-image-item');
  const dotBtns = document.querySelectorAll('.gallery-dotnav-button');
  const prevBtn = document.querySelector('.paddlenav-arrow-previous');
  const nextBtn = document.querySelector('.paddlenav-arrow-next');

  if (!galleryWrapper || items.length === 0) return;

  let currentIndex = 0;
  const numItems = items.length;

  // Set initial transition style so it animates smoothly after initial render
  setTimeout(() => {
    galleryWrapper.style.transition = 'transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)';
  }, 100);

  function updateGallery(index) {
    currentIndex = index;
    // Each item takes 50% of the 200% width container, so moving -50% shifts by one item
    const translatePct = -(currentIndex * (100 / numItems));
    galleryWrapper.style.transform = `translateX(${translatePct}%)`;

    // Update dots (disable the active one)
    dotBtns.forEach((btn, i) => {
      if (i === currentIndex) {
        btn.setAttribute('disabled', 'true');
      } else {
        btn.removeAttribute('disabled');
      }
    });

    // Update buttons visibility
    if (currentIndex === 0) {
      prevBtn.classList.add('visuallyhidden');
    } else {
      prevBtn.classList.remove('visuallyhidden');
    }

    if (currentIndex === numItems - 1) {
      nextBtn.classList.add('visuallyhidden');
    } else {
      nextBtn.classList.remove('visuallyhidden');
    }
  }

  // Next/Prev Events
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) updateGallery(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < numItems - 1) updateGallery(currentIndex + 1);
    });
  }

  // Dots Events
  dotBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      updateGallery(index);
    });
  });

  // Initialize
  updateGallery(0);

  // =======================
  // Progress Scrollbar Logic
  // =======================
  const scrollbarIndicator = document.querySelector('.rc-progress-scrollbar-indicator');
  const stickyMain = document.querySelector('.sticky-image-main');

  function updateScrollbarProgress() {
    if (!scrollbarIndicator || !stickyMain) return;

    const rect = stickyMain.getBoundingClientRect();
    const totalHeight = stickyMain.offsetHeight;
    const viewportH = window.innerHeight;

    // How far we've scrolled into sticky-image-main
    // When rect.top == 0: just entered. When rect.bottom == viewportH: just about to leave.
    // Scrollable distance = totalHeight - viewportH (the portion that passes through the viewport)
    const scrollableDistance = totalHeight - viewportH;

    if (scrollableDistance <= 0) {
      scrollbarIndicator.style.height = '0%';
      return;
    }

    // px scrolled = how much of the element has passed the top of the viewport
    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

    scrollbarIndicator.style.height = (progress * 100) + '%';
  }

  window.addEventListener('scroll', updateScrollbarProgress, { passive: true });
  updateScrollbarProgress(); // Initialize on load


  const stickyBar = document.querySelector('.sticky-bar');
  const headerPrice = document.querySelector('.header-price-wrapper');
  const stickyImageMain = document.querySelector('.sticky-image-main');

  if (stickyBar && headerPrice && stickyImageMain) {
    let isPastHeader = false;
    let isPastMain = false;

    const updateStickyBar = () => {
      // Chỉ hiện sticky bar khi đã cuộn qua header và chưa cuộn quá toàn bộ khu vực chọn cấu hình
      if (isPastHeader && !isPastMain) {
        stickyBar.classList.add('is-visible');
      } else {
        stickyBar.classList.remove('is-visible');
      }
    };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isPastHeader = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      });
      updateStickyBar();
    }, { threshold: 0 });

    const mainObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Khi bottom của thẻ sticky-image-main < 0 nghĩa là nó đã bị cuộn hoàn toàn lên trên (khuất màn hình)
        // Chúng ta có thể dùng threshold 0 để bắt sự kiện ngay khi pixel cuối cùng biến mất
        // Hoặc offset một chút, nhưng bottom < 0 là an toàn tuyệt đối.
        isPastMain = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      });
      updateStickyBar();
    }, { threshold: 0 });

    headerObserver.observe(headerPrice);
    mainObserver.observe(stickyImageMain);
  }

  // =======================
  // Buy Flow Logic
  // =======================
  initBuyFlow();
});

function initBuyFlow() {
  // --- Pricing data ---
  const prices = {
    '11inch': {
      '256gb': { 'glossy': { 'wifi': 27199000, 'wificell': 32799000 }, 'matte': null },
      '512gb': { 'glossy': { 'wifi': 32799000, 'wificell': 38399000 }, 'matte': null },
      '1tb': { 'glossy': { 'wifi': 43999000, 'wificell': 49599000 }, 'matte': { 'wifi': 46799000, 'wificell': 52399000 } },
      '2tb': { 'glossy': { 'wifi': 55199000, 'wificell': 60799000 }, 'matte': { 'wifi': 57999000, 'wificell': 63599000 } },
    },
    '13inch': {
      '256gb': { 'glossy': { 'wifi': 37199000, 'wificell': 42799000 }, 'matte': null },
      '512gb': { 'glossy': { 'wifi': 42799000, 'wificell': 48399000 }, 'matte': null },
      '1tb': { 'glossy': { 'wifi': 53999000, 'wificell': 59599000 }, 'matte': { 'wifi': 56799000, 'wificell': 62399000 } },
      '2tb': { 'glossy': { 'wifi': 65199000, 'wificell': 70799000 }, 'matte': { 'wifi': 67999000, 'wificell': 73599000 } },
    }
  };

  // State
  const state = { size: null, color: null, capacity: null, finish: null, connection: null };

  // --- Helper: format number ---
  function formatPrice(n) {
    if (typeof n !== 'number') return "";
    return n.toLocaleString('vi-VN') + 'đ';
  }

  // --- Helper: Compute "Price From" for any given partial state ---
  function computePriceFromState(currentState) {
    const capacities = ["256gb", "512gb", "1tb", "2tb"];
    const finishes = ["glossy", "matte"];
    const connections = ["wifi", "wificell"];

    const targetSizes = currentState.size ? [currentState.size] : ["11inch", "13inch"];
    const targetCapacities = currentState.capacity ? [currentState.capacity] : capacities;
    const targetFinishes = currentState.finish ? [currentState.finish] : finishes;
    const targetConnections = currentState.connection ? [currentState.connection] : connections;

    let min = Infinity;
    targetSizes.forEach(s => {
      targetCapacities.forEach(cap => {
        const capNode = prices[s]?.[cap];
        if (!capNode) return;
        targetFinishes.forEach(fin => {
          const finNode = capNode[fin];
          if (!finNode) return;
          targetConnections.forEach(conn => {
            const p = finNode[conn];
            if (typeof p === 'number' && p < min) min = p;
          });
        });
      });
    });
    return min === Infinity ? null : min;
  }

  // --- Helper: Sync all price labels in the UI based on current state ---
  function syncAllPrices() {
    // 1. Update Main Price Totals (Header, Sticky Bar, Summary)
    const currentMin = computePriceFromState(state);

    if (currentMin !== null) {
      const formatted = formatPrice(currentMin);
      if (summaryPrice) summaryPrice.textContent = `Từ ${formatted}`;
      if (stickyBarPrice) stickyBarPrice.textContent = formatted;
      if (headerPriceEl) headerPriceEl.textContent = formatted;
    }

    // 2. Update Option-level "From" prices (Contextual prices)
    const groups = [
      { name: "dimensionScreensize", key: "size" },
      { name: "dimensionCapacity", key: "capacity" },
      { name: "dimensionFinish", key: "finish" },
      { name: "dimensionConnection", key: "connection" },
      { name: "dimensionEngraving", key: "engraving" }
    ];

    groups.forEach(group => {
      const inputs = document.querySelectorAll(`input[name="${group.name}"]`);
      inputs.forEach(input => {
        const testState = { ...state, [group.key]: input.value };
        const priceFrom = computePriceFromState(testState);

        if (priceFrom !== null) {
          // Use CSS.escape for IDs that might contain colons
          const escapedId = (window.CSS && CSS.escape) ? CSS.escape(input.id) : input.id;
          const label = document.querySelector(`label[for="${escapedId}"]`);

          if (label) {
            const priceEl = label.querySelector(".nowrap") || label.querySelector(".price-point");
            if (priceEl) {
              const f = formatPrice(priceFrom);
              if (group.name === "dimensionScreensize") {
                priceEl.textContent = f;
              } else {
                priceEl.textContent = (priceEl.classList.contains('nowrap') ? "" : "Từ ") + f;
              }
            }
          }
        }
      });
    });

    // 3. Update Summary Title
    updateSummaryTitle();
  }

  // --- Helper: enable a step (remove disabled from all inputs & labels) ---
  function enableStep(stepEl) {
    if (!stepEl) return;
    stepEl.classList.remove('rf-bfe-step-disabled');
    stepEl.querySelectorAll('input, select, button').forEach(el => {
      el.removeAttribute('disabled');
    });
    stepEl.querySelectorAll('.colornav-items, .rc-dimension-selector-group, .rf-inlineaccessorylot-disabled')
      .forEach(el => el.classList.remove('rf-bfe-step-disabled'));
    stepEl.querySelectorAll('fieldset').forEach(f => f.removeAttribute('disabled'));
  }

  // --- Helper: disable a step ---
  function disableStep(stepEl) {
    if (!stepEl) return;
    stepEl.classList.add('rf-bfe-step-disabled');
    stepEl.querySelectorAll('input, select, button').forEach(el => {
      el.setAttribute('disabled', '');
      if (el.type === 'radio') el.checked = false;
    });
    stepEl.querySelectorAll('fieldset').forEach(f => f.setAttribute('disabled', ''));
  }

  // --- Helper: show/hide element with animation ---
  function showEl(el) {
    if (!el) return;
    el.style.maxHeight = el.scrollHeight + 'px';
    el.style.opacity = '1';
    el.style.overflow = 'visible';
  }
  function hideEl(el) {
    if (!el) return;
    el.style.maxHeight = '0';
    el.style.opacity = '0';
    el.style.overflow = 'hidden';
  }

  // --- Steps ---
  const stepSize = document.querySelector('.rf-bfe-dimension-dimensionscreensize');
  const stepColor = document.querySelector('.rf-bfe-dimension-dimensioncolor');
  const stepCapacity = document.querySelector('.rf-bfe-dimension-dimensioncapacity');
  const stepFinish = document.querySelector('.rf-bfe-dimension-dimensionfinish');
  const stepConnection = document.querySelector('.rf-bfe-dimension-dimensionconnection');
  const stepEngraving = document.querySelector('.rf-bfe-engraving');
  const stepPencil = document.getElementById('acc_pencil');
  const stepKeyboard11 = document.getElementById('acc_keyboard_11inch');
  const stepKeyboard13 = document.getElementById('acc_keyboard_13inch');

  // Summary elements
  const summaryTitle = document.querySelector('.rf-bfe-summary-producttitle');
  const summaryPrice = document.querySelector('.rf-bfe-summary-price .price-point');
  const continueBtn = document.querySelector('.rc-summary-button button');

  // Sticky bar price
  const stickyBarPrice = document.querySelector('.sticky-bar-price span');
  const headerPriceEl = document.querySelector('.rc-prices-currentprice .nowrap');

  // --- Update summary product name ---
  function updateSummaryTitle() {
    const { size, color, capacity, finish, connection } = state;
    if (!size || !color || !capacity) return;
    const sizeLabel = size === '11inch' ? '11 inch' : '13 inch';
    const colorLabel = color === 'spaceblack' ? 'Đen Không Gian' : 'Bạc';
    const capLabel = { '256gb': '256GB', '512gb': '512GB', '1tb': '1TB', '2tb': '2TB' }[capacity] || '';
    if (summaryTitle) summaryTitle.textContent = `iPad Pro ${sizeLabel}, ${capLabel}, ${colorLabel}`;
  }

  // --- Handle Nano-texture availability (only for 1TB / 2TB) ---
  function updateFinishAvailability() {
    const matte = document.querySelector('input[name="dimensionFinish"][value="matte"]');
    if (!matte) return;
    const matteLabel = matte.nextElementSibling;
    if (state.capacity === '1tb' || state.capacity === '2tb') {
      matte.removeAttribute('disabled');
      if (matteLabel) matteLabel.classList.remove('form-selector-disabled');
    } else {
      matte.setAttribute('disabled', '');
      if (matte.checked) {
        matte.checked = false;
        state.finish = null;
      }
      if (matteLabel) matteLabel.classList.add('form-selector-disabled');
    }
  }

  // --- Handle accessory engraving reveal (for Apple Pencil Pro) ---
  function handlePencilEngraving(selectedValue) {
    const reveal = document.querySelector('#acc_pencil .rf-inlineaccessorylot-accessory-reveal');
    if (!reveal) return;
    if (selectedValue === 'acc_pencil_grp_pro') {
      reveal.style.display = 'block';
    } else {
      reveal.style.display = 'none';
    }
  }

  // --- Handle keyboard visibility based on size ---
  function updateKeyboardVisibility() {
    if (!stepKeyboard11 || !stepKeyboard13) return;
    if (state.size === '11inch') {
      stepKeyboard11.classList.remove('rf-inlineaccessorylot-hidden');
      stepKeyboard13.classList.add('rf-inlineaccessorylot-hidden');
    } else if (state.size === '13inch') {
      stepKeyboard11.classList.add('rf-inlineaccessorylot-hidden');
      stepKeyboard13.classList.remove('rf-inlineaccessorylot-hidden');
    }
  }

  // --- Scroll to next step smoothly ---
  function scrollToStep(stepEl) {
    if (!stepEl) return;
    setTimeout(() => {
      stepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  // ============================
  // Step 1: Size
  // ============================
  document.querySelectorAll('input[name="dimensionScreensize"]').forEach(input => {
    input.addEventListener('change', () => {
      state.size = input.value;
      // Reset downstream
      state.color = state.capacity = state.finish = state.connection = null;
      [stepColor, stepCapacity, stepFinish, stepConnection, stepPencil, stepKeyboard11, stepKeyboard13]
        .forEach(disableStep);
      enableStep(stepColor);
      updateKeyboardVisibility();
      syncAllPrices();
      scrollToStep(stepColor);
    });
  });

  // ============================
  // Step 2: Color
  // ============================
  document.querySelectorAll('input[name="dimensionColor"]').forEach(input => {
    input.addEventListener('change', () => {
      state.color = input.value;
      state.capacity = state.finish = state.connection = null;
      [stepCapacity, stepFinish, stepConnection, stepPencil, stepKeyboard11, stepKeyboard13]
        .forEach(disableStep);
      enableStep(stepCapacity);
      syncAllPrices();
      scrollToStep(stepCapacity);
    });
  });

  // ============================
  // Step 3: Capacity
  // ============================
  document.querySelectorAll('input[name="dimensionCapacity"]').forEach(input => {
    input.addEventListener('change', () => {
      state.capacity = input.value;
      state.finish = state.connection = null;
      [stepFinish, stepConnection, stepPencil, stepKeyboard11, stepKeyboard13]
        .forEach(disableStep);
      enableStep(stepFinish);
      updateFinishAvailability();
      syncAllPrices();
      scrollToStep(stepFinish);
    });
  });

  // ============================
  // Step 4: Finish (Glass)
  // ============================
  document.querySelectorAll('input[name="dimensionFinish"]').forEach(input => {
    input.addEventListener('change', () => {
      state.finish = input.value;
      state.connection = null;
      [stepConnection, stepPencil, stepKeyboard11, stepKeyboard13]
        .forEach(disableStep);
      enableStep(stepConnection);
      syncAllPrices();
      scrollToStep(stepConnection);
    });
  });

  // ============================
  // Step 5: Connection
  // ============================
  document.querySelectorAll('input[name="dimensionConnection"]').forEach(input => {
    input.addEventListener('change', () => {
      state.connection = input.value;

      // Enable accessory sections
      enableStep(stepEngraving);
      // Enable correct keyboard based on size
      if (state.size === '11inch') enableStep(stepKeyboard11);
      else if (state.size === '13inch') enableStep(stepKeyboard13);

      syncAllPrices();

      // Enable continue button
      if (continueBtn) {
        continueBtn.removeAttribute('disabled');
        // Final summary section should be enabled too
        const stepSummary = document.querySelector('.rf-bfe-summary');
        if (stepSummary) stepSummary.classList.remove('rf-bfe-step-disabled');
      }

      // Scroll to the next visible major action (Pencil)
      scrollToStep(stepEngraving);
    });
  });

  // ============================
  // Step 6: Engraving
  // ============================
    document.querySelectorAll('input[name="dimensionEngraving"]').forEach(input => {
    input.addEventListener('change', () => {
      state.engraving = input.value;
      state.pencil = null;
      [stepPencil, stepKeyboard11, stepKeyboard13]
        .forEach(disableStep);
      enableStep(stepPencil);
      syncAllPrices();
      scrollToStep(stepPencil);
    });
  });

  // ============================
  // Apple Pencil → Engraving reveal
  // ============================
  document.querySelectorAll('input[name="acc_pencil"]').forEach(input => {
    input.addEventListener('change', () => {
      handlePencilEngraving(input.value);
    });
  });

  // ============================
  // Keyboard selectors → scroll to next
  // ============================
  ['acc_keyboard_11inch', 'acc_keyboard_13inch'].forEach(name => {
    document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
      input.addEventListener('change', () => {
        // Show/hide the inline reveal panel
        const slot = input.closest('.rf-bfe-accessory-slot');
        const reveal = slot?.querySelector('.rf-inlineaccessorylot-accessory-reveal');
        const isAdd = !input.value.includes('noaccessory');
        if (reveal) reveal.style.display = isAdd ? 'block' : 'none';
      });
    });
  });

  // ============================
  // Init: only step 1 enabled
  // ============================
  [stepColor, stepCapacity, stepFinish, stepConnection, stepEngraving, stepPencil, stepKeyboard11, stepKeyboard13]
    .filter(Boolean)
    .forEach(s => s.classList.add('rf-bfe-step-disabled'));

  // Keyboard 13-inch hidden until 13-inch is selected
  if (stepKeyboard13) stepKeyboard13.classList.add('rf-inlineaccessorylot-hidden');

  // Set initial prices
  syncAllPrices();
}
