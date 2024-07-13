const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;
let nextVal = 0;

const HTML_START = `
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
        <tbody>`;

const HTML_BODY_END = `
        </tbody>`;

const HTML_END = `
      </table>
    </article>
  </body>
</html>`;



function getSum(num1, num2) {
  nextVal += 1;
  return num1 + num2;
}

function getProduct(num1, num2) {
  nextVal += 1;
  return num1 * num2;
}

function getDivisor(num1, num2) {
  nextVal += 1;
  return (num1 / num2).toFixed(2);
}

function getRemainder(num1, num2) {
  nextVal += 1;
  return num1 % num2;
}

function getParams(path, host) {
  const myURL = new URL(path, host);
  let params = myURL.searchParams;
  return params;
}

function getContent(params) {
  let num1 = Number(params.get('num1'));
  let num2 = Number(params.get('num2'));
  let sum = getSum(num1, num2);
  let product = getProduct(num1, num2);
  let quotient = getDivisor(num1, num2);
  let remainder = getRemainder(num1, num2);
  let HTML_TABLE = `
    <tr>
      <th>Num1:</th>
      <td>
        <a href='/?num1=${num1 - 1}&num2=${num2}'>- 1</a>
      </td>
      <td>${num1}</td>
      <td>
        <a href='/?num1=${num1 + 1}&num2=${num2}'>+ 1</a>
      </td>
    </tr> 
    <tr>
      <th>Num2:</th>
      <td>
        <a href='/?num1=${num1}&num2=${num2 - 1}'>- 1</a>
      </td>
      <td>${num2}</td>
      <td>
        <a href='/?num1=${num1}&num2=${num2 + 1}'>+ 1</a>
      </td>
    </tr> 
    <tr>
      <th>Sum:</th>
      <td colspan='3'>${sum}</td>
    </tr>
    <tr>
      <th>Product:</th>
      <td colspan='3'>${product}</td>
    </tr>
    <tr>
      <th>Quotient:</th>
      <td colspan='3'>${quotient}</td>
    </tr>
    <tr>
      <th>Remainder:</th>
      <td colspan='3'>${remainder}</td>
    </tr>`;
  let HTML_TABLE_FOOTER = `
    <tfoot>
    <tr>
      <th>Total number of computations:</th>
      <td colspan='3'>${nextVal}</td>
    </tr>
  </tfoot>`;

  return `${HTML_START}${HTML_TABLE}${HTML_BODY_END}${HTML_TABLE_FOOTER}${HTML_END}`;
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    let params = getParams(path, `http://localhost:${PORT}`);
    let content = getContent(params);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(`${content}\n`);
    res.end();
  } 
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});