const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/users/:username', async (req, res) => {
  try {
    const username = decodeURIComponent(req.params.username);
    const userRes = await axios.get(`https://api.scratch.mit.edu/users/${username}`);
    const userProjectsRes = await axios.get(`https://api.scratch.mit.edu/users/${username}/projects?limit=5`);
    const userFollowersRes = await axios.get(`https://api.scratch.mit.edu/users/${username}/followers?limit=5`);
    const userFollowingRes = await axios.get(`https://api.scratch.mit.edu/users/${username}/following?limit=5`);

    const user = userRes.data;
    const projects = userProjectsRes.data;
    const followers = userFollowersRes.data;
    const following = userFollowingRes.data;

    const profileImg = `https://uploads.scratch.mit.edu/get_image/user/${user.id}_100x100.png`;
    const joinDate = new Date(user.history.joined).toLocaleDateString();

    const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${user.username} | Scratch Profile</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
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
    body {
      background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
      color: #fff;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 900px;
      margin: 4rem auto;
      padding: 2rem;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 20px;
    }
    .profile-pic {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid #0ff;
    }
    .username {
      font-size: 2.5rem;
      color: #0ff;
    }
    .section {
      margin-top: 2rem;
      padding: 1rem;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
    }
    .section h3 {
      color: #0ff;
      margin-bottom: 1rem;
    }
    .project-card {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }
    .project-card a {
      color: #00ffff;
    }
  </style>
</head>
<body>
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
    
  <div class="container text-center">
    <img src="${profileImg}" class="profile-pic">
    <h1 class="username">${user.username}${user.scratchteam ? ' <span style="font-size:1rem;" class="badge bg-info">Scratch Team</span>' : ''}</h1>

    <div class="section">
      <h3>Account Info</h3>
      <p><strong>User ID:</strong> ${user.id}</p>
      <p><strong>Joined:</strong> ${joinDate}</p>
      <p><strong>Country:</strong> ${user.profile.country || 'N/A'}</p>
      <p><strong>Bio:</strong> ${user.profile.bio || 'N/A'}</p>
      <p><strong>Status:</strong> ${user.profile.status || 'N/A'}</p>
    </div>

    <div class="section">
      <h3>Recent Followers</h3>
      ${followers.map(f => `<p><a href="/users/${f.username}">${f.username}</a></p>`).join('')}
    </div>

    <div class="section">
      <h3>Recent Followings</h3>
      ${following.map(f => `<p><a href="/users/${f.username}">${f.username}</a></p>`).join('')}
    </div>

    <div class="section">
      <h3>Recent Projects</h3>
      ${projects.map(p => `
        <div class="project-card">
          <p><strong>${p.title}</strong></p>
          <a href="/projects/${p.id}" target="_blank">View Project</a>
        </div>
      `).join('')}
    </div>
  </div>
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
</body>
</html>
`;

    res.send(content);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch user data.');
  }
});

module.exports = router;
