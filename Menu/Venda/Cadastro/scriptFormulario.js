const urlListar = 'http://127.0.0.1:3000/clientes/';

let ativo = false;

const salvar = () => {
    let formulario = document.querySelector('#formulario');
    if(formulario[0][0].selected){
        alert('Favor selecionar cliente');
    }else{
        if(formulario[1].value == ''){
            alert('Carrinho vazio!');
        }else{
            if(ativo){
                alert('Venda já cadastrada!');
                cancelar();
                ativo = false;
            }else{
                cadastraVenda();
                ativo = true;
            }
        }
    }
}

const cancelar = () => {
    let itemVenda = document.querySelectorAll('.itemVenda');
    for (let index = 0; index < itemVenda.length; index++) {
        itemVenda[index].remove();
    }
    geraObjetoProduto();
    geraObjetoCliente();
    let formulario = document.querySelector('#formulario');
    formulario[1].value = '';
    indexExcluir = 0;
    carrinho = [];
    listaItens = [];
    produtoCarrinho = '';
    vendaSucesso = false;
    itemVendaSucesso = false;
    ativo = false
}

const caixaProduto = () => {
    const carregarProduto = document.querySelector('#carregarProduto');
    carregarProduto.classList.toggle('esconde');
    carregarProduto[0][0].selected = true;
    carregarProduto[1].value = '';
    carregarProduto[2].value = '';
}

const voltar = () => {
    window.location.href = '../../index.html';
}

let cliente;

class Cliente {
    constructor(cliente) {
      this.cpf_cliente = cliente['cpf_cliente'];
      this.nome_cliente = cliente['nome_cliente'];
      this.telefone = cliente['telefone'];
      this.produto_ativo = cliente['produto_ativo'];
      this.endereco = cliente['endereco'];
      this.createdAt = cliente['createdAt'];
      this.updatedAt = cliente['updatedAt'];
    }
}

let listClientes = [];

const geraObjetoCliente = async () => {
    listClientes = [];
    const res = await fetch(urlListar,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    });
    for (let index = 0; index < res['clientes'].length; index++) {
        listClientes.push(new Cliente(res['clientes'][index]));
    }
    inserirClientes(listClientes);  
}

const inserirClientes = (listCli) => {
    limpaListaCliente();
    const listaClientes = document.querySelector('#listaClientes'); 
    const option = document.createElement('option');
    option.setAttribute('value','valor1');
    option.innerHTML += '---';
    listaClientes.appendChild(option);
    for (let index = 0; index < listCli.length; index++) {
        const option = document.createElement('option');
        option.setAttribute('value',listCli[index]['cpf_cliente']);
        option.setAttribute('onclick','selectcliente(this)');
        option.innerHTML += listCli[index]['nome_cliente'];
        listaClientes.appendChild(option);
    }
}

const selectcliente = (botao) => {
    consultaCliente(botao.value);
}

const consultaCliente = (cpf_cliente) => {
    for (let index = 0; index < listClientes.length; index++) {
        if(listClientes[index]['cpf_cliente'] == cpf_cliente){
            cliente = listClientes[index];
            //cliente['nome_cliente'] = cliente;
        }
    }
}

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

let produtoCarrinho;

class ProdutoCarrinho {
    constructor(prod) {
      this.id_produto = prod['id_produto'];
      this.nome_produto = prod['nome_produto'];
      this.quantidade = prod['quantidade'];
      this.preco = prod['preco'];
    }
}

const urlListarProd = 'http://127.0.0.1:3000/produtos/';

let listProd = [];

let carrinho = [];

const geraObjetoProduto = async () => {
    listProd = [];
    const res = await fetch(urlListarProd,{
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
        if(listProd[index]['produto_ativo'] == 'S' && listProd[index]['quantidade'] > 0){
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

const limpaListaCliente = () => {
    const listaClientes = document.querySelector('#listaClientes'); 
    listaClientes.innerHTML = '';
}

const selectproduto = (botao) => {
    consultaProduto(botao.innerHTML);
}

const consultaProduto = (prod) => {
    let carregarProduto = document.querySelector('#carregarProduto');
    for (let index = 0; index < listProd.length; index++) {
        if(listProd[index]['nome_produto'] == prod){
            produto = listProd[index];
            produto['nome_produto'] = prod;
        }
    }
    carregarProduto[1].value = 'R$ ' + produto['preco'];
    carregarProduto[2].value = '';
}

let indexExcluir = 0;

const listarProduto = () => {
    let listaVenda = document.querySelector('#listaVenda');
    let carregarProduto = document.querySelector('#carregarProduto');
    let formulario = document.querySelector('#formulario');
    if(carregarProduto[0].value == '---' || carregarProduto[1].value == '' || carregarProduto[2].value == ''){
        alert('Favor selecionar algum produto');
    }else{
        if(validaCarrinho(produto)){
            alert('Produto já existente no carrinho');
        }else{
            if(!validaProduto(produto, carregarProduto[2].value)){
                alert('Somente ' + produto['quantidade'] + ' ' + produto['nome_produto'] + ' no estoque');
            }else{
                produto['quantidade'] = carregarProduto[2].value;
                carrinho.push(new ProdutoCarrinho(produto));
                const tr = document.createElement('tr');
                tr.classList.add('itemVenda');
                tr.setAttribute('name', indexExcluir);
                const tdCodigo = document.createElement('td');
                const tdNome = document.createElement('td');
                const tdQuantidade = document.createElement('td');
                const tdValor = document.createElement('td');
                const tdExcluir = document.createElement('td'); 
    
                tdCodigo.innerText = produto['id_produto'];
                tdNome.innerText = produto['nome_produto'];
                tdQuantidade.innerText = carregarProduto[2].value;
                let valor = Number(produto['preco']) * Number(carregarProduto[2].value);
                tdValor.innerText = 'R$ ' + valor;
                let valorTotal = Number(formulario[1].value.replace('R$', ''));
                let valorInserir = valorTotal + valor;
                console.log(valorTotal, valor);
                formulario[1].value = 'R$ ' + valorInserir;
    
                const aExcluir = document.createElement('a'); 
                aExcluir.classList.add('excluir');
                aExcluir.innerText = 'Excluir';
                tdExcluir.appendChild(aExcluir);
                tdExcluir.setAttribute('onclick', `excluirItem(${indexExcluir})`);
                indexExcluir++;
    
                tr.appendChild(tdCodigo);
                tr.appendChild(tdNome);
                tr.appendChild(tdQuantidade);
                tr.appendChild(tdValor);
                tr.appendChild(tdExcluir);
    
                listaVenda.appendChild(tr);
            }
        }
    }
}

const validaCarrinho = (prod) => {
    for (let index = 0; index < carrinho.length; index++) {
        if(carrinho[index]['id_produto'] === prod['id_produto']){
            return true;
        }
    }
    return false;
}

const validaProduto = (prod, quant) => {
    if(prod['quantidade'] - quant < 0){
        return false;
    }
    return true;
};

const retiraItemCarrinho = (id) => {
    for (let index = 0; index < carrinho.length; index++) {
        if(carrinho[index]['id_produto'] == id){
            carrinho.splice(index,1);
        }
    }
}

const excluirItem = (item) => {
    let itemVenda = document.querySelectorAll('.itemVenda');
    let formulario = document.querySelector('#formulario');
    for (let index = 0; index < itemVenda.length; index++) {
        if(itemVenda[index].getAttribute('name') == item){
            let valor = Number(itemVenda[index].cells[3].innerText.replace('R$ ', ''));
            let valorTotal = Number(formulario[1].value.replace('R$', ''));
            formulario[1].value = 'R$ ' + (valorTotal - valor);
            if(formulario[1].value == 'R$ 0'){
                formulario[1].value = '';
            }
            retiraItemCarrinho(itemVenda[index].childNodes[0].innerText);
            itemVenda[index].remove();
        }
    }   
}

class Venda {
    constructor(venda) {
      this.valor_total = venda['valor_total'];
      this.venda_ativa = 'S';
      this.cpf_usuario = '11122233344';
      this.cpf_cliente = venda['cpf_cliente'];
    }
}

let vendaSucesso = false;
let itemVendaSucesso = false;

const cadastraVenda = () => {
    geraVenda()
    .then((res) => {
        cadastraItens();
        inserirIdVenda(res['venda']['id_venda']);
        geraItemVenda()
        .then((res) => {
            alert('Venda realizada com sucesso');
        }).catch((err) => {
            alert('Erro ao realizar venda');
        });
    }).catch((err) => {
        alert('Erro ao realizar venda');
    });
}

let venda;

const urlVenda = 'http://127.0.0.1:3000/venda/';

const geraVenda = async () => {
    let formulario = document.querySelector('#formulario');
    let indice;
    for (let index = 0; index < formulario[0].length; index++) {
        if(formulario[0][index].selected){
            indice = index;
        }
    }
    let cliente = listClientes[indice-1];
    venda = new Venda({'valor_total': `${formulario[1].value.replace('R$', '')}`, 'cpf_cliente': `${cliente['cpf_cliente']}`});
    const res = await fetch(urlVenda,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(venda)
    }).then((res) => {
        return res.json();
    });
    return res;
}


const inserirIdVenda = (id) => {
    for (let index = 0; index < listaItens.length; index++) {
        listaItens[index]['id_venda'] = id;
    }
}

let listaItens = [];

const cadastraItens = () => {
    for (let index = 0; index < carrinho.length; index++) {
        var item = new ItemVenda({
            'quantidade': `${carrinho[index]['quantidade']}`,
            'valor_item': `${carrinho[index]['preco']}`,
            'id_venda': '',
            'id_produto': `${carrinho[index]['id_produto']}`
        });
        listaItens.push(item);
    }
}

const urlItemVenda = 'http://127.0.0.1:3000/itemVenda/';

class ItemVenda {
    constructor(itemvenda) {
      this.quantidade = itemvenda['quantidade'];
      this.valor_item = itemvenda['valor_item'];
      this.id_venda = itemvenda['id_venda'];
      this.id_produto = itemvenda['id_produto'];
    }
}

let itemvenda;

const geraItemVenda = async (item) => {
    const res = await fetch(urlItemVenda,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(listaItens)
    }).then((res) => {
        return res.json();
    });
    return res;
}