export async function fetchData(): Promise<void> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        const postsContainer = document.getElementById('posts');
        if (postsContainer) {
            postsContainer.innerHTML = data.slice(0, 5).map((post: any) => `
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
