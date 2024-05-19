const listaDeProdutos = () => {
    return fetch("http://localhost:3000/produtos")
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

const addProduto = (name, price, image) =>  {
    return fetch("http://localhost:3000/produtos",{
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            name,
            price,
            image,
        })       
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function apagarCard(id ) {
    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log(`O card com ID ${id} foi excluído com sucesso na API.`);
        } else {
            console.error(`Erro ao excluir o card com ID ${id} na API:`, response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação de exclusão para a API:', error);
    }
}
export const produtosServicos = {
    listaDeProdutos,
    addProduto,
    apagarCard,
}
