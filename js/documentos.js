function search() {
    var cpf = document.getElementById('inputCPF').value;
    validation(cpf);
}

function validation(cpfValue) {
    var storage = firebase.storage();
    // Retorna uma promisses que será processada
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        if (todosArquivos.items.length >= 1) {
            listFiles(cpfValue);
            next(cpfValue);
        } else {
            alert('CPF não encontrado');
        }
        console.log(todosArquivos.items);
    }).catch(function(error) {
        console.log('ENTREI');
        
        console.log('ERRO', error);        
    });
}

function listFiles(cpfValue) {
    document.getElementById('tituloDocumentos').innerHTML = 'Certificado de: ' + cpfValue;
    var storage = firebase.storage();
    var arquivos;
    var nomeArquivos = [];
    var linksArquivos = [];
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        arquivos = todosArquivos.items;
        
        for (let i=0; i < arquivos.length; i++) {
            nomeArquivos.push(arquivos[i].name);
            storage.ref(cpfValue + '/' + nomeArquivos[i]).getDownloadURL().then(function(url) {
                console.log('Nome', nomeArquivos[i]);
                console.log('Link', url);
                var ul = document.getElementById("list");
                var li = document.createElement("li");
                var listItem = '<a href="'+url+'" target="_blank">'+nomeArquivos[i]+'</a>'
                li.innerHTML = listItem;
                ul.appendChild(li);
            }).catch(function(error){
                console.log(error);                
            }).finally(function(){
                // console.log('j',j);
                // console.log('Nome', nomeArquivos[i]);
                // console.log('Link', linksArquivos[i]);
                // console.log('Nome', nomeArquivos[j]);
                // console.log('Link', linksArquivos[j]);
                // var ul = document.getElementById("list");
                // var li = document.createElement("li");
                // var listItem = '<a href="'+linksArquivos[j]+'" target="_blank">'+nomeArquivos[j]+'</a>'
                // li.innerHTML = listItem;
                // ul.appendChild(li);
            });
        }
    });
}

function next(cpfValue) {
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    
}

function back() {
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById('inputCPF').value = '';
}
