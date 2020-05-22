const urlListarProduto = 'http://127.0.0.1:3000/produtos/';
const urlAtualizaProduto = 'http://127.0.0.1:3000/atualizaProduto/';

let produto;

class Produto {
    constructor(prod) {
      this.id_produto = prod['id_produto'];
      this.nome_produto = prod['nome_produto'];
      this.preco = prod['preco'];
      this.produto_ativo = prod['produto_ativo'];
      this.quantidade = prod['quantidade'];
      this.unidade_medida = prod['unidade_medida'];
      this.updatedAt = prod['updatedAt'];
      this.createdAt = prod['createdAt'];
    }
}

let listProd = [];

const geraObjeto = async () => {
    listProd = [];
    const res = await fetch(urlListarProduto,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    });
    for (let index = 0; index < res['produtos'].length; index++) {
        listProd.push(new Produto(res['produtos'][index]));
    }
    inserirProdutos(listProd);  
}

const inserirProdutos = (listProd) => {
    limpaListaProduto();
    const listaProdutos = document.querySelector('#listaProdutos');
    const option = document.createElement('option');
    const valor = 'valor1';
    option.setAttribute('value',valor);
    option.innerHTML += '---';
    listaProdutos.appendChild(option); 
    for (let index = 0; index < listProd.length; index++) {
        if(listProd[index]['produto_ativo'] == 'S'){
            const option = document.createElement('option');
            const valor = 'valor'+(index+2);
            option.setAttribute('value',valor);
            option.setAttribute('onclick','selectproduto(this)');
            option.innerHTML += listProd[index]['nome_produto'];
            listaProdutos.appendChild(option);
        }
    }
}

const limpaListaProduto = () => {
    const listaProdutos = document.querySelector('#listaProdutos');
    listaProdutos.innerHTML = '';
}


const selectproduto = (botao) => {
    consultaProduto(botao.innerHTML);
}

const consultaProduto = (prod) => {

    for (let index = 0; index < listProd.length; index++) {
        if(listProd[index]['nome_produto'] == prod){
            produto = listProd[index];
            produto['nome_produto'] = prod;
        }
    }
}

const voltar = () => {
    window.location.href = '../../index.html';
}

const carregarPagina = () => {
    const formulario = document.querySelector('#formulario');
    formulario[1].value = '';
    geraObjeto();
}

const receber = () => {
    receberProduto().then((res) => {
        carregarPagina();
    }).catch((err) => {
        alert('Erro ao receber');
    })
}

const receberProduto = async () => {
    const formulario = document.querySelector('#formulario');
    let dados = []
    const recebimento = {
        'operacao': 'E',
        'quantidade_acao': `${formulario[1].value}`, 
        'id_produto': `${produto['id_produto']}`
    }
    dados.push(recebimento);
    const res = await fetch(urlAtualizaProduto,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }).then((res) => {
        return res.json();
    });
    alert(res['message']);
}