// api/gerar.js
const { gerarPdf } = require('../services/pdfService');
const csfx = require('../templates/csfx');
const ubec = require('../templates/ubec');
const unica = require('../templates/unica');

const templates = [csfx, ubec, unica];

module.exports = async function handler(req, res) {
    try {
        const { templateId, dados } = req.body;

        const template = templates.find(t => t.id === templateId);
        if (!template) return res.status(404).send('Template não encontrado');

        const buffer = await gerarPdf(template, dados);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=declaracao.pdf');
        res.setHeader('Content-Length', buffer.length);

        res.status(200).end(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao gerar PDF');
    }
}