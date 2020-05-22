const urlListar = 'http://127.0.0.1:3000/clientes/';
const urlGetVendas = 'http://127.0.0.1:3000/getVendas/';
const urlAtualizaProduto = 'http://127.0.0.1:3000/atualizaProduto/';
const urlCancelaVenda = 'http://127.0.0.1:3000/cancelaVenda/';

const KEY_ENTER = 13;

const carregarTela = () => {
    geraObjetoCliente();
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
    option.setAttribute('onclick','limpaCliente()');
    option.innerHTML += '---';
    listaClientes.appendChild(option);
    cliente = listaClientes[0];
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
        }
    }
}

const limpaListaCliente = () => {
    const listaClientes = document.querySelector('#listaClientes'); 
    listaClientes.innerHTML = '';
}

const limpaCliente = () => {
    cliente = '';
}

let cpf;
let dt;

const consultarVenda = () => {
    let formulario = document.getElementById('formulario');

    cpf = cliente['cpf_cliente'];
    dt = formulario[1].value;

    if(formulario[0][0].selected && dt == ''){
        alert('Favor selecionar Cliente ou Data para consulta');
    }else{
        if(formulario[0][0].selected){
            cpf = '0'; 
        }
    
        if(dt == ''){
            dt = '0';
        }
    
        buscaVenda({cpf_cliente: cpf, data: dt})
        .then((res) => {
            if(res.length == 0){
                alert('Nenhuma venda encontrada');
            }else{
                listaVenda = res;
                inserirVendas(res);
                consultaParaLista();
            }
        })
        .catch((err) => {
            alert('Erro ao realizar consulta' + err);
        });
    }
}

const consultaParaLista = () => {
    let conteudo1 = document.getElementById('conteudo1');
    let conteudo2 = document.getElementById('conteudo2');
    conteudo1.classList.toggle('escondeConteudo');
    conteudo2.classList.toggle('escondeConteudo');
}

const limpaFormularioListaVenda = () => {
    let formVendas = document.getElementById('listaVenda2');
    formVendas.innerHTML = '';
}

let listaVenda = [];
let listaItens = [];

const inserirVendas = (vendas) => {
    let formVendas = document.getElementById('listaVenda2');
    limpaFormularioListaVenda();
    let formulario = document.getElementById('formulario');
    for (let index = 0; index < vendas.length; index++) {
        let tr = document.createElement('tr');
        let tdindex = document.createElement('td');
        tdindex.innerText = index+1;
        let tdNome = document.createElement('td');
        tdNome.innerText = vendas[index]['nome_cliente'];
        let tdData = document.createElement('td');
        let data = vendas[index]['data_venda'].split('-');
        let dia = data[2].split('T');
        tdData.innerText = dia[0] + '/' + data[1] + '/' + data[0];
        let tdValor = document.createElement('td');
        tdValor.innerText = 'R$ ' + vendas[index]['valor_total'];
        let tdAtiva = document.createElement('td');
        tdAtiva.innerText = vendas[index]['venda_ativa'] == 'S' ? 'SIM' : 'NÃO';
        let tdAbrir = document.createElement('td');
        let aAbrir = document.createElement('a');
        aAbrir.classList.add('abrirVenda');
        aAbrir.setAttribute('id', vendas[index]['id_venda']);
        aAbrir.setAttribute('onclick', 'listaVendaParaVenda(), carregaVenda(this)');
        aAbrir.innerText = 'Abrir';
        tdAbrir.appendChild(aAbrir);
        tr.appendChild(tdindex);
        tr.appendChild(tdNome);
        tr.appendChild(tdData);
        tr.appendChild(tdValor);
        tr.appendChild(tdAtiva);
        tr.appendChild(tdAbrir);
        formVendas.appendChild(tr);
    }
}

const listaVendaParaVenda = () => {
    let conteudo2 = document.getElementById('conteudo2');
    let conteudo3 = document.getElementById('conteudo3');
    conteudo2.classList.toggle('escondeConteudo');
    conteudo3.classList.toggle('escondeConteudo');
}

let idVendaCancela;
let statusVendaCancela;

const carregaVenda = (venda) => {
    let formVendas = document.getElementById('listaVenda3');
    formVendas.innerHTML = '';
    let formulario = document.getElementById('formulario3');
    let idVenda = venda.id;
    for (let index = 0; index < listaVenda.length; index++) {
        if(listaVenda[index]['id_venda'] == idVenda){
            formulario[0].value = listaVenda[index]['nome_cliente'];
            formulario[1].value = 'R$ ' + listaVenda[index]['valor_total'];
            listaItens = '';
            idVendaCancela = idVenda;
            statusVendaCancela = listaVenda[index]['venda_ativa'] == 'N' ? false : true;
            listaItens = listaVenda[index]['itens'];
            for (let index2 = 0; index2 < listaVenda[index]['itens'].length; index2++) {
                let tr = document.createElement('tr');
                let tdCodigo = document.createElement('td');
                tdCodigo.innerText = listaVenda[index]['itens'][index2]['id_produto'];
                let tdNome = document.createElement('td');
                tdNome.innerText = listaVenda[index]['itens'][index2]['nome_produto'];
                let tdQuantidade = document.createElement('td');
                tdQuantidade.innerText = listaVenda[index]['itens'][index2]['quantidade'];
                let tdValor = document.createElement('td');
                tdValor.innerText = 'R$ ' + listaVenda[index]['itens'][index2]['valor_item'];
                tr.appendChild(tdCodigo);
                tr.appendChild(tdNome);
                tr.appendChild(tdQuantidade);
                tr.appendChild(tdValor);
                formVendas.appendChild(tr);
            }
        }
    }
}

const buscaVenda = async (dadosConsulta) => {
    listaVenda = [];
    const res = await fetch(urlGetVendas + dadosConsulta['cpf_cliente'] + '/' + dadosConsulta['data'],{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    });
    return res['listaResposta'];
}

const cancelVenda = async () => {
    const res = await fetch(urlCancelaVenda + idVendaCancela,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    });
    return res['listaResposta'];
}


const receberProduto = async () => {
    let itens = []
    for (let index = 0; index < listaItens.length; index++) {
        const recebimento = {
            'operacao': 'E',
            'quantidade_acao': `${listaItens[index]['quantidade']}`, 
            'id_produto': `${listaItens[index]['id_produto']}`
        }
        itens.push(recebimento);
    }

    const res = await fetch(urlAtualizaProduto,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itens)
    }).then((res) => {
        return res.json();
    })
    return res;
}

const cancelarVenda = () => {
    if(statusVendaCancela){
        let res = confirm('Deseja cancelar esta venda?');
        if(res){
            cancelVenda()
            .then((res) => {
                alert('Essa ação ira retornar os produtos para o estoque!');
                receberProduto()
                .then((res) => {
                    alert('Venda Cancelada com Sucesso');
                    buscaVenda({cpf_cliente: cpf, data: dt})
                    .then((res) => {
                        listaVenda = res;
                        inserirVendas(res);
                    })
                    .catch((err) => {
                        alert('Erro ao realizar consulta' + err);
                    });
                })
                .catch((err) => {
                    alert('Venda Cancelada, porém ocorreu erro ao retornar produtos para o estoque, favor recebe-los manualmente');
                    buscaVenda({cpf_cliente: cpf, data: dt})
                    .then((res) => {
                        listaVenda = res;
                        inserirVendas(res);
                    })
                    .catch((err) => {
                        alert('Erro ao realizar consulta' + err);
                    });
                });
            })
            .catch((err) => {
                alert('Erro ao cancelar Venda');
            })
        }
    }else{
        alert('Venda já cancelada');
    }
}