// Initialize Swiper only if the library and the container exist
if (typeof Swiper !== 'undefined') {
    try {
        new Swiper('.slider-wrapper', {
            loop: true,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    } catch (e) {
        // fail silently if Swiper container/config is not present
        // console.warn('Swiper init failed', e);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const cards = document.querySelectorAll('.card-article');

    // If any required element is missing, don't attach listeners.
    if (!searchInput || !filterSelect || !cards || cards.length === 0) return;

    function filterCards() {
        const search = (searchInput.value || '').toLowerCase();
        const category = filterSelect.value || '';

        cards.forEach(card => {
            const name = (card.dataset.name || '').toLowerCase();
            const cat = card.dataset.category || '';

            const matchesSearch = name.includes(search);
            const matchesFilter = category === '' || cat === category;

            card.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
        });
    }

    searchInput.addEventListener('input', filterCards);
    filterSelect.addEventListener('change', filterCards);

    // run once to apply any default filter state
    filterCards();
});