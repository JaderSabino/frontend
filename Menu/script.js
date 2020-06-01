let cliente = window.document.getElementById('cliente');
let produto = window.document.getElementById('produto');
let venda = window.document.getElementById('venda');
let estoque = window.document.getElementById('estoque');
let sair = window.document.getElementById('sair');


function load(){

}

const validaSaida = () => {
    let res = confirm('Deseja realmente Sair?');
    if(res){
        window.location.href = '../Login/index.html';
    }
}



function background(elemento){
    var element = parseInt(elemento.id);
    switch(element){
        case 1:
            document.querySelector('#cliente').classList.add('ativo');
            document.querySelector('#produto').classList.remove('ativo');
            document.querySelector('#venda').classList.remove('ativo');
            document.querySelector('#estoque').classList.remove('ativo');
            document.querySelector('#sair').classList.remove('ativo');
            break;
        case 2:
            document.querySelector('#produto').classList.add('ativo');
            document.querySelector('#cliente').classList.remove('ativo');
            document.querySelector('#venda').classList.remove('ativo');
            document.querySelector('#estoque').classList.remove('ativo');
            document.querySelector('#sair').classList.remove('ativo');
            break;
        case 3:
            document.querySelector('#venda').classList.add('ativo');
            document.querySelector('#produto').classList.remove('ativo');
            document.querySelector('#cliente').classList.remove('ativo');
            document.querySelector('#estoque').classList.remove('ativo');
            document.querySelector('#sair').classList.remove('ativo');
            break;
        case 4:
            document.querySelector('#estoque').classList.add('ativo');
            document.querySelector('#produto').classList.remove('ativo');
            document.querySelector('#venda').classList.remove('ativo');
            document.querySelector('#cliente').classList.remove('ativo');
            document.querySelector('#sair').classList.remove('ativo');
            break;
        case 5:
            document.querySelector('#sair').classList.add('ativo');
            document.querySelector('#produto').classList.remove('ativo');
            document.querySelector('#venda').classList.remove('ativo');
            document.querySelector('#estoque').classList.remove('ativo');
            document.querySelector('#cliente').classList.remove('ativo');
            break;
    }
}