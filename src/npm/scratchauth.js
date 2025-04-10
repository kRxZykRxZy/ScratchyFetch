const express = require('express');
const app = express();

app.get('/login', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>ScratchyFetch Login</title>
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
  <center><h2>Login to ScratchyFetch</h2>
  <button onclick="ScratchAuth()">Login With ScratchAuth</button
