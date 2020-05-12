let url = 'http://127.0.0.1:3000/Login/';

const carregarApi = async () => {
    let cpf = document.getElementById('cpf');
    let senha = document.getElementById('senha');

    if(cpf.value == '' || senha.value == ''){

        alert('Favor inserir CPF e SENHA');

    }else{

        const { codigo } = await fetch(url + cpf.value + '/' + senha.value,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        });

        if(codigo == 2){
            alert('Usuário não cadastrado');
        }else{
            if(codigo == 3){
                alert('Usuário ou senha incorreto');
            }else{
                window.location.href = '../Menu/index.html';
            }
        }
    }
}
