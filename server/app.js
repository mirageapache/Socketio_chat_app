const express = require('express');
const cors = require('cors');
const port = process.env.port || 3001;

const app = express();
app.use(cors());

app.get('/', (req,res) => {
  res.send('express server!');
})

app.listen(port, () => {
  console.log('Express server running!');
})