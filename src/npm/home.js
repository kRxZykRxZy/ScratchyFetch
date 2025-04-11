const express = require('express');
const axios = require('axios');
const router = express.Router();
const port = 3000;

async function getFeaturedProjectUsers(usernames, count) {
  try {
    const response = await axios.get('https://api.scratch.mit.edu/explore/projects?q=games&mode=trending&language=en');
    const projects = response.data.slice(0, 15);

    const users = projects.map(project => ({
      username: project.author.username,
      image: `https://uploads.scratch.mit.edu/get_image/user/${project.author.id}_100x100.png`
    }));

    const contribs = 'kRxZy_kRxZy, jeffnp';

    if (contribs) {
      const extraUsers = contribs.split(',').map(async (username) => {
        const userResponse = await axios.get(`https://api.scratch.mit.edu/users/${username.trim()}`);
        const userId = userResponse.data.id;
        return {
          username: username.trim(),
          image: `https://uploads.scratch.mit.edu/get_image/user/${userId}_100x100.png`
        };
      });
      const extraUsersData = await Promise.all(extraUsers);
      users.unshift(...extraUsersData);
    }

    return users.slice(0, 15);
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return [];
  }
}

const sharedStyles = `
<style>
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    transition: background-color 0.3s, color 0.3s;
    background-color: #0e1621;
    color: #ffffff;
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

  .nav-left a,
  .nav-right a {
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
    width: 400px;
  }

  .search-form button {
    border-radius: 8px;
    padding: 8px 15px;
    border: none;
  }

  .header {
    text-align: center;
    margin-top: 40px;
  }

  .header h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .featured {
    margin: 3rem auto;
    max-width: 800px;
    background: #1e293b;
    padding: 1rem 2rem;
    border-radius: 12px;
    text-align: center;
  }

  .light-mode .featured {
    background: #e2e8f0;
  }

  .featured h2 {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }

  .scratchers {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .scratcher {
    text-align: center;
  }

  .scratcher img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #ccc;
    margin-bottom: 0.5rem;
  }

  .scratcher a {
    color: #60a5fa;
    font-weight: bold;
    text-decoration: none;
  }

  .container {
    margin-top: 50px;
    padding: 2rem;
  }

  .btn-toggle {
    margin-top: 20px;
  }

  .btn-logout {
    margin-top: 20px;
    background-color: red;
    color: white;
  }
</style>
`;

const sharedNavbar = `
<div class="navbar">
  <div class="nav-left">
    <a id="link" href="login">Login With Scratch</a>
  </div>
  <form id="search-form" class="search-form">
    <input type="text" id="search-input" name="search" placeholder="Username Or A Project ID" required>
    <button type="submit" class="btn btn-light">Search</button>
  </form>
  <div class="nav-right">
    <a href="/settings">Settings</a>
  </div>
</div>
`;

const sharedScripts = `
<script>
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

  (function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  })();
</script>
`;

router.get('/', async (req, res) => {
  const count = parseInt(req.query.count) || 5;
  const usernames = 'jeffnp';
  const featuredUsers = await getFeaturedProjectUsers(usernames, count);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>ScratchyFetch Search</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      ${sharedStyles}
    </head>
    <body>
      ${sharedNavbar}

      <div class="header">
        <h1>Welcome to ScratchyFetch!</h1>
        <p>Your source for Scratch community statistics</p>
      </div>

      <div class="featured">
        <h2>Featured Scratchers</h2>
        <div class="scratchers">
          ${featuredUsers.map(user => `
            <div class="scratcher">
              <img src="${user.image}">
              <a href="/users/${user.username}">${user.username}</a>
            </div>
          `).join('')}
        </div>
      </div>

      ${sharedScripts}
    </body>
    </html>
  `);
});

router.get('/settings', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Settings</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      ${sharedStyles}
    </head>
    <body>
      ${sharedNavbar}

      <div class="container">
        <h1>Settings</h1>
        <button class="btn btn-primary btn-toggle" onclick="toggleMode()">Toggle Light/Dark Mode</button>
        <button class="btn btn-danger btn-logout" onclick="logout()">Logout</button>
      </div>

      ${sharedScripts}
      <script>
        function toggleMode() {
          const body = document.body;
          body.classList.toggle('light-mode');
          body.classList.toggle('dark-mode');
          const mode = body.classList.contains('light-mode') ? 'light' : 'dark';
          localStorage.setItem('theme', mode);
        }

        function logout() {
          localStorage.removeItem('user');
          window.location.href = '/';
        }
      </script>
    </body>
    </html>
  `);
});

module.exports = router;
