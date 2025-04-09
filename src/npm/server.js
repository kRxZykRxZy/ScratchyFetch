const express = require('express');
const app = express();

const clientRoutes = require('./client');  

app.use(clientRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
