export function initializeSmoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = (e.target as HTMLAnchorElement).getAttribute('href');
            if (target) {
                document.querySelector(target)?.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
