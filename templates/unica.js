const path = require('path');
const fs = require('fs');

function gerarDados(d) {

    const cursos = [
        "PSICOLOGIA",
        "ADMINISTRAÇÃO",
        "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS",
        "CIÊNCIA DA COMPUTAÇÃO",
        "CIÊNCIAS CONTÁBEIS",
        "EDUCAÇÃO FÍSICA",
        "JORNALISMO",
        "LETRAS",
        "MARKETING",
        "PUBLICIDADE E PROPAGANDA"
    ];

    const curso = cursos[Math.floor(Math.random() * cursos.length)];
    const matricula = Math.floor(10000000 + Math.random() * 90000000);

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

    return {
        ...d,
        curso,
        matricula,
        mesAtual: meses[hoje.getMonth()],
        ano: hoje.getFullYear(),
        dia: hoje.getDate()
    };
}

module.exports = {
    id: "unica",
    nome: "Declaração UNICA",

    campos: ["nome", "cpf", "rg"],

    render: (doc, dados) => {

        const d = gerarDados(dados);

        const largura = doc.page.width - 100;

        const logo = path.join(__dirname, '../img/logo_unica.png');
        const assinatura = path.join(__dirname, '../img/assinatura_unica.jpg');

        // =========================
        // FONTE CAMBRIA
        // =========================

        doc.registerFont('Cambria', path.join(__dirname, '../fonts/Cambria.ttf'));
        doc.registerFont('Cambria-Bold', path.join(__dirname, '../fonts/Cambria-Bold.ttf'));

        doc.font('Cambria');

        // =========================
        // LOGO CENTRALIZADA
        // =========================

        if (fs.existsSync(logo)) {
            doc.image(logo, doc.page.width / 2 - 60, 40, { width: 120 });
        }

        doc.moveDown(5);

        // =========================
        // INFORMAÇÕES DA INSTITUIÇÃO
        // =========================

        doc.fontSize(8)
            .text('Mantenedora: FACULDADE ÚNICA DE IPATINGA 32.495.498/0001-05', {
                align: 'center'
            });

        doc.text('Endereço: Rua Salermo, 299 - Bethânia - Ipatinga - MG', {
            align: 'center'
        });

        doc.text('CEP: 35164-779 - Telefone: (31) 2109-2300', {
            align: 'center'
        });

        doc.text('https://www.faculdadeunica.com.br/', {
            align: 'center'
        });

        doc.y += 60; // ou 50, 60… ajusta fino

        // =========================
        // TÍTULO
        // =========================

        doc.font('Cambria-Bold')
            .fontSize(20)
            .text('DECLARAÇÃO DE MATRÍCULA', {
                align: 'center'
            });

        doc.moveDown(2);

        // =========================
        // TEXTO PRINCIPAL (COM NEGRITO PARCIAL)
        // =========================

        doc.font('Cambria').fontSize(12);

        doc.text('Declaramos que ', { continued: true });

        doc.font('Cambria-Bold').text(d.nome.toUpperCase(), { continued: true });

        doc.font('Cambria').text(' matrícula ', { continued: true });

        doc.font('Cambria-Bold').text(d.matricula, { continued: true });

        doc.font('Cambria').text(' portador(a) do CPF ', { continued: true });

        doc.font('Cambria-Bold').text(d.cpf, { continued: true });

        doc.font('Cambria').text(' e RG ', { continued: true });

        doc.font('Cambria-Bold').text(d.rg, { continued: true });

        doc.font('Cambria').text(
            `, encontra-se matriculado(a) no curso de BACHARELADO EM ${d.curso} ministrado por esta Instituição de Ensino.`,
            { align: 'justify' }
        );

        doc.moveDown(1);

        doc.text(
            `Declaramos ainda que o(a) referido(a) aluno(a) está frequente, realizou as atividades propostas do curso durante o mês de ${d.mesAtual}/${d.ano} e a carga horária total foi de 80 horas.`,
            {
                align: 'justify'
            }
        );

        doc.moveDown(3);

        // =========================
        // DATA
        // =========================

        doc.text(
            `Ipatinga/MG, ${d.dia} de ${d.mesAtual} de ${d.ano}`,
            { align: 'center' }
        );

        doc.moveDown(3);

        // =========================
        // ASSINATURA
        // =========================

        const larguraAssinatura = 160;

doc.image(
    assinatura,
    doc.page.width / 2 - (larguraAssinatura / 2),
    doc.y,
    { width: larguraAssinatura }
);

        doc.moveDown(5);

        // =========================
        // RODAPÉ FIXO
        // =========================

        const rodapeY = doc.page.height - 100;

        doc.moveTo(50, rodapeY)
            .lineTo(doc.page.width - 50, rodapeY)
            .stroke();

        doc.fontSize(8)
            .font('Cambria')
            .text(
                'A autenticidade deste documento pode ser conferida no QR Code ou site https://faculdadeunica.pincelatomico.net.br/externos/consulta_validador/ informando o código verificador.',
                50,
                rodapeY + 10,
                {
                    width: largura,
                    align: 'left'
                }
            );
    }
};