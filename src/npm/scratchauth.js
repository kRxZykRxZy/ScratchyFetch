const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>ScratchyFetch Login</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          margin: 0;
          background-color: #0e1621;
          color: #fff;
          font-family: 'Segoe UI', sans-serif;
        }
        .login-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .login-box {
          background-color: #1e293b;
          padding: 2rem 3rem;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
          text-align: center;
          max-width: 400px;
          width: 100%;
          margin-bottom: 2rem;
        }
        .login-box h2 {
          margin-bottom: 1.5rem;
        }
        .login-box button {
          background-color: #3b82f6;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          transition: background 0.3s ease;
        }
        .login-box button:hover {
          background-color: #2563eb;
        }
        .featured {
          margin: 0 auto 3rem;
          max-width: 800px;
          background: #1e293b;
          padding: 2rem;
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
      <div class="login-container">
        <div class="login-box">
          <h2>Login to ScratchyFetch</h2>
          <button onclick="scratchAuth()">Login With ScratchAuth</button>
        </div>
      </div>

      <script>
        function scratchAuth() {
          const redirectUrl = btoa(window.location.href);
          window.location.href = \`https://auth.itinerary.eu.org/auth?redirect=\${redirectUrl}&name=ScratchyFetch\`;
        }

        (async () => {
          const params = new URLSearchParams(window.location.search);
          const code = params.get('privateCode');
          if (!code) return;

          try {
            const response = await fetch(\`https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=\${code}\`);
            const data = await response.json();
            if (data && data.username) {
              localStorage.setItem('user', data.username);
              alert(\`Welcome, \${data.username}!\`);
              // Optionally redirect or update UI here
            } else {
              console.error("Username not found in response:", data);
            }
          } catch (error) {
            console.error("Failed to verify token:", error);
          }
        })();
      </script>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

module.exports = router;
