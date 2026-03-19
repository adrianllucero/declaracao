const path = require('path');
const fs = require('fs');

function gerarDadosAleatorios(d) {

    const cursos = [
        "Administração",
        "Pedagogia",
        "Gestão Pública",
        "Logística",
        "Engenharia de Software",
        "Ciências da Computação",
        "Administração",
        "Letras",
        "Ciências Contábeis"
    ];

    const periodo = Math.floor(Math.random() * 8) + 1;

    const curso = cursos[Math.floor(Math.random() * cursos.length)];

    const matricula = "UC" + Math.floor(10000000 + Math.random() * 90000000);

    const hoje = new Date();
    const mes = hoje.getMonth() + 1;

    let trimestre = "1º";
    if (mes > 4 && mes <= 8) trimestre = "2º";
    if (mes > 8) trimestre = "3º";

    return {
        ...d,
        matricula,
        periodo,
        curso,
        trimestre,
        ano: hoje.getFullYear()
    };
}

module.exports = {
    id: "ubec",
    nome: "Declaração UBEC",

    campos: ["nome"],

    render: (doc, dados) => {

        const d = gerarDadosAleatorios(dados);

        const largura = doc.page.width - 100;

        const logo = path.join(__dirname, '../img/logo_ubec.png');
        const assinatura = path.join(__dirname, '../img/assinatura_ubec.jpg');
        const logo2 = path.join(__dirname, '../img/logo2_ubec.jpg');

        // =========================
        // TOPO DIREITO (TEXTO + LOGO)
        // =========================

        const textoTopo = `Reconhecida pela Portaria Ministerial Nº 1.827 de 28 de dezembro de 1994, D.O.U de 30 de dezembro de 1994.
Recredenciada para oferta na modalidade Presencial pela Portaria Ministerial Nº 624 de 17 de maio de 2012, D.O.U de 18 de maio de 2012.
Recredenciada para oferta na modalidade EAD pela Portaria Ministerial Nº 697 de 20 de julho de 2016, D.O.U de 21 de julho de 2016`;

        doc.fontSize(7)
            .font('Helvetica')
            .text(textoTopo, 50, 40, {
                width: largura - 80,
                align: 'right'
            });

        if (fs.existsSync(logo)) {
            doc.image(logo, doc.page.width - 100, 40, { width: 60 });
        }

        doc.moveDown(6);

        // =========================
        // TÍTULO
        // =========================

        doc.font('Helvetica-Bold')
            .fontSize(12)
            .text('DECLARAÇÃO DE ESCOLARIDADE', {
                align: 'center'
            });

        doc.moveDown(2);

        // =========================
        // TEXTO PRINCIPAL
        // =========================

        const texto = `Declaramos, para os devidos fins, que ${d.nome}, matrícula nº ${d.matricula}, estudante do ${d.periodo}º período curricular do curso de ${d.curso} - GRADUAÇÃO BACHARELADO, ministrado por esta Instituição de Ensino Superior, encontra-se MATRICULADO no ${d.trimestre} trimestre de ${d.ano}.`;

        doc.font('Helvetica')
            .fontSize(10)
            .text(texto, {
                width: largura,
                align: 'justify',
                lineGap: 4
            });

        doc.y += 120;

        // =========================
        // ASSINATURA
        // =========================

        doc.moveTo(200, doc.y).lineTo(400, doc.y).stroke();

        if (fs.existsSync(assinatura)) {
            doc.image(assinatura, 250, doc.y - 50, { width: 100 });
        }

        doc.moveDown(2);

        doc.fontSize(10).text('Adriana Linhares Apio', { align: 'center' });
        doc.text('Secretário Acadêmico', { align: 'center' });
        doc.text('Universidade Católica de Brasília - UCB', { align: 'center' });

        // =========================
        // RODAPÉ
        // =========================

        const agora = new Date();

        const dataHora = agora.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo'
        });

// posição fixa (pé da página)
const yRodape = doc.page.height - 100;

// emissão (um pouco acima)
doc.fontSize(8).text(`Emissão: ${dataHora}`, 50, yRodape - 25);

// linha azul
doc.moveTo(50, yRodape)
   .lineTo(550, yRodape)
   .strokeColor('#1e3a8a')
   .stroke();

// logo esquerda
if (fs.existsSync(logo2)) {
    doc.image(logo2, 50, yRodape + 10, { width: 110 });
}

        // texto direita
        const rodapeTexto = `Câmpus Ceilândia - Setor N, QNN 31 - Ceilândia - Brasília/DF, CEP: 72225-310
Câmpus Sobradinho - Quadra 13, Área Reservada n° 3 - Sobradinho - Brasília/DF
Câmpus Taguatinga - QS 07 Lote 01 EPCT - Águas Claras - Brasília/DF, CEP: 71966-700
Mantenedora: União Brasileira de Educação Católica - UBEC - CNPJ: 00.331.801/0001-30
www.ucb.br | 3356-9000`;

        doc.fontSize(6).text(rodapeTexto, 180, yRodape + 10, {
    width: 370,
    align: 'right'
});

    }
};