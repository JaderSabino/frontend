let url = 'http://127.0.0.1:3000/cliente/';
let urlListarClientes = 'http://127.0.0.1:3000/clientes/';

const KEY_ENTER = 13;
const salvarAtivo = false;

const carregarPagina = () => {
    let formulario = document.querySelector('#formulario');
    cancelar();
    geraObjetoCliente();
}

const salvar = () => {
    getFormulario()
    .then((res) => {
        carregarPagina();
    })
    .catch((err) => {
        alert('Erro ao Atualizar Cliente')
    });
}    

const cancelar = () => {
    let formulario = document.querySelector('#formulario');
    limpaFormulario(formulario);
    listClientes = [];
}

const voltar = () => {
    window.location.href = '../../index.html';
}

const limpaFormulario = (form) =>{
    for (let index = 0; index < form.length; index++) {
        form[index].value = '';
    }
}

const getFormulario = () => {
    let formulario = document.querySelector('#formulario');
    if(validaFormulario(formulario)){
        return inserirCliente(converteJson(formulario));
    }else{
        alert('Favor preencher todos os campos');
    }
}

const validaFormulario = (form) => {
    for (let index = 0; index < form.length; index++) {
        if(form[index].value == ''){
            return false;
        }
    }
    return true;
}

const converteJson = (form) => {
    return {
        cpf_cliente: form[0].value,
        nome_cliente: getNomeCliente(form),
        telefone: form[2].value,
        endereco: form[3].value
    }
}

const getNomeCliente = (form) => {
    let cpf = form[0].value;
    for (let index = 0; index < form.length; index++) {
        if(form[1][index].value == cpf){
            return form[1][index].innerHTML;
        }
    }
}

const inserirCliente = async (dadosCliente) => {
    const res = await fetch(url + dadosCliente['cpf_cliente'],{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCliente)
    }).then((res) => {
        return res.json();
    });
    alert(res['message']);
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
    console.log(listClientes)
    const res = await fetch(urlListarClientes,{
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
    const valor = 'valor1';
    option.setAttribute('value',valor);
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

const consultaCliente = (cpfCliente) => {
    for (let index = 0; index < listClientes.length; index++) {
        if(listClientes[index]['cpf_cliente'] == cpfCliente){
            cliente = listClientes[index];
            //cliente['nome_cliente'] = cliente;
        }
    }
    preencherFormulario(cliente);
}

const preencherFormulario = (cliente) => {
    let formulario = document.querySelector('#formulario');
    formulario[0].value = cliente['cpf_cliente'];
    formulario[2].value = cliente['telefone'];
    formulario[3].value = cliente['endereco'];
}

const limpaListaCliente = () => {
    const listaClientes = document.querySelector('#listaClientes'); 
    listaClientes.innerHTML = '';
}

const consultaClienteEnter = (botao) => {  
    let formulario = document.querySelector('#formulario');
    const listaClientes = document.querySelector('#listaClientes'); 
    let clienteEncontrado = false;
    if(botao.keyCode == KEY_ENTER){
        for (let index = 0; index < listClientes.length; index++) {
            if(listClientes[index]['cpf_cliente'] == formulario[0].value){
                for (let indexI = 0; indexI < listaClientes.length; indexI++) {
                    if(listaClientes[indexI].value == listClientes[index]['cpf_cliente']){
                        listaClientes[indexI].selected = true;
                    }
                }
                formulario[2].value = listClientes[index]['telefone'];
                formulario[3].value = listClientes[index]['endereco'];
                clienteEncontrado = true;
            }
        }
        if(!clienteEncontrado){
            alert('Cliente não econtrado');
            formulario[1][0].selected = true;
            formulario[2].value = '';
            formulario[3].value = '';
        }else{
        }
    }
    clienteEncontrado = false;
}

const ativaDesativaAlteraNome = () => {
    let caixaAlteraNome = document.getElementById('caixaAlterarNome');
    let novoNome = document.querySelector('#input-altera-nome');
    caixaAlteraNome.classList.toggle('ativaAlteraNome');
    novoNome.value = '';
}

const alteraNome = () => {
    let formulario = document.querySelector('#formulario');
    if(formulario[1][0].selected){
        alert('Nenhum cliente selecionado');
    }else{
        ativaDesativaAlteraNome();
    }
}

const confirmaAlteraNome = () => {
    let novoNome = document.querySelector('#input-altera-nome');
    let formulario = document.querySelector('#formulario');
    if(novoNome.value != ''){
        for (let index = 0; index < formulario[1].length; index++) {
            if(formulario[1][index].value == formulario[0].value){
                formulario[1][index].innerText = novoNome.value;
                ativaDesativaAlteraNome();
                break;
            }
        }
    }else{
        alert('Campo Novo Nome Vazio');
    }
}