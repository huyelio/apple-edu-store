// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
const toggleAllBtn = document.getElementById('faqToggleAll');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    faqItems.forEach(i => i.classList.remove('open'));
    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
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