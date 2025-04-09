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
          background-color: #0e1621;
          color: white;
          font-family: Arial, sans-serif;
          padding: 2rem;
        }
        .container {
          max-width: 800px;
          margin: auto;
          background: #1e293b;
          border-radius: 10px;
          padding: 2rem;
        }
        .thumbnail {
          width: 100%;
          border-radius: 10px;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 2rem;
        }
        p {
          color: #ccc;
          word-wrap: break-word;
          white-space: pre-wrap;
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
      </style>
    </head>
    <body>
     <center><div class="container">
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
      </div></center>
    </body>
    </html>
    `;

    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Project not found or an error occurred.');
  }
});

module.exports = router;
