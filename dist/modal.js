export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}
export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}
export function initializeModalListeners() {
    document.querySelectorAll('.open-modal').forEach((button) => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            if (modalId) {
                openModal(modalId);
            }
        });
    });
    document.querySelectorAll('.close-modal').forEach((button) => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            if (modalId) {
                closeModal(modalId);
            }
        });
    });
}
