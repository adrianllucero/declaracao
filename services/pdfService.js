// services/pdfService.js
const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

async function gerarPdf(template, dados) {
    // cria o documento
    const doc = new PDFDocument({ margin: 50 });

    // 🔥 o template desenha tudo no PDF
    if (typeof template.render === 'function') {
        template.render(doc, dados);
    } else {
        throw new Error('Template não possui função render()');
    }

    // finaliza o PDF
    doc.end();

    // retorna como Buffer
    const buffer = await getStream.buffer(doc);
    return buffer;
}

module.exports = { gerarPdf };