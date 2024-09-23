"use strict";

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function init() {
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

    window.addEventListener('scroll', () => {
        const nav = document.getElementById('tm-nav');
        if (window.scrollY > 100) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });

    fetchData();

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

    document.querySelectorAll('.animate-button').forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.add('animated');
            setTimeout(() => {
                button.classList.remove('animated');
            }, 1000);
        });
    });
}

async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        const postsContainer = document.getElementById('posts');
        if (postsContainer) {
            postsContainer.innerHTML = data.slice(0, 5).map((post) => `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);