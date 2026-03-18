const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

async function gerarPdf(template, dados) {
    const doc = new PDFDocument({ margin: 50 });

    if (typeof template.render === 'function') {
        template.render(doc, dados);
    } else {
        throw new Error('Template não possui função render()');
    }

    doc.end();

    // 👇 ESSA LINHA QUE FALTAVA
    const buffer = await getStream.buffer(doc);

    return buffer; // ✅ RETORNA o PDF
}

module.exports = { gerarPdf };