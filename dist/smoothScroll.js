export function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            if (target) {
                document.querySelector(target)?.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
