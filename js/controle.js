let contador = 0; //recebe um número quando a função de adicionar tarefa é iniciada; o número se torna o id da nova tarefa

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
                <span  id="icone_${contador}"class="material-symbols-outlined">square</span>
            </div>
            <div class="item-nome" onclick="marcarTarefa(${contador})">
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
    //habilitar o enter
input.addEventListener("keypress", function(event){
    //se teclou enter, aperta o botão
    if (event.key === "Enter"){
        event.preventDefault();
        btnAdd.click();
    }
})
    // delete btn
function deletar(id){
    //coloca a tarefa numa variável e remove com base no id adicionado pelo contador
    var tarefa = document.getElementById(id);
    tarefa.remove();

}

function marcarTarefa(id){
    //com base no id adicionado pelo contador, adiciona a classe de item com as características preparadas no css do item marcado

    var item = document.getElementById(id);
    var classe = item.getAttribute('class');

    //se o item não possui a classe clicado, adiciona e troca o ícone
    if (classe == "item"){
        item.classList.add('clicado')

        var icone = document.getElementById('icone_'+id)
        icone.innerHTML = "check_box"

        item.parentNode.appendChild(item);

    // para reverter o processo, faz o caminho inverso caso o item já tenha as características alteradas
    } else {
        item.classList.remove('clicado')

        var icone = document.getElementById('icone_'+id)
        icone.innerHTML = "square"
    }

}