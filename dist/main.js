import { initializeModalListeners } from './modal.js';
import { initializeScrollEvent } from './scroll.js';
import { fetchData } from './dataFetch.js';
import { initializeSmoothScroll } from './smoothScroll.js';
import { initializeAnimation } from './animation.js';
document.addEventListener('DOMContentLoaded', () => {
    initializeModalListeners();
    initializeScrollEvent();
    fetchData();
    initializeSmoothScroll();
    initializeAnimation();
});
