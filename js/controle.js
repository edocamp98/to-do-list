let contador = 0; //recebe um número quando a função de adicionar tarefa é iniciada; o número se torna o id da nova tarefa

let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');

let toArchive = [];
console.log(toArchive);

loadTasks();

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasksArchived')) || [];

    //organizar
    tasks.sort((a,b) => {
        if (a.status === b.status) return 0;
        if (!a.status && b.status) return -1;
        return 1;
    });


    toArchive = tasks;
    console.log(tasks);
    
    if (tasks.length > 0) {
        contador = Math.max(...tasks.map(task => task.id));
    }

    tasks.forEach(task => {
        createLoadedTask(task);
    });
   
   function createLoadedTask(task) {
        let novoItem = `<div id="${task.id}" class="item">
            <div class="item-icone" onclick="marcarTarefa(${task.id})">
                <span id="icone_${task.id}" class="material-symbols-outlined">
                    ${task.status ? 'check_box' : 'square'}
                </span>
            </div>
            <div class="item-nome" onclick="marcarTarefa(${task.id})">
                ${task.input}
            </div>
            <div class="item-botao">
                <button class="delete" onclick="deletar(${task.id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>`;

        main.innerHTML += novoItem;
        
        // Adicionar classe 'clicado' se a tarefa estava marcada
        if (task.status) {
            let itemElement = document.getElementById(task.id);
            itemElement.classList.add('clicado');
        }
    }
};
    
    
   

function saveTasks(){
    localStorage.setItem('tasksArchived', JSON.stringify(toArchive));

}


function addTarefa(){
    
    //pegar valor do input
    let valorInput = input.value;
    
    //se não for vazio, nulo ou indefinido
    if ((valorInput !== "") && (valorInput !== null) & (valorInput !== undefined)){
        contador++;
        
        // adiciona ao arquivo
        let novaTask = {
            input: valorInput,
            id: contador,
            status: false
        }
        console.log(novaTask);
        toArchive.push(novaTask);
        saveTasks();
        

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
    
    //adicionar novo item no main    
    main.innerHTML += novoItem;
    


    //limpar campo de adição
    input.value = "";
    input.focus();

}
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
    if (tarefa){
        tarefa.remove();
    }
    let taskIndex = toArchive.findIndex(task => task.id === id);
    if (taskIndex !== -1){
        toArchive.splice(taskIndex,1);
        saveTasks();
    }

}

function marcarTarefa(id){
    //com base no id adicionado pelo contador, adiciona a classe de item com as características preparadas no css do item marcado

    var item = document.getElementById(id);
    var classe = item.getAttribute('class');

    //encontrar no archive
    taskIndex = toArchive.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        if (classe.includes('clicado')){
            item.classList.remove('clicado')
            var icone = document.getElementById('icone_'+id);
            icone.innerHTML = "square";
            toArchive[taskIndex].status = false;
            item.parentNode.appendChild(item);
        } else {
            // Adicionar marcação
            item.classList.add('clicado');
            var icone = document.getElementById('icone_'+id);
            icone.innerHTML = "check_box";
            toArchive[taskIndex].status = true;
        }
        saveTasks();
    }

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

function limpaStorage() {
    localStorage.clear();
    alert('--CLEARED--');
}