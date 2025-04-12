const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const response = await axios.get(`https://api.scratch.mit.edu/projects/${projectId}`);
    const project = response.data;
    const user = project.author.username;

    const resv2 = await axios.get(`https://api.scratch.mit.edu/users/${user}/projects/${projectId}/comments`);
    const comments = resv2.data;

    let commentsHtml = '';
    comments.forEach(comment => {
      commentsHtml += `
        <div class="comment">
          <p><strong>${comment.author.username}:</strong> ${comment.content}</p>
        </div>
      `;
    });

    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${project.title}</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #0e1621;
          color: white;
          margin: 0;
        }
        .light-mode {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        .dark-mode {
          background-color: #0e1621 !important;
          color: #ffffff !important;
        }
        .navbar {
          background-color: #3b82f6;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-left a, .nav-right a {
          color: #ffffff;
          font-weight: 500;
          text-decoration: none;
        }
        .search-form {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .search-form input {
          border-radius: 8px;
          border: none;
          padding: 8px 15px;
          width: 300px;
        }
        .search-form button {
          border-radius: 8px;
          padding: 8px 15px;
          border: none;
        }
        .container {
          max-width: 800px;
          margin: 40px auto;
          background: #1e293b;
          border-radius: 10px;
          padding: 2rem;
        }
        .light-mode .container {
          background: #e2e8f0;
        }
        .thumbnail {
          width: 100%;
          border-radius: 10px;
          margin-bottom: 1rem;
        }
        p {
          color: #ccc;
          white-space: pre-wrap;
        }
        .light-mode p {
          color: #333;
        }
        a {
          color: #60a5fa;
          text-decoration: none;
        }
        iframe {
          width: 100%;
          height: 400px;
          margin-top: 2rem;
          border-radius: 10px;
          border: none;
        }
        .comment {
          background: #2d3748;
          padding: 1rem;
          margin-top: 1rem;
          border-radius: 8px;
        }
        .light-mode .comment {
          background: #d1d5db;
        }
        .mode-toggle {
          position: fixed;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
        }
        .moon-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #f0e68c 40%, #d2b48c 60%, transparent 70%);
          box-shadow: inset -6px -6px 10px rgba(0,0,0,0.2);
        }
      </style>
    </head>
    <body>
      <div class="navbar">
        <div class="nav-left">
          <a id="link" href="/login">Login With Scratch</a>
        </div>
        <form id="search-form" class="search-form">
          <input type="text" id="search-input" name="search" placeholder="Username Or A Project ID" required>
          <button type="submit" class="btn btn-light">Search</button>
        </form>
        <div class="nav-right">
          <a href="/settings">Settings</a>
        </div>
      </div>

      <center>
        <div class="container">
          <img src="${project.images['282x218']}" alt="${project.title}" class="thumbnail">
          <h1>${project.title}</h1>
          <p><strong>Author:</strong> <a href="/users/${project.author.username}">${project.author.username}</a></p>
          <p><strong>Instructions:</strong> ${project.instructions || 'No instructions provided.'}</p>
          <p><strong>Description:</strong> ${project.description || 'No description provided.'}</p>
          <p><strong>Views:</strong> ${project.stats.views}</p>
          <p><strong>Loves:</strong> ${project.stats.loves}</p>
          <p><strong>Favorites:</strong> ${project.stats.favorites}</p>
          <h3>Recent Comments:</h3>
          ${commentsHtml || '<p>No comments yet.</p>'}
          <a href="https://scratch.mit.edu/projects/${projectId}" target="_blank">View on Scratch</a>
          <iframe src="https://scratch.mit.edu/projects/${projectId}/embed" allowtransparency="true" allowfullscreen="true"></iframe>
        </div>
      </center>

      <script>
        function toggleMode() {
          document.body.classList.toggle('light-mode');
          document.body.classList.toggle('dark-mode');
          const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
          localStorage.setItem('theme', mode);
        }

        (function() {
          const savedTheme = localStorage.getItem('theme');
          if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
          } else {
            document.body.classList.add('dark-mode');
          }
        })();

        document.getElementById('search-form').addEventListener('submit', function (event) {
          event.preventDefault();
          const input = document.getElementById('search-input').value.trim();
          if (!input) return;
          if (/^\\d+$/.test(input)) {
            window.location.href = '/projects/' + encodeURIComponent(input);
          } else {
            window.location.href = '/users/' + encodeURIComponent(input);
          }
        });

        if (localStorage.getItem('user')) {
          document.getElementById('link').textContent = \`\${localStorage.getItem('user')}'s Account\`;
          document.getElementById('link').href = '/account';
        }
      </script>
    </body>
    </html>
    `;

    res.send(content);
  } catch {
    res.status(500).send('Project not found or an error occurred.');
  }
});

module.exports = router;
