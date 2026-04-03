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
});
