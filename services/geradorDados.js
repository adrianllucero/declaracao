function gerarDadosAutomaticos() {

    const turmas = [
        "ENF1N19", "ENF2N18", "ENF3N17",
        "SEG1N19", "SEG2N18", "SEG3N17"
    ];

    const turma = turmas[Math.floor(Math.random() * turmas.length)];

    let curso = '';
    if (turma.startsWith('ENF')) {
        curso = 'Técnico em Enfermagem';
    } else {
        curso = 'Técnico em Segurança do Trabalho';
    }

    // 🔥 PEGA O NÚMERO CORRETAMENTE
    const numero = turma.match(/\d/);
    const num = numero ? numero[0] : '1';

    let modulo = 'I';
    if (num === '2') modulo = 'II';
    if (num === '3') modulo = 'III';

    const turno = 'Noite';

    const ano = new Date().getFullYear();
    const termino = Math.random() > 0.5
        ? `30/07/${ano}`
        : `20/12/${ano}`;

    return {
        turma_nome: turma,
        curso,
        modulo,
        turno,
        termino
    };
}

module.exports = { gerarDadosAutomaticos };