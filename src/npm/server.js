const express = require('express');
const app = express();

const userRoutes = require('../../client');  

app.use(userRoutes);

app.listen(3000, () => {
  console.log('Server running port 3000');
});
