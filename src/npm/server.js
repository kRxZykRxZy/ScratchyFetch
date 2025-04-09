const express = require('express');
const app = express();

const clientRoutes = require('./client');  
const homeRoutes = require('./home');
const projectRoutes = require('./project');

app.use(homeRoutes);
app.use(clientRoutes);
app.use(projectRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
