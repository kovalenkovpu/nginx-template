require('dotenv').config();

const express = require('express');
const cors = require('cors');
 
const port = 3000;
 
const app = express();

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

app.use(cors({
  origin : process.env.NODE_ENV === 'development' ? '*' : 'my-site.com',
}));

app.get('*', (req, res, next) => {
  console.log('Request URL: ', req.url)

  next();
});

app.get('/api/hello/', (req, res) => {
  res.json('Hello there!');
});

app.get('/api/bye-bye/', (req, res) => {
  res.json('Bye bye!');
});
 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});