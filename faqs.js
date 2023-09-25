const faqSelect = document.getElementById('faq-ans');
const faqItems = document.querySelectorAll('.faq-item');

faqSelect.addEventListener('change', () => {
    faqItems.forEach(item => item.querySelector('.faq-answer').style.display = 'none');
    const selectedAnswer = document.querySelector(`.faq-item[data-faq="${faqSelect.value}"] .faq-answer`);
    selectedAnswer.style.display = 'block';
});

faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        faqItems.forEach(i => i.querySelector('.faq-answer').style.display = 'none');
        item.querySelector('.faq-answer').style.display = 'block';
    });
});