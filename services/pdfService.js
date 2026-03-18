// services/pdfService.js
const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

async function gerarPdf(template, dados) {
    // cria o documento PDF
    const doc = new PDFDocument({ margin: 50 });

    // desenha o conteúdo usando o template
    if (typeof template.render === 'function') {
        template.render(doc, dados);
    } else {
        throw new Error('Template não possui função render()');
    }

    // finaliza o PDF
    doc.end();

    // retorna como Buffer (sem criar arquivo físico)
    const buffer = await getStream.buffer(doc);
    return buffer;
}

module.exports = { gerarPdf };