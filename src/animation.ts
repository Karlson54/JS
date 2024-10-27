export function initializeAnimation(): void {
    document.querySelectorAll('.animate-button').forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.add('animated');
            setTimeout(() => {
                button.classList.remove('animated');
            }, 1000);
        });
    });
}
