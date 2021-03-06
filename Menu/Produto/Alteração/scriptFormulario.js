let url = 'http://127.0.0.1:3000/produto/';

const salvar = () => {
    getFormulario()
    .then(cancelar())
    .catch((err) => {
        alert('Erro ao alterar produto');
    });
}

const cancelar = () => {
    let formulario = document.querySelector('#formulario');
    limpaFormulario(formulario);
    const listaProdutos = document.querySelector('#listaProdutos');
    listaProdutos[0].selected = true;
    formulario[2].checked = false;  
    formulario[3].checked = false;
    formulario[4].checked = false;
    formulario[5].checked = false;
    produto = '';
}

const voltar = () => {
    window.location.href = '../../index.html';
}

const limpaFormulario = (form) =>{
    for (let index = 0; index < form.length; index++) {
        form[index].value = '';
    }
}

const getFormulario = async () => {
    let formulario = document.querySelector('#formulario');
    if(validaFormulario(formulario)){
        return await inserirProduto(converteJson(formulario));
    }else{
        alert('Favor preencher todos os campos');
    }
}

const validaFormulario = (form) => {
    for (let index = 0; index < form.length-4; index++) {
        if(form[index].value == ''){
            return false;
        }
    }
    return true;
}

const converteJson = (form) => {
    let undMed;
    let ativo;
    if(form[2].checked){
        undMed = 'kg';
    }else{
        undMed = 'un';
    }
    if(form[4].checked){
        ativo = 'S';
    }else{
        ativo = 'N';
    }
    return {
        nome_produto: form[0].innerText,
        preco: form[1].value.replace('R$ ', ''),
        unidade_medida: undMed,
        produto_ativo: ativo
    }
}

const inserirProduto = async (dadosCliente) => {
    if(produto){
        if(parseInt(produto['quantidade']) != 0 && dadosCliente['produto_ativo'] == 'N'){
            alert('Produto ainda possui estoque!');
        }else{
            produto['preco'] = dadosCliente['preco'].replace(",", ".");
            produto['unidade_medida'] = dadosCliente['unidade_medida'];
            produto['produto_ativo'] = dadosCliente['produto_ativo'];
            const res = await fetch(url + produto['id_produto'],{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            }).then((res) => {
                return res.json();
            });
            alert(res['message']);
        }
    }else{
        alert('Nenhum produto para alteração selecionado');
    }

}

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
    listProd = [];
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
    let formulario = document.getElementById('formulario');
    limpaFormulario(formulario);
    formulario[1].value = '';
    formulario[2].checked = false;
    formulario[3].checked = false;
    formulario[4].checked = false;
    formulario[5].checked = false;
    const listaProdutos = document.querySelector('#listaProdutos'); 
    const option = document.createElement('option');
    const valor = 'valor1';
    option.setAttribute('value',valor);
    option.setAttribute('onclick','selectproduto(this)');
    option.innerHTML = '---';
    listaProdutos.appendChild(option);
    listaProdutos[0].selected = true;
    for (let index = 0; index < listProd.length; index++) {
        const option = document.createElement('option');
        const valor = listProd[index]['id_produto'];
        option.setAttribute('value',valor);
        option.setAttribute('onclick','selectproduto(this)');
        option.innerHTML += listProd[index]['nome_produto'];
        listaProdutos.appendChild(option);
    }
}

const consultaProduto = (prod) => {
    let formulario = document.querySelector('#formulario');
    for (let index = 0; index < listProd.length; index++) {
        if(listProd[index]['id_produto'] == prod){
            produto = listProd[index];
        }
    }
    formulario[1].value = 'R$ ' + produto['preco'];
    if(produto['unidade_medida'] == 'kg'){
        formulario[2].checked = true;
    }else{
        formulario[3].checked = true;
    }
    if(produto['produto_ativo'] == 'S'){
        formulario[4].checked = true;
    }else{
        formulario[5].checked = true;
    }
}

const selectproduto = (botao) => {
    let formulario = document.querySelector('#formulario');
    if(botao.innerHTML == '---'){
        formulario[1].value = '';
        formulario[2].checked = false;
        formulario[3].checked = false;
        formulario[4].checked = false;
        formulario[5].checked = false;
    }else{
        consultaProduto(botao.value);
    }
}