const express = require('express');
// console.log(express);
const app = express();
// console.log(app);

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  // response.send('<h1>Hello Express</h1>');
  response.render('index');
});

app.get('/account', (request, response) => {
  response.render('account', { money: '$100', recentTransaction: true });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000.`);
});