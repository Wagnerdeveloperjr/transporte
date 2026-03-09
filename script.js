const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbzMDjlqDGOsA3TdVUzP84WPpQop18UaliEXi3JaJ1ieKVXZGMoXS7w_a8AIY5dXfJaxcA/exec";

window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById('latitude').value = position.coords.latitude;
            document.getElementById('longitude').value = position.coords.longitude;
        }, function(error) {
            console.warn("GPS não autorizado.");
        });
    }
};

document.getElementById('formMatricula').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = document.getElementById('btnSalvar');
    btn.innerText = "Processando...";
    btn.disabled = true;

    const nomeAluno = document.getElementById('nome').value.toUpperCase();
    const bairroDigitado = document.getElementById('bairro').value.toUpperCase();
    
    const dados = {
        nome: nomeAluno,
        cpf: document.getElementById('cpf').value,
        turma: document.getElementById('turma').value,
        transporte: document.getElementById('usaTransporte').value,
        localizacao: "ZONA RURAL - " + bairroDigitado,
        lat: document.getElementById('latitude').value || "0",
        long: document.getElementById('longitude').value || "0"
    };

    document.getElementById('p-nome').innerText = dados.nome;
    document.getElementById('p-turma').innerText = dados.turma;
    document.getElementById('p-data').innerText = new Date().toLocaleString('pt-BR');
    document.getElementById('p-coords').innerText = dados.localizacao;

    fetch(URL_GOOGLE_SCRIPT, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(dados),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
        alert("Sucesso! Registro concluído.");
        window.print(); 
        document.getElementById('formMatricula').reset();
    })
    .catch(err => {
        alert("Erro ao enviar para a planilha, mas pode imprimir o ticket.");
        window.print();
    })
    .finally(() => {
        btn.innerText = "Registrar e Gerar Protocolo";
        btn.disabled = false;
    });
});