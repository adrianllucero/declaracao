const path = require('path');
const fs = require('fs');

function gerarDados(d) {

    const cursos = [
        "Sistemas de Informação",
        "Ciência da Computação",
        "Análise e Desenvolvimento de Sistemas",
        "Administração",
        "Ciências Contábeis",
        "Pedagogia",
        "Letras",
        "Matemática",
        "Direito",
        "Educação Física",
        "Enfermagem",
        "Engenharia de Produção"
    ];

    const curso = cursos[Math.floor(Math.random() * cursos.length)];
    const registro = Math.floor(10000000 + Math.random() * 90000000);
    const periodo = Math.floor(Math.random() * 8) + 1;

    // DATA CORRETA BR
    const agora = new Date();

    const dataBR = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).formatToParts(agora);

    const dia = dataBR.find(p => p.type === 'day').value;
    const mesNumero = dataBR.find(p => p.type === 'month').value;
    const ano = dataBR.find(p => p.type === 'year').value;

    const meses = [
        "janeiro","fevereiro","março","abril","maio","junho",
        "julho","agosto","setembro","outubro","novembro","dezembro"
    ];

    const mesAtual = meses[parseInt(mesNumero) - 1];

    // semestre automático
    const semestre = parseInt(mesNumero) <= 6 ? "1" : "2";

    return {
        ...d,
        curso,
        registro,
        periodo,
        dia,
        mesAtual,
        ano,
        semestre
    };
}

module.exports = {
    id: "prominas",
    nome: "Declaração Prominas",

    campos: ["nome", "cpf", "rg"],

    render: (doc, dados) => {

        const d = gerarDados(dados);

        const largura = doc.page.width - doc.page.margins.left - doc.page.margins.right;

        const logo = path.join(__dirname, '../img/logo_prominas.png');
        const assinatura = path.join(__dirname, '../img/assinatura_prominas.jpg');

        // =========================
        // FONTES
        // =========================
        doc.registerFont('Cambria', path.join(__dirname, '../fonts/Cambria.ttf'));
        doc.registerFont('Trebuchet', path.join(__dirname, '../fonts/Trebuchet.ttf'));
        doc.registerFont('Trebuchet-Bold', path.join(__dirname, '../fonts/Trebuchet-Bold.ttf'));

        // =========================
        // LOGO
        // =========================
        if (fs.existsSync(logo)) {
            doc.image(logo, doc.page.width / 2 - 60, 40, { width: 120 });
        }

        doc.moveDown(5);

        // =========================
        // INSTITUIÇÃO
        // =========================
        doc.font('Cambria').fontSize(8).text(
`Faculdade Prominas de Montes Claros
Mantenedora: Faculdade Montes Claros LTDA 05.850.453/0001-20
Endereço: Rua Lírio Brant, 511 - Melo - Montes Claros - MG CEP: 39401-063
Telefone: (31) 2109-2300
www.faculdadesprominas.com.br`,
        { align: 'center' });

        doc.moveDown(2);

        // =========================
        // TÍTULO
        // =========================
        doc.font('Trebuchet-Bold')
            .fontSize(16)
            .text('DECLARAÇÃO DE MATRÍCULA E FREQUÊNCIA', {
                align: 'center'
            });

        doc.moveDown(2);

        // =========================
        // TEXTO
        // =========================
        doc.font('Trebuchet').fontSize(12);

        doc.text('Declaramos para os devidos fins que ', { continued: true });

        doc.font('Trebuchet-Bold').text(d.nome.toUpperCase(), { continued: true });

        doc.font('Trebuchet').text(', registro acadêmico nº ', { continued: true });

        doc.font('Trebuchet-Bold').text(d.registro, { continued: true });

        doc.font('Trebuchet').text(', portador(a) do CPF: ', { continued: true });

        doc.font('Trebuchet-Bold').text(d.cpf, { continued: true });

        doc.font('Trebuchet').text(' e RG: ', { continued: true });

        doc.font('Trebuchet-Bold').text(d.rg, { continued: true });

        doc.font('Trebuchet').text(
            ` está regularmente matriculado(a) e frequente no ${d.periodo}º período do curso de ${d.curso}, semestre letivo ${d.ano}/${d.semestre}, nesta Instituição de Ensino, tendo o curso 8 períodos, em regime semestral.`,
            { align: 'justify' }
        );

        doc.moveDown(3);

        // =========================
        // DATA
        // =========================
        doc.text(
            `Montes Claros/MG, ${d.dia} de ${d.mesAtual} de ${d.ano}`,
            { align: 'center' }
        );

        doc.moveDown(3);

        // =========================
        // ASSINATURA
        // =========================
        if (fs.existsSync(assinatura)) {
            doc.image(assinatura, doc.page.width / 2 - 70, doc.y, { width: 140 });
        }

        // =========================
        // RODAPÉ DIREITA
        // =========================
        const rodapeY = doc.page.height - 80;

        doc.font('Trebuchet')
            .fontSize(8)
            .text(
                'A autenticidade deste documento pode ser conferida no site https://faculdadeunica.pincelatomico.net.br/externos/consulta_validado',
                50,
                rodapeY,
                {
                    width: largura,
                    align: 'right'
                }
            );
    }
};