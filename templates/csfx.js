// templates/csfx.js

module.exports = {
    nome: "Declaração CSFX",

    campos: [
        "nome",
        "cpf",
        "dn",
        "cidade",
        "pai",
        "mae"
    ],

    render: (doc, d) => {

    const path = require('path');
    const fs = require('fs');

    const larguraTexto = doc.page.width - 100;

    // caminhos das imagens
    //const logo = fs.readFileSync(path.join(process.cwd(), 'img/logo_csfx.png'));
    //const assinatura = fs.readFileSync(path.join(process.cwd(),'img/assinatura_csfx.png'));
    //const carimbo = fs.readFileSync(path.join(process.cwd(), 'img/carimbo_csfx.png'));

    // =========================
    // LOGO
    // =========================
    if (fs.existsSync(logo)) {
        doc.image(logo, 50, 30, { width: 60 });
    }

    // =========================
    // CABEÇALHO
    // =========================
    doc.font('Helvetica-Bold')
        .fontSize(16)
        .text('Colégio São Francisco Xavier', 50, 40, {
            width: larguraTexto,
            align: 'center'
        });

    doc.font('Helvetica').fontSize(8);

    const linhasCabecalho = [
        'Educação Profissional Técnica de Nível Médio',
        'RECONHECIMENTO: EDUCAÇÃO PROFISSIONAL TÉCNICA DE NÍVEL MÉDIO:',
        'TÉCNICO EM ENFERMAGEM...',
        'TÉCNICO EM SEGURANÇA DO TRABALHO...',
        'ENTIDADE MANTENEDORA: FUNDAÇÃO EDUCACIONAL SÃO FRANCISCO XAVIER',
        'CNPJ: 11.505.880/0002-09',
        'Rua Palmeiras, 1089 - Horto - Ipatinga - MG'
    ];

    linhasCabecalho.forEach(linha => {
        doc.text(linha, {
            width: larguraTexto,
            align: 'center'
        });
    });

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(2);

    // =========================
    // TÍTULO
    // =========================
    doc.font('Helvetica-Bold')
        .fontSize(14)
        .text('DECLARAÇÃO DE ESCOLARIDADE', {
            width: larguraTexto,
            align: 'center'
        });

    doc.moveDown(2);

    // =========================
    // TEXTO
    // =========================
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const semestre = hoje.getMonth() < 6 ? '1º Semestre' : '2º Semestre';

    const texto = `Declaro, para os devidos fins, que ${d.nome}, portador do CPF ${d.cpf}, nascido(a) em ${d.dn}, natural de ${d.cidade}, filho(a) de ${d.pai} e de ${d.mae}, é aluno(a) deste estabelecimento de ensino, frequente no ${semestre} Letivo de ${ano}, no módulo ${d.modulo}, turma ${d.turma_nome}, turno da ${d.turno}, do curso ${d.curso}, com término no dia ${d.termino}.`;

    doc.font('Helvetica')
        .fontSize(12)
        .text(texto, {
            width: larguraTexto,
            align: 'justify',
            lineGap: 4
        });

    doc.moveDown(2);

    // =========================
    // DATA
    // =========================
    const opcoes = { day: '2-digit', month: 'long', year: 'numeric' };
    const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);

    doc.text(`Ipatinga, ${dataFormatada}`, {
        width: larguraTexto,
        align: 'center'
    });

    doc.moveDown(2);

    // =========================
    // ASSINATURA
    // =========================
    if (fs.existsSync(assinatura)) {
        doc.image(assinatura, 260, doc.y, { width: 100 });
    }

    doc.moveDown(4);

    doc.fontSize(12).text('Michele Grimalde César', {
        width: larguraTexto,
        align: 'center'
    });

    doc.text('Secretária Acadêmica', {
        width: larguraTexto,
        align: 'center'
    });

    doc.text('Aut.: 976544/2023', {
        width: larguraTexto,
        align: 'center'
    });

    doc.moveDown();

    // =========================
    // CARIMBO
    // =========================
    if (fs.existsSync(carimbo)) {
        doc.image(carimbo, 170, doc.y, { width: 280 });
    }
}
};
