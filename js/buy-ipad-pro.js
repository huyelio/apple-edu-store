// Customer form
{
  const nameDiv = document.getElementById('customer-name');
  const telDiv = document.getElementById('customer-tel');
  const button = document.getElementById('customer-btn');
  const successMsg = document.getElementById('customer-success');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const customerName = validateDiv(nameDiv);
    const customerTel = validateDiv(telDiv);
    if (customerName && customerTel) {
      console.log(`Fullname: ${customerName}\nTelephone: ${customerTel}`);
      successMsg.classList.add('visible');
    }
  });
}

const validateDiv = (fieldDiv) => {
  const input = fieldDiv.children[0].children[0];
  if (input.validity.valid) {
    input.classList.remove('error');
    fieldDiv.children[1].classList.remove('visible');
    return input.value;
  }
  input.classList.add('error');
  fieldDiv.children[1].classList.add('visible');
  return null;
};

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