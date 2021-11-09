let order = []; // ordem
let clickedOrder = []; //ordem dos cliques
let score = 0; // pontuação
let level = 1; // nível
let lose = false; // perdeu

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const nivel = document.getElementById('nivel');
const pontos = document.getElementById('pontos');

// cria ordem aleatoria de cores
let shuffleOrder = () => {
    //variável para guardar o número a cada rodada
    let colorOrder = Math.floor(Math.random() * 4);
    //atribuir o valor na próxima posição do array order
    order[order.length] = colorOrder;
    //clique continua vazio
    clickedOrder = [];

    //acender o número sorteado
    for (let i in order) {

        let elementColor = createColorElement(order[i]);
        lightColor(order[i], elementColor, Number(i) + 1);
    }
}

//acender a próxima cor
let lightColor = (color, element, number) => {
    number = number * 700;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 450);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 350);
}

// comparar se a order das cores clicadas é a mesma order das cores gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            lose = true;
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length && lose == false) {
        score++;
        scoreTela(score);
        levelTela(score);
        setTimeout(() => {
            nextlevel();
        }, 2000);
    }
}

// função para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');


    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 450);
}

// função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// função para próximo nível do jogo
let nextlevel = () => {
    score++;
    shuffleOrder();
}

// função para game over
let gameOver = () => {
    Swal.fire({
        type: 'error',
        title: 'Você perdeu o jogo!',
        text: `Sua pontuação: ${score}!\n\nClique em Jogar para iniciar um novo jogo!`,
       
    });
    order = [];
    clickedOrder = [];
}

// função de inicio do jogo
let playGame = () => {
    event.preventDefault();

    score = 0;
    lose = false;

    scoreTela(score);
    levelTela(score);

    Swal.fire({
        title: "Bem vindo ao Genius!",
        html: 'Iniciando novo jogo em <strong></strong> segundos.',
        type: "info",
        showConfirmButton: false,
        timer: 3000,
        onOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                Swal.getContent().querySelector('strong')
                    .textContent = Math.ceil(Swal.getTimerLeft() / 1000)
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    });
    setTimeout(() => {
        nextlevel();
    }, 4000);
}

//atualiza pontuação na tela
let scoreTela = (score) => {
    pontos.innerHTML = '0' + score;
}

//atualiza pontuação na tela
let levelTela = (score) => {
    level = ((score / 5) >= 1) ? (score / 5) + 1 : 1;
    nivel.innerHTML = '0' + Math.floor(level);
}

// evento de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
