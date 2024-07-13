const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;
const HANDLEBARS = require('handlebars');

const SOURCE = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>🔢 Arithmetic Calculator</title>
    <style type="text/css">
      body {
        background: rgba(250, 250, 250);
        font-family: sans-serif;
        color: rgb(50, 50, 50);
      }

      article {
        width: 100%;
        max-width: 40rem;
        margin: 0 auto;
        padding: 1rem 2rem;
      }

      h1 {
        font-size: 2.5rem;
        text-align: center;
      }

      table {
        font-size: 2rem;
      }

      th {
        text-align: right;
      }
    </style>
  </head>
  <body>
    <article>
      <h1>Arithmetic Calculator</h1>
      <table>
        <tbody>
          <tr>
            <th>Num1:</th>
            <td>
              <a href='/?num1={{num1Decrement}}&num2={{num2}}'>- 1</a>
            </td>
            <td>{{num1}}</td>
            <td>
              <a href='/?num1={{num1Increment}}&num2={{num2}}'>+ 1</a>
            </td>
          </tr> 
          <tr>
            <th>Num2:</th>
            <td>
              <a href='/?num1={{num1}}&num2={{num2Decrement}}'>- 1</a>
            </td>
            <td>{{num2}}</td>
            <td>
              <a href='/?num1={{num1}}&num2={{num2Increment}}'>+ 1</a>
            </td>
          </tr> 
          <tr>
            <th>Sum:</th>
            <td colspan='3'>{{sum}}</td>
          </tr>
          <tr>
            <th>Product:</th>
            <td colspan='3'>{{product}}</td>
          </tr>
          <tr>
            <th>Quotient:</th>
            <td colspan='3'>{{quotient}}</td>
          </tr>
          <tr>
            <th>Remainder:</th>
            <td colspan='3'>{{remainder}}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </body>
</html>`;

const CALCULATIONS_TEMPLATE = HANDLEBARS.compile(SOURCE);

function getSum(num1, num2) {
  return num1 + num2;
}

function getProduct(num1, num2) {
  return num1 * num2;
}

function getDivisor(num1, num2) {
  return (num1 / num2).toFixed(2);
}

function getRemainder(num1, num2) {
  return num1 % num2;
}

function getParams(path, host) {
  const myURL = new URL(path, host);
  let params = myURL.searchParams;
  return params;
}

function render(template, data) {
  let html = template(data);
  return html;
}

function getComputationalDataObject(params) {
  let data = {};
  data.num1 = Number(params.get('num1'));
  data.num2 = Number(params.get('num2'));
  data.sum = getSum(data.num1, data.num2);
  data.product = getProduct(data.num1, data.num2);
  data.quotient = getDivisor(data.num1, data.num2);
  data.remainder = getRemainder(data.num1, data.num2);
  data.num1Increment = data.num1 + 1;
  data.num1Decrement = data.num1 - 1;
  data.num2Increment = data.num2 + 1;
  data.num2Decrement = data.num2 - 1;
  return data;
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    let params = getParams(path, `http://localhost:${PORT}`);
    let data = getComputationalDataObject(params);
    let content = render(CALCULATIONS_TEMPLATE, data);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(`${content}\n`);
    res.end();
  } 
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});