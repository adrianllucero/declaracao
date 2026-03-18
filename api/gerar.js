// api/gerar.js
const { gerarPdf } = require('../services/pdfService');
const csfx = require('../templates/csfx');
const ubec = require('../templates/ubec');
const unica = require('../templates/unica');

const templates = [csfx, ubec, unica];

export default async function handler(req, res) {
    try {
        const { templateId, dados } = req.body;

        const template = templates.find(t => t.id === templateId);
        if (!template) return res.status(404).send('Template não encontrado');

        const buffer = await gerarPdf(template, dados);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=declaracao.pdf');
        res.setHeader('Content-Length', buffer.length);

        res.end(buffer); // envia os bytes puros do PDF
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao gerar PDF');
    }
}