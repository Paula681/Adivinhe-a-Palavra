const inputs = document.querySelector('.inputs');
const resetBtn = document.querySelector('.resetar-btn');
const dica = document.querySelector('.dica');
const inputDigitacao = document.querySelector('.input-digitacao');
const tentativas = document.querySelector('.tentativas');
const letrasErradas = document.querySelector('.letras-erradas');

let palavra;
let tentativasMaximas = 8;
let erros = [];
let corretas = [];

const removerAcentos = (texto) => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const palavraAleatoria = () => {
    let objetoPalavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    palavra = objetoPalavra.word; 
    tentativasMaximas = 8;

    erros = [];
    corretas = [];
    letrasErradas.innerHTML = erros.join(', '); 

    inputs.innerHTML = ''; 
    for (let i = 0; i < palavra.length; i++) {
        inputs.innerHTML += '<input type="text" disabled>'; 
    }
    tentativas.innerHTML = tentativasMaximas; 
    dica.innerHTML = objetoPalavra.hint; 
};

const iniciarJogo = (evento) => {
    let letra = removerAcentos(evento.target.value.toLowerCase()); 
    inputDigitacao.value = ''; 

    if (letra.match(/^[a-z]$/) && !corretas.includes(letra) && !erros.includes(letra)) { 
        if (removerAcentos(palavra).includes(letra)) { 
            corretas.push(letra); 
            atualizarInputs(); 

            if (corretas.length === [...new Set(removerAcentos(palavra))].length) {
                alert(`Parabéns! Você adivinhou a palavra: ${palavra.toUpperCase()}`);
                palavraAleatoria(); 
            }
        } else { 
            tentativasMaximas--; 
            erros.push(letra); 
            tentativas.innerHTML = tentativasMaximas; 
            letrasErradas.innerHTML = erros.join(', '); 

            if (tentativasMaximas === 0) {
                alert(`Fim de jogo! A palavra era: ${palavra.toUpperCase()}`);
                mostrarPalavraCompleta(); 
            }
        }
    }
};

const atualizarInputs = () => {
    const inputsChildren = inputs.querySelectorAll('input');
    for (let i = 0; i < palavra.length; i++) {
        if (corretas.includes(removerAcentos(palavra)[i])) {
            inputsChildren[i].value = palavra[i]; 
        }
    }
};

const mostrarPalavraCompleta = () => {
    const inputsChildren = inputs.querySelectorAll('input');
    for (let i = 0; i < palavra.length; i++) {
        inputsChildren[i].value = palavra[i]; 
    }
};

// Corrigido: adicionada uma vírgula para separar os parâmetros
resetBtn.addEventListener('click', palavraAleatoria);

document.addEventListener('DOMContentLoaded', () => {
    inputDigitacao.focus();
    palavraAleatoria(); 
});

inputDigitacao.addEventListener('input', iniciarJogo);