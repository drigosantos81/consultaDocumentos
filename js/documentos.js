function search() {
    var cpf = document.getElementById('inputCPF').value;
    validation(cpf);
}

function validation(cpfValue) {
    var storage = firebase.storage();
    // Retorna uma promisses que será processada
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        if (todosArquivos.items.length >= 1) {
            next(cpfValue);
        } else {
            alert('CPF não encontrado');
        }
        console.log(todosArquivos.items);
    }).cath(function(error) {
        console.log('ERRO', error);        
    });
}

function next(cpfValue) {
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    document.getElementById('tituloDocumentos').innerHTML = 'Certificado de: ' + cpfValue;
}

function back() {
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById('inputCPF').value = '';
}


    // var timestamp = new Date().getTime();
    // var database = firebase.database();
    // database.ref(timestamp).set({
    // cpf: inputCPF
    // })

/* function enviar() {
     var emailValue = document.getElementById('emailTxt').value;
     var areaValue = document.getElementById('areaTxt').value;
     var timestamp = new Date().getTime();

     A variavel database vai receber as funções de acesso ao banco de dados
     var database = firebase.database();
     database.ref(timestamp).set({
         email: emailValue,
         mensagem: areaValue
     });    
 }*/