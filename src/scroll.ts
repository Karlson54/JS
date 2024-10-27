export function initializeScrollEvent(): void {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('tm-nav');
        if (window.scrollY > 100) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });
}
