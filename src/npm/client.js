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
