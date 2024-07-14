const HTTP = require('http');
const URL = require('url').URL;
const QUERYSTRING = require('querystring');
const PORT = 3000;
const PATH = require('path');
const FS = require('fs');
const HANDLEBARS = require('handlebars');
const MIME_TYPES = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const CALCULATIONS_RESULTS_SOURCE = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>🔢 Arithmetic Calculator</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
  </head>
  <body>
    <article>
      <h1>Arithmetic Calculator</h1>
      <table>
        <tbody>
          <tr>
            <th>Num1:</th>
            <td>
              <a href='/calculation-results?num1={{num1Decrement}}&num2={{num2}}'>- 1</a>
            </td>
            <td>{{num1}}</td>
            <td>
              <a href='/calculation-results?num1={{num1Increment}}&num2={{num2}}'>+ 1</a>
            </td>
          </tr> 
          <tr>
            <th>Num2:</th>
            <td>
              <a href='/calculation-results?num1={{num1}}&num2={{num2Decrement}}'>- 1</a>
            </td>
            <td>{{num2}}</td>
            <td>
              <a href='/calculation-results?num1={{num1}}&num2={{num2Increment}}'>+ 1</a>
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

const USER_INPUT_SOURCE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>🔢 Arithmetic Calculator</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
  </head>
  <body>
    <article>
      <h1>Arithmetic Calculator</h1>
      <form action="/calculation-results" method="post">
        <label for="num1">Enter the value of num1</label>
        <input type="number" name="num1" id="num1" value="">
        <label for="num2">Enter the value of num2</label>
        <input type="number" name="num2" id="num2" value="">
        <input type="submit" name="" value="Get results of computation!">
      </form>
    </article>
  </body>
</html>`;

const CALCULATIONS_RESULTS_TEMPLATE = HANDLEBARS.compile(CALCULATIONS_RESULTS_SOURCE);
const USER_INPUT_TEMPLATE = HANDLEBARS.compile(USER_INPUT_SOURCE);

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
  let data = {};
  data.num1 = Number(params.get('num1'));
  data.num2 = Number(params.get('num2'));
  return data;
}

function getPathname(path, host) {
  const myURL = new URL(path, host);
  return myURL.pathname;
}

function render(template, data) {
  let html = template(data);
  return html;
}

function parseFormData(request, callback) {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    let data = QUERYSTRING.parse(body);
    data.num1 = Number(data.num1);
    data.num2 = Number(data.num2);
    callback(data);
  });
}

function getComputationalDataObject(data) {
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

function getIndex(res) {
  let content = render(USER_INPUT_TEMPLATE, {});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write(`${content}\n`);
  res.end();
}

function getCalculationResult(res, path, host) {
  let params = getParams(path, host);
  let data = getComputationalDataObject(params);
  let content = render(CALCULATIONS_RESULTS_TEMPLATE, data);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write(`${content}\n`);
  res.end();
}

function postCalculationResult(req, res) {
  parseFormData(req, parsedData => {
    let data = getComputationalDataObject(parsedData);
    let content = render(CALCULATIONS_RESULTS_TEMPLATE, data);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(`${content}\n`);
    res.end();
  });
}

const SERVER = HTTP.createServer((req, res) => {
  let path = req.url;
  let pathname = getPathname(path, `http://localhost:${PORT}`);
  let fileExtension = PATH.extname(pathname);

  FS.readFile(`./public/${pathname}`, (err, data) => {
    if (data) {
      res.statusCode = 200;
      res.setHeader('Content-Type', `${MIME_TYPES[fileExtension]}`);
      res.write(`${data}\n`);
      res.end();
    } else {
      let method = req.method;
      if (method === 'GET' && pathname === '/') {
        getIndex(res);
      } else if (method === 'GET' && pathname === '/calculation-results') {
        getCalculationResult(res, path, `http://localhost:${PORT}`);
      } else if (method === 'POST' && pathname === '/calculation-results') {
        postCalculationResult(req, res);
      } else {
        res.statusCode = 404;
        res.end();
      }
    }
  });  
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});