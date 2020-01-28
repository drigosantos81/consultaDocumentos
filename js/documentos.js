function search() {
    var cpf = document.getElementById('inputCPF').value;
    console.log(cpf);
    validation(cpf);
}

function validation(cpfValue) {
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    document.getElementById('tituloDocumentos').innerHTML = 'Certificado de: ' + cpfValue;

    var timestamp = new Date().getTime();
    var database = firebase.database();
    database.ref(timestamp).set({
    cpf: inputCPF
    })
}

function back() {
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById('inputCPF').value = '';
}

// function enviar() {
//     var emailValue = document.getElementById('emailTxt').value;
//     var areaValue = document.getElementById('areaTxt').value;
//     var timestamp = new Date().getTime();

//     // A variavel database vai receber as funções de acesso ao banco de dados
//     var database = firebase.database();
//     database.ref(timestamp).set({
//         email: emailValue,
//         mensagem: areaValue
//     });    
// }