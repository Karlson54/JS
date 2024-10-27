import { initializeModalListeners } from './modal';
import { initializeScrollEvent } from './scroll';
import { fetchData } from './dataFetch';
import { initializeSmoothScroll } from './smoothScroll';
import { initializeAnimation } from './animation';

document.addEventListener('DOMContentLoaded', () => {
    initializeModalListeners();
    initializeScrollEvent();
    fetchData();
    initializeSmoothScroll();
    initializeAnimation();
});
