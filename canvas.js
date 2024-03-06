window.onload = function(){
    montarFigura();
};

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var numEstadosInput = document.getElementById("numEstados");
    var transicoesInput = document.getElementById("transicoesInput");
    var desenharBtn = document.getElementById("desenharBtn");
    
    numEstadosInput.addEventListener("change", function() {
        var numEstados = parseInt(numEstadosInput.value);
        if (numEstados < 2) {
            alert("Número de estados deve ser pelo menos 2.");
            return;
        }
        transicoesInput.innerHTML = "";
        for (var i = 0; i < numEstados; i++) {
            for (var j = 0; j < numEstados; j++) {
                if (i !== j) {
                    var label = document.createElement("label");
                    label.textContent = " Transição de Q" + i + " para Q" + j + ": ";
                    var input = document.createElement("input");
                    input.type = "text";
                    input.size = 3;
                    input.maxLength = 1;
                    transicoesInput.appendChild(label);
                    transicoesInput.appendChild(input);
                    transicoesInput.appendChild(document.createElement("br")); //quebra a linha sempre que fizer um
                }
            }
        }
    });
});

function montarFigura() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000033";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const raio = 30;
    const qtdEstados = 6;
    const margemInterna = 50;

    const posicoes = [];

    for (let i = 0; i < qtdEstados; i++) {
        let {x, y} = getRandomPosition(canvas, raio, posicoes, margemInterna);
        posicoes.push({x, y});
    }

    const coresSetas = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#FFA500'];

    // Desenhar
    for (let i = 0; i < qtdEstados; i++) {
        const {x, y} = posicoes[i];

        ctx.beginPath();
        ctx.arc(x + raio, y + raio, raio, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Q' + i, x + raio, y + raio);

     
        const {x: proximoX, y: proximoY} = posicoes[1];

        const {x: bolinhaX, y: bolinhaY} = posicoes[0];

        const {x: proximoX2, y: proximoY2} = posicoes[2];

        desenharSeta(ctx, bolinhaX + raio, bolinhaY + raio, proximoX + raio, proximoY + raio, coresSetas[i]); //Q0 para Q1
        desenharSeta(ctx, bolinhaX + raio, bolinhaY + raio, proximoX2 + raio, proximoY2 + raio, coresSetas[i]); //Q0 para Q2
        desenharSeta(ctx, proximoX2 + raio, proximoY2 + raio, bolinhaX + raio, bolinhaY + raio, coresSetas[2]); //Q2 para Q2

        //desenharSeta(ctx, bolinhaX2 + raio, bolinhaY2 + raio, proximoX + raio, proximoY + raio, coresSetas[i]);
    }
}

function desenharSeta(ctx, x1, y1, x2, y2, cor) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    const ang = Math.atan2(y2 - y1, x2 - x1);
    const tamanho = 10;

    ctx.lineTo(x2 - tamanho * Math.cos(ang - Math.PI / 6), y2 - tamanho * Math.sin(ang - Math.PI / 6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - tamanho * Math.cos(ang + Math.PI / 6), y2 - tamanho * Math.sin(ang + Math.PI / 6));
    ctx.strokeStyle = cor; 
    ctx.lineWidth = 5; 
    ctx.stroke();
    ctx.closePath();
}

function getRandomPosition(canvas, raio, posicoes, margemInterna) {

    //Função de distribuição das bolinhas para que elas fiquem o máximo separadas possivel

    const larguraUtilizavel = canvas.width - margemInterna * 2;
    const alturaUtilizavel = canvas.height - margemInterna * 2;

    let x, y;

    do {
        x = margemInterna + Math.random() * (larguraUtilizavel - raio * 2) + raio;
        y = margemInterna + Math.random() * (alturaUtilizavel - raio * 2) + raio;
    } while (posicoes.some(pos => Math.hypot(pos.x - x, pos.y - y) < raio * 4) || 
             posicoes.some(pos => Math.hypot(pos.x - x, pos.y - y) < raio * 4));
    return {x, y};
}
