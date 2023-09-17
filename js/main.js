const form = document.getElementById("novoItem");
const list = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach(item => {
    adicionaItemMochila(item);
});


form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const elementoNome = event.target.elements["nome"];
    const elementoQuantidade = event.target.elements["quantidade"];

    if(elementoNome && elementoQuantidade){
        const existeItem = itens.find(elemento => elemento.nome === elementoNome.value);

        const itemAtual = {
            "nome": elementoNome.value,
            "quantidade": elementoQuantidade.value
        };
    
        
        if(existeItem){
            itemAtual.id = existeItem.id;
            atualizaItemMochila(itemAtual);
            itens[itens.findIndex(elemento => elemento.id === existeItem.id)] = itemAtual;
        }else{
            if(itens.length != 0){
                itemAtual.id = itens[itens.length - 1].id + 1
            }else{
                itemAtual.id = 0;
            }
            
            adicionaItemMochila(itemAtual);
    
            itens.push(itemAtual);
        }
    
        localStorage.setItem("itens", JSON.stringify(itens));
        elementoNome.value = "";
        elementoQuantidade.value = "";
    }

})

function adicionaItemMochila(item){
    
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.dataset.id = item.id;
    numeroItem.innerHTML = item.quantidade;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    list.appendChild(novoItem);
    
}

function atualizaItemMochila(item){
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    elementoBotao = document.createElement('button');
    elementoBotao.innerText = "X"
    elementoBotao.addEventListener("click", function(){
        item = this.parentElement;
        deletaItemMochila(item, id)
    })
    return elementoBotao;
}

function deletaItemMochila(item, id){
    item.remove();
    itens.splice(itens.findIndex(elemento =>{
        if(elemento.id === id){
            return elemento;
        }
    }), 1)
    localStorage.setItem("itens", JSON.stringify(itens));
}