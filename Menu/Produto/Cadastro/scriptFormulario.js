let url = 'http://127.0.0.1:3000/produto/';

const salvar = () => {
    getFormulario();
}

const cancelar = () => {
    let formulario = document.querySelector('#formulario');
    limpaFormulario(formulario);
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
        return inserirProduto(converteJson(formulario));
    }else{
        alert('Favor preencher todos os campos');
    }
}

const validaFormulario = (form) => {
    for (let index = 0; index < form.length-2; index++) {
        if(form[index].value == ''){
            return false;
        }
    }
    return true;
}

const converteJson = (form) => {
    if(form[3].checked){
        return {
            nome_produto: form[0].value,
            preco: form[1].value.replace(",", "."),
            quantidade: form[2].value,
            unidade_medida: form[3].value,
            produto_ativo: 'S'
        }
    }else{
        return {
            nome_produto: form[0].value,
            preco: form[1].value.replace(",", "."),
            quantidade: form[2].value,
            unidade_medida: form[4].value,
            produto_ativo: 'S'
        }
    }
}

const inserirProduto = async (dadosCliente) => {
    console.log(dadosCliente);
    const res = await fetch(url,{
        method: 'POST',
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