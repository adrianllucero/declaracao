const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.use(express.json());

// IMPORTS

// 👇 ISSO AQUI É O CERTO NO VERCEL
module.exports = serverless(app);
