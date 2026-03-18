const express = require('express');
const serverless = require('serverless-http');
const { gerarPdf } = require('../services/pdfService');

const app = express();

app.use(express.json());

// IMPORTS
const csfx = require('../templates/csfx');
const ubec = require('../templates/ubec');
const unica = require('../templates/unica');

const templates = [csfx, ubec, unica];

// ROTAS
app.get('/templates', (req, res) => {
    res.json(templates.map(t => ({
        id: t.id,
        nome: t.nome
    })));
});

app.post('/gerar', async (req, res) => {
    try {
        const buffer = await gerarPdf(template, dados);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');

        res.send(buffer);

    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao gerar PDF');
    }
});

// 👇 ISSO AQUI É O CERTO NO VERCEL
module.exports = serverless(app);
