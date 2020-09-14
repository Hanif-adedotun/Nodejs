// const express = require('express');

// const app = express();
// app.use(express.static('static'));
// app.listen(8080, function () {
// console.log('App started on port 3000');
// });
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!, This is Hanif nodejs');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});