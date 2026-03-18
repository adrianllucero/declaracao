const PDFDocument = require('pdfkit');

async function gerarPdf(template, dados) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });

            const chunks = [];

            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve(buffer);
            });

            doc.on('error', err => reject(err));

            // render do template
            if (typeof template.render === 'function') {
                template.render(doc, dados);
            } else {
                throw new Error('Template inválido');
            }

            doc.end();

        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { gerarPdf };