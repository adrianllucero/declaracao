const express = require('express');
const path = require('path');
const { gerarPdf } = require('./services/pdfService');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// 📦 IMPORTA TODOS OS TEMPLATES
const csfx = require('./templates/csfx');
const ubec = require('./templates/ubec');
const unica = require('./templates/unica');

// 🔥 REGISTRO CENTRAL
const templates = [csfx, ubec, unica];


// =========================
// LISTAR TEMPLATES
// =========================
app.get('/templates', (req, res) => {
    res.json(
        templates.map(t => ({
            id: t.id,
            nome: t.nome
        }))
    );
});


// =========================
// GERAR PDF
// =========================
app.post('/gerar', async (req, res) => {
    try {
        const { templateId, dados } = req.body;

        // 🔎 busca o template correto
        const template = templates.find(t => t.id === templateId);

        if (!template) {
            return res.status(404).send('Template não encontrado');
        }

        const caminho = await gerarPdf(template, dados);

        res.download(caminho);

    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao gerar PDF');
    }
});


// =========================
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});