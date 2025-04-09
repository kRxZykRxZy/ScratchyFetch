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
        body {
          background-color: #111;
          color: #fff;
          font-family: Arial, sans-serif;
          height: 100vh;
        }

        .profile-card {
          background: #1e1e2f;
          border-radius: 16px;
          padding: 3rem;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
          text-align: center;
        }

        .profile-pic {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #333;
          margin-bottom: 2rem;
          background-color: #333;
        }

        .username {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .user-details {
          font-size: 1.2rem;
          color: #bbb;
        }

        .full-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      </style>
    </head>
    <body>

      <div class="container-fluid full-screen">
        <div class="row justify-content-center">
          <div class="col-md-4 col-10">
            <div class="profile-card">
              <img src="https://uploads.scratch.mit.edu/get_image/user/${id}_100x100.png" alt="Profile Picture" class="profile-pic">
              <div class="username">${user}</div>
              <div class="user-details">
                <p>Details go here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>

    </body>
    </html>`;

    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong while fetching user data.');
  }
});

module.exports = router;
