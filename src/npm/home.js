const express = require('express');
const axios = require('axios');
const router = express.Router();

async function getFeaturedProjectUsers() {
  try {
    const response = await axios.get('https://api.scratch.mit.edu/explore/projects?q=games&mode=trending&language=en');
    const projects = response.data.slice(0, 15);

    const users = projects.map(project => ({
      username: project.author.username,
      image: `https://uploads.scratch.mit.edu/get_image/user/${project.author.id}_100x100.png`
    }));

    users.unshift({
      username: 'kRxZy_kRxZy',
      image: 'https://uploads.scratch.mit.edu/get_image/user/136618149_100x100.png'
    });

    return users;
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return [{
      username: 'kRxZy_kRxZy',
      image: 'https://uploads.scratch.mit.edu/get_image/user/136618149_100x100.png'
    }];
  }
}

router.get('/', async (req, res) => {
  const featuredUsers = await getFeaturedProjectUsers();

  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>ScratchyFetch Search</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      body { margin: 0; background-color: #0e1621; color: #fff; font-family: 'Segoe UI', sans-serif; }
      .navbar { background-color: #3b82f6; padding: 1rem; }
      .navbar input[type="text"] { border-radius: 8px; border: none; padding: 6px 12px; width: 250px; }
      .navbar button { border-radius: 8px; padding: 6px 12px; margin-left: 10px; border: none; }
      .nav-links a { color: #fff; margin-right: 20px; text-decoration: none; font-weight: 500; }
      .header { text-align: center; margin-top: 40px; }
      .header h1 { font-size: 2.5rem; font-weight: bold; }
      .featured { margin: 3rem auto; max-width: 800px; background: #1e293b; padding: 1rem 2rem; border-radius: 12px; text-align: center; }
      .featured h2 { margin-bottom: 1.5rem; font-size: 1.8rem; }
      .scratchers { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 1rem; }
      .scratcher { text-align: center; }
      .scratcher img { width: 80px; height: 80px; border-radius: 50%; background: #ccc; margin-bottom: 0.5rem; }
      .scratcher a { color: #60a5fa; font-weight: bold; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="navbar d-flex justify-content-between align-items-center">
      <div class="nav-links">
        <a id="link" href="login">Login With Scratch</a>
      </div>
      <form id="search-form" class="d-flex align-items-center">
        <input type="text" id="search-input" name="search" placeholder="Username Or A Project ID" required>
        <button type="submit" class="btn btn-light ms-2">Search</button>
      </form>
    </div>

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
      if(localStorage.getItem('user')) {
      document.getElementById('link').textContent = localStorage.getItem('user')
     } 
    </script>
  </body>
  </html>
  `;

  res.send(content);
});

module.exports = router;
