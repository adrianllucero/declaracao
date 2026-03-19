// api/gerar.js
const { gerarPdf } = require('../services/pdfService');
const csfx = require('../templates/csfx');
const ubec = require('../templates/ubec');
const unica = require('../templates/unica');
const prominas = require('../templates/prominas');
const { gerarDadosAutomaticos } = require('../services/geradorDados');
const templates = [csfx, ubec, unica, prominas];

module.exports = async function handler(req, res) {
    try {
        const body = typeof req.body === 'string'
            ? JSON.parse(req.body)
            : req.body;

        const { templateId, dados } = body;

        // 🔥 carrega template dinamicamente
        const template = require(`../templates/${templateId}`);

        // 🔥 gera dados automáticos
        const dadosAuto = gerarDadosAutomaticos();

        // 🔥 junta tudo
        const dadosFinais = {
            ...dados,
            ...dadosAuto
        };

        // ⚠️ aqui precisa retornar BUFFER
        const buffer = await gerarPdf(template, dadosFinais);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=declaracao.pdf');
        res.setHeader('Content-Length', buffer.length);

        res.end(buffer);

    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao gerar PDF');
    }
};