let canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d'),
    ballRadius = 10,
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
    y = canvas.height - 80,
    dx = 2,
    dy = -2;

let paddleHeight = 15,
    paddleWidth = 80;

let paddleX = (canvas.width - paddleWidth) / 2;

let rowCount = 8,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 20,
    brickPadding = 14,
    topOffset = 30,
    leftOffset = 33,
    score = 0;

let bricks = [];
for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };

    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }

}
//DESENHO DO PADDLE
function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}
//DESENHO DA BOLA
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fa0a0a';
    ctx.fill();
    ctx.closePath();
}
//DESENHO DOS TIJOLOS
function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();

            }
        }

    }
}
//RASTREAMENTO DO PLACAR
function trackScore() {
    ctx.font = 'bold 16px sans-sarif';
    ctx.fillStyle = '#333';
    ctx.fillText('Score : ' + score, 8, 24);
}

function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            let b = bricks[c][r];
            if(b.status === 1){
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = - dy;
                    b.status = 0;
                    score++;
                    if (score === rowCount * columnCount) {
                        alert('You win!');
                        document.location.reload();
                    }    
                }          
            }

        }
    }

}
//LIMPEZA E ATUALIZACAO DO CANVAS
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    }else if (y + dy > canvas.height - ballRadius){
        if ( x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }else{
            alert('Game Over!');
            document.location.reload();
        }
    }

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }
    x += dx;
    y += dy;
}
// Inicialização do jogo (chamando a função init repetidamente)
setInterval(init, 10);
