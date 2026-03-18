let campos = [];

function aplicarMascaraCPF(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function aplicarMascaraData(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2');
}

function mostrarFeedback(msg, tipo) {
    const el = document.getElementById('feedback');
    el.textContent = msg;
    el.className = tipo;
    el.classList.remove('hidden');
}

function validar(dados) {
    for (let key in dados) {
        if (!dados[key]) return false;
    }
    return true;
}

async function carregarTemplates() {
    const res = await fetch('/templates');
    const templates = await res.json();

    const select = document.getElementById('template');

    templates.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.nome;
        select.appendChild(opt);
    });

    carregarCampos();
}

function criarInput(campo) {
    const input = document.createElement('input');
    input.id = campo;
    input.placeholder = campo.toUpperCase();

    input.addEventListener('input', (e) => {
        let valor = e.target.value.toUpperCase();

        if (campo === 'cpf') valor = aplicarMascaraCPF(valor);
        if (campo === 'dn') valor = aplicarMascaraData(valor);

        e.target.value = valor;
    });

    return input;
}

function carregarCampos() {

    const templateSelecionado = document.getElementById('template').value;

    // campos padrão
    campos = ["nome", "cpf", "dn", "cidade", "pai", "mae"];

    // se for declaração única, adiciona RG
    if (templateSelecionado === "unica") {
        campos.push("rg");
    }

    const form = document.getElementById('form');
    form.innerHTML = '';

    campos.forEach(c => {
        const label = document.createElement('label');
        label.textContent = c.toUpperCase();

        const input = criarInput(c);

        form.appendChild(label);
        form.appendChild(input);
    });
}

async function gerar() {
    const btn = document.getElementById('btnGerar');
    const btnText = document.getElementById('btnText');

    const dados = {};
    campos.forEach(c => dados[c] = document.getElementById(c).value);

    if (!validar(dados)) {
        mostrarFeedback("Preencha todos os campos.", "error");
        return;
    }

    btn.classList.add('loading');
    btnText.textContent = "Gerando...";

    try {
        const templateId = document.getElementById('template').value;

        const res = await fetch('/gerar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ templateId, dados })
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'declaracao.pdf';
        a.click();

        mostrarFeedback("PDF gerado com sucesso!", "success");

    } catch (err) {
        mostrarFeedback("Erro ao gerar PDF.", "error");
    }

    btn.classList.remove('loading');
    btnText.textContent = "Gerar PDF";
}
document.getElementById('template').addEventListener('change', carregarCampos);
carregarTemplates();