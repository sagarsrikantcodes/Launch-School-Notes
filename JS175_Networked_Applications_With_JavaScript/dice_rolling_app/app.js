const HTTP = require('http');
const PORT = 3000;
const URL = require('url').URL;

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;
  
  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // res.write(`The random number generated from dice roll is ${diceRollValue}\n`);
    const myURL = new URL('/?amount=5000&duration=10', 'http://localhost:3000');
    let params = myURL.searchParams;
    let currentNum = 1;
    let rolls = params.get('rolls');
    let sides = params.get('sides');
    
    while (currentNum <= Number(rolls)) {
      let diceRollValue = 1 + Math.floor(Math.random() * Number(sides));
      res.write(`${diceRollValue}\n`);
      currentNum += 1;
    }
    res.write(`${method} ${path}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});