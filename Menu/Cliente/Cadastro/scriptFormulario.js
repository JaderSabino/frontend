let url = 'http://127.0.0.1:3000/cliente/';

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
        nome_cliente: form[1].value,
        telefone: form[2].value,
        endereco: form[3].value
    }
}

const inserirCliente = async (dadosCliente) => {
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