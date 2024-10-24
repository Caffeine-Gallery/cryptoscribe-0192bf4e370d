import { backend } from 'declarations/backend';

let quill;

// Initialize Quill editor
function initQuill() {
  quill = new Quill('#editor', {
    theme: 'snow'
  });
}

// Fetch and display posts
async function loadPosts() {
  const postsContainer = document.getElementById('posts-container');
  // Clear existing posts
  postsContainer.innerHTML = '';

  try {
    const posts = await backend.getPosts();

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'post';

      const titleElement = document.createElement('h2');
      titleElement.textContent = post.title;

      const authorElement = document.createElement('div');
      authorElement.className = 'author';
      const date = new Date(Number(post.timestamp) / 1000000);
      authorElement.textContent = `By ${post.author} on ${date.toLocaleString()}`;

      const bodyElement = document.createElement('div');
      bodyElement.className = 'body';
      bodyElement.innerHTML = post.body;

      postElement.appendChild(titleElement);
      postElement.appendChild(authorElement);
      postElement.appendChild(bodyElement);

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Show new post modal
function showNewPostModal() {
  const modal = document.getElementById('new-post-modal');
  modal.style.display = 'block';
}

// Hide new post modal
function hideNewPostModal() {
  const modal = document.getElementById('new-post-modal');
  modal.style.display = 'none';
}

// Handle new post submission
async function handleNewPost(event) {
  event.preventDefault();
  const title = document.getElementById('post-title').value;
  const author = document.getElementById('post-author').value;
  const body = quill.root.innerHTML;

  try {
    await backend.addPost(title, body, author);
    hideNewPostModal();
    loadPosts();
  } catch (error) {
    console.error('Error adding post:', error);
  }
}

// Event listeners
document.getElementById('new-post-button').addEventListener('click', showNewPostModal);
document.getElementById('close-modal').addEventListener('click', hideNewPostModal);
window.addEventListener('click', (event) => {
  const modal = document.getElementById('new-post-modal');
  if (event.target == modal) {
    hideNewPostModal();
  }
});
document.getElementById('new-post-form').addEventListener('submit', handleNewPost);

// Initialize the app
initQuill();
loadPosts();
