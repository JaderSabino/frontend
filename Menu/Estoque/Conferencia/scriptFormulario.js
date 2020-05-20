const urlListarProduto = 'http://127.0.0.1:3000/produtos/';
const urlCadConferencia = 'http://127.0.0.1:3000/produtoConferencia/';

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
    const listaProdutos = document.querySelector('#listaProdutos'); 
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

const consultaProduto = (prod) => {
    const formulario = document.querySelector('#formulario');
    for (let index = 0; index < listProd.length; index++) {
        if(listProd[index]['nome_produto'] == prod){
            produto = listProd[index];
            produto['nome_produto'] = prod;
        }
    }
    formulario[1].value = produto['quantidade'] + ' ' + produto['unidade_medida'];
}

const inserirConferencia = async () => {
    const formulario = document.querySelector('#formulario');
    const conferencia = {
        'quantidade': `${formulario[2].value}`, 
        'id_produto': `${produto['id_produto']}`
    }
    console.log(conferencia);
    const res = await fetch(urlCadConferencia,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(conferencia)
    }).then((res) => {
        return res.json();
    });
    alert(res['mensagem']['message']);
}

const selectproduto = (botao) => {
    consultaProduto(botao.innerHTML);
}

const carregaPagina = () => {
    const formulario = document.querySelector('#formulario');
    formulario[0][0].selected = true;
    formulario[1].value = '';
    formulario[2].value = '';
    geraObjeto();
};

const conferir = () => {
    const formulario = document.querySelector('#formulario');
    if(formulario[2].value == ''){
        alert('Favor inserir quantidade física');
    }else{
        inserirConferencia()
        .then((res) => {
            carregaPagina()
        }).catch((err) => {
            alert('Erro ao conferir produto');
        });
        
    }
};

const voltar = () => {
    window.location.href = '../../index.html';
}