const urlListar = 'http://127.0.0.1:3000/produtos/';

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
    const res = await fetch(urlListar,{
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
        const option = document.createElement('option');
        const valor = 'valor'+(index+2);
        option.setAttribute('value',valor);
        option.setAttribute('onclick','selectproduto(this)');
        option.innerHTML += listProd[index]['nome_produto'];
        listaProdutos.appendChild(option);
    }
}

const consultaProduto = (prod) => {
    let formulario = document.querySelector('#formulario');
    for (let index = 0; index < listProd.length; index++) {
        if(listProd[index]['nome_produto'] == prod){
            produto = listProd[index];
        }
    }
    formulario[1].value = produto['preco'];
    formulario[2].value = produto['quantidade'];
    if(produto['unidade_medida'] == 'kg'){
        formulario[3].checked = true;
    }else{
        formulario[4].checked = true;
    }
    if(produto['produto_ativo'] == 'S'){
        formulario[5].checked = true;
    }else{
        formulario[6].checked = true;
    }
}
//        console.log(option.innerHTML);

const selectproduto = (botao) => {
    consultaProduto(botao.innerHTML);
}