const express = require('express');
const serverless = require('serverless-http');
const { gerarDadosAutomaticos } = require('./services/geradorDados');
const app = express();

app.use(express.json());

// IMPORTS

// 👇 ISSO AQUI É O CERTO NO VERCEL
module.exports = serverless(app);
