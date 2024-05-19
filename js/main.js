import { apagarCard, produtosServicos } from "../js/adicionarProduto.js";

const produtoContainer = document.querySelector('[data-produto]');
const addForm =  document.querySelector('[data-form]');
const btnDelete = document.querySelector('.btn-excluir')

function createElement(name, price, image, id) {
    const card = document.createElement('div');
    card.classList.add('card-game');
    card.setAttribute('data-id',id);

    card.innerHTML = `
        <div class="card-game-descricao"> 
            <img class="card-game-imagem" src="${image}" alt="${name}">
            <p class="card-game-descricao-paragrafo">${name}</p>
        </div> 
        <div class="card-game-valor">
            <p class="card-game-descricao-valor">${price},00</p>
            <button class="btn-excluir" id="excluir" data-id="${id}">
                <img class="card-game-excluir"  src="assets/lixeira.png" alt="imagem da lixeira">
            </button>
        </div>
    `;
    const deleteCard = card.querySelector('#excluir')
        deleteCard.addEventListener('click', async() =>{
        const idCard= card.getAttribute('data-id')
        card.remove()
        await apagarCard(idCard)
        console.log(deleteCard)
    })

    produtoContainer.appendChild(card);
    return card

}

const render = async () => {
    try {
        const listaDeProdutos = await produtosServicos.listaDeProdutos();
        
        listaDeProdutos.forEach(produto => {
            produtoContainer.appendChild(
                createElement(
                    produto.name,
                    produto.price,
                    produto.image,
                    produto.id
                )
            )
        });
    } catch (error) {
        console.error(error);
    };
}

render();

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('[data-name]').value;
    const price = document.querySelector('[data-price]').value;
    const image = document.querySelector('[data-image]').value;

    produtosServicos.addProduto(name, price, image)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
})
 
function limparFormulario() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = ''; 
    });
}
const btnLimpar = document.getElementById('btn-limpar');
btnLimpar.addEventListener('click', limparFormulario);

function validarFormulario() {
    const inputs = document.querySelectorAll('input');
    let todosPreenchidos = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            todosPreenchidos = false;
        }
    });

    return todosPreenchidos;
}
addForm.addEventListener('submit', (event) => {
    let enviarFormulario = false;
    if (validarFormulario()) {
        console.log('Todos os campos estão preenchidos. Enviando formulário...');
        enviarFormulario = true;
    } else {
        alert('Por favor, preencha todos os campos do formulário.');
    }
    if (!enviarFormulario) {
        event.preventDefault();
    }
});
    