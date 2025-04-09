const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/users/:username', async (req, res) => {
  try {
    const user = req.params.username;
    const response = await axios.get(`https://api.scratch.mit.edu/users/${user}`);
    const id = response.data.id;

    const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>User Profile</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
  <style>
    body, html {
      height: 100%;
      margin: 0;
      background-color: #111;
      color: #fff;
      font-family: Arial, sans-serif;
    }

    .container {
      max-width: 700px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .profile-pic {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #333;
      background-color: #333;
    }

    .username {
      font-size: 2rem;
      font-weight: bold;
      margin: 1rem 0 0.5rem;
    }

    .details-box {
      background-color: #222;
      border-radius: 10px;
      padding: 1rem;
      margin: 1rem 0;
    }

    .details-box p {
      margin: 0.4rem 0;
      color: #ccc;
    }

    .section-title {
      font-weight: bold;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }
  </style>
</head>
<body>

  <div class="container">
    <img id="profileImage" src="" alt="Profile Picture" class="profile-pic">
    <div id="username" class="username"></div>

    <div class="details-box">
      <div class="section-title">Account Info</div>
      <p><strong>Join Date:</strong> <span id="joinDate"></span></p>
      <p><strong>Account ID:</strong> <span id="accountId"></span></p>
      <p><strong>Location:</strong> <span id="location"></span></p>
    </div>

    <div class="details-box">
      <div class="section-title">Followers</div>
      <p><strong>Follower Count:</strong> <span id="followerCount"></span></p>
    </div>
  </div>

  <script>
    let username;
    let accountId;
    let joinDate;
    let location;
    let followerCount;
    let profileImageUrl;

    document.getElementById('username').textContent = username || '${user}';
    document.getElementById('accountId').textContent = accountId || '${id}';
    document.getElementById('joinDate').textContent = joinDate || '';
    document.getElementById('location').textContent = location || '';
    document.getElementById('followerCount').textContent = followerCount || '';
    document.getElementById('profileImage').src = profileImageUrl || 'https://uploads.scratch.mit.edu/get_image/user/${id}_100x100.png';
  </script>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>

</body>
</html>
`;

    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while fetching user data.');
  }
});

module.exports = router;
