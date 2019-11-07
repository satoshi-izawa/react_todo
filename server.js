/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const fs = require('fs');
const https = require('https');

const app = express();

const env = {
  port: 3000,
  context: '/',
};
const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem'),
};

const distributeAssets = (req, res) => {
  const filePath = `${__dirname}/dist${req.path}`;
  fs.stat(`${filePath}.gz`, error => {
    if (error && error.code === 'ENOENT') {
      res.sendFile(filePath);
    } else {
      res.header('Content-Type', filePath.search(/.js$/) >= 0 ? 'application/javascript' : 'text/css');
      res.header('Content-Encoding', 'gzip');
      res.sendFile(`${filePath}.gz`);
    }
  });
};
app.get('*.js', (req, res) => {
  distributeAssets(req, res);
});
app.get('*.css', (req, res) => {
  distributeAssets(req, res);
});

app.use(`${env.context}`, express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`, {
    req,
    res,
  });
});

https.createServer(options, app).listen(env.port, () => {
  console.log(`start server. listen port is ${env.port}`);
});
