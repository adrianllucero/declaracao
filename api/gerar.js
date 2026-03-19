// api/gerar.js
const { gerarPdf } = require('../services/pdfService');
const csfx = require('../templates/csfx');
const ubec = require('../templates/ubec');
const unica = require('../templates/unica');
const templates = [csfx, ubec, unica];
const { gerarDadosAutomaticos } = require('../geradorDados');

// dados que vêm do formulário
const dadosFormulario = req.body;

// dados automáticos
const dadosAutomaticos = gerarDadosAutomaticos();

// 🔥 JUNTA OS DOIS
const dados = {
    ...dadosFormulario,
    ...dadosAutomaticos
};

module.exports = async function handler(req, res) {
    try {
        const body = typeof req.body === 'string'
            ? JSON.parse(req.body)
            : req.body;

        const { templateId, dados } = body;

        const template = templates.find(t => t.id === templateId);
        if (!template) {
            return res.status(404).send('Template não encontrado');
        }

        const buffer = await gerarPdf(template, dados);

        // 👇 ESSENCIAL
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=declaracao.pdf');
        res.setHeader('Content-Length', buffer.length);

        res.end(buffer);

    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao gerar PDF');
    }
};