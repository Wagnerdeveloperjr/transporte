// Exemplo de como deve ficar (usa o TEU link azul copiado agora)
const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbx1_yVG6GRHXIpn1n4Vldhw7yB4eekwyCQrLhNzIjXUMs8cA-HF6upzc-VZul3VVJuVvQ/exec";

document.getElementById('formMatricula').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = document.getElementById('btnSalvar');
    btn.innerText = "A Enviar...";
    btn.disabled = true;

    // Dados extraídos da ficha de matrícula [cite: 8, 17, 119, 69]
    const dados = {
        nome: document.getElementById('nome').value,      // Ex: AMANDA VITÓRIA [cite: 8]
        cpf: document.getElementById('cpf').value,        // Ex: 202.217.337-60 [cite: 17]
        turma: document.getElementById('turma').value,    // Ex: 8º ANO D V [cite: 119]
        transporte: document.getElementById('usaTransporte').value // SIM/NÃO [cite: 69]
    };

    fetch(URL_GOOGLE_SCRIPT, {
        method: 'POST',
        body: JSON.stringify(dados)
    })
    .then(res => {
        alert("Sucesso! O embarque de " + dados.nome + " foi registado.");
        document.getElementById('formMatricula').reset();
    })
    .catch(err => alert("Erro ao enviar: " + err))
    .finally(() => {
        btn.innerText = "Registrar Embarque";
        btn.disabled = false;
    });
});