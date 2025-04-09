const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>ScratchyFetch Search</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      body {
        margin: 0;
        background-color: #0e1621;
        color: #fff;
        font-family: 'Segoe UI', sans-serif;
      }

      .navbar {
        background-color: #3b82f6;
        padding: 1rem;
      }

      .navbar input[type="text"] {
        border-radius: 8px;
        border: none;
        padding: 6px 12px;
        width: 250px;
      }

      .navbar button {
        border-radius: 8px;
        padding: 6px 12px;
        margin-left: 10px;
        border: none;
      }

      .nav-links a {
        color: #fff;
        margin-right: 20px;
        text-decoration: none;
        font-weight: 500;
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
    </style>
  </head>
  <body>

    <div class="navbar d-flex justify-content-between align-items-center">
      <div class="nav-links">
        <a href="#">Top Scratchers</a>
        <a href="#">Top Projects</a>
        <a href="#">Live Follower Count</a>
      </div>
      <form id="project-form" class="d-flex align-items-center">
        <input type="text" id="project-input" name="project" placeholder="Enter Project ID" required>
        <button type="submit" class="btn btn-light ms-2">Search</button>
      </form>
      <form id="user-form" class="d-flex align-items-center">
        <input type="text" id="username-input" name="username" placeholder="Enter Scratch username" required>
        <button type="submitpr" class="btn btn-light ms-2">Search</button>
      </form>
    </div>

    <div class="header">
      <h1>Welcome to ScratchyFetch!</h1>
      <p>Your source for Scratch community statistics</p>
    </div>

    <div class="featured">
      <h2>Featured Scratchers</h2>
      <div class="scratchers">
        <div class="scratcher">
          <img src="https://uploads.scratch.mit.edu/get_image/user/136618149_100x100.png">
          <a href="/users/kRxZy_kRxZy">kRxZy_kRxZy</a>
        </div>
        <div class="scratcher">
          <img src="https://uploads.scratch.mit.edu/get_image/user/22794819_100x100.png">
          <a href="/users/nekopyon">nekopyon</a>
        </div>
        <div class="scratcher">
          <img src="https://uploads.scratch.mit.edu/get_image/user/42591968_100x100.png">
          <a href="/users/TimMcCool">TimMcCool</a>
        </div>
        <div class="scratcher">
          <img src="https://uploads.scratch.mit.edu/get_image/user/64691048_100x100.png">
          <a href="/users/CST1229">CST1229</a>
        </div>
      </div>
    </div>

    <script>
      document.getElementById('user-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username-input').value.trim();
        if (username) {
          window.location.href = \`/users/\${encodeURIComponent(username)}\`;
        }
      });
      
      document.getElementById('project-form').addEventListener('submitpr', function (event) {
        event.preventDefault();
        const project = document.getElementById('project-input').value.trim();
        if (project) {
          window.location.href = \`/projects/\${encodeURIComponent(username)}\`;
        }
      });
    </script>

  </body>
  </html>
  `;
  res.send(content);
});

module.exports = router;
