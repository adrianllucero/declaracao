// services/pdfService.js

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function gerarPdf(template, dados) {

    // pasta onde salva os PDFs
    const pasta = path.join(__dirname, '../pdf');
    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta);
    }

    // nome do arquivo
    const caminho = path.join(pasta, `declaracao_${Date.now()}.pdf`);

    // cria o documento
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(caminho);

    doc.pipe(stream);

    // 🔥 AQUI É O PONTO PRINCIPAL
    // o template desenha tudo no PDF
    if (typeof template.render === 'function') {
        template.render(doc, dados);
    } else {
        throw new Error('Template não possui função render()');
    }

    // finaliza o PDF
    doc.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(caminho));
        stream.on('error', reject);
    });
}

module.exports = { gerarPdf };