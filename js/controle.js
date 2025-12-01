let contador = 0;
let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');

function addTarefa(){
    //pegar valor do input
    let valorInput = input.value;

    //se não for vazio, nulo ou indefinido
    if ((valorInput !== "") && (valorInput !== null) & (valorInput !== undefined)){
        contador++;
        let novoItem = `<div id="${contador}" class="item">
            <div class="item-icone" onclick="marcarTarefa(${contador})">
                <span  id="icone_${contador}"class="material-symbols-outlined">circle</span>
            </div>
            <div class="item-nome" onclick="marcarTarefa(${contador}">
                ${valorInput}
            </div>
            <div class="item-botao">
                <button class="delete" onclick="deletar(${contador})"><span class="material-symbols-outlined">delete</span></button>
            </div>
        </div>`
    //aidcionar novo item no main    
        main.innerHTML += novoItem;
    }
    //limpar campo de adição
    input.value = "";
    input.focus();

}

input.addEventListener("keypress", function(event){
    //se teclou enter, aperta o botão
    if (event.key === "Enter"){
        event.preventDefault();
        btnAdd.click();
    }
})

function deletar(id){
    var tarefa = document.getElementById(id);
    tarefa.remove();

}

function marcarTarefa(id){
    var item = document.getElementById(id);
    var classe = item.getAttribute('class');

    if (classe == "item"){
        item.classList.add('clicado')

        var icone = document.getElementById('icone_'+id)
        icone.innerHTML = "check_circle"
    }

}