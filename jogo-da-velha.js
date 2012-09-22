//var
var tabuleiro;

//constantes
const imgBola = new Image();
imgBola.src = 'BOLA-verde.jpg';
const imgX = new Image();
imgX.src = 'X-vermelho.jpg';

//classe Ponto
var Ponto = Class.create();
Ponto.prototype = {
	initialize: function(x, y) {
		this.setX(x);
		this.setY(y);
	},
	setX: function(x) {
		this.x = x;
	},
	setY: function(y) {
		this.y = y;
	}
}

//classe Tabuleiro
var Tabuleiro = Class.create();
Tabuleiro.prototype = {
	initialize: function(canvasId) {
		var canvas = document.getElementById(canvasId);
		this.setCanvas(canvas);
		this.canvas.width = 300;
		this.canvas.height= 300;
		this.setContext(canvas.getContext('2d'));
		this.setPosicoes(new Array(10));
		this.setJogadorAtivo(true);
		this.desenhar();
		Event.observe(canvasId, 'click', function(event) {
			return main(tabuleiro, event);
		});
	},
	setCanvas: function(canvas) {
		this.canvas = canvas;
	},
	setContext: function(context) {
		this.context = context;
	},
	setPosicoes: function(posicoes) {
		this.posicoes = posicoes;
	},
	setJogadorAtivo: function(jogadorAtivo) {
		this.jogadorAtivo = jogadorAtivo;
	},
	desenhar: function() {
		this.context.fillRect(100,10,5,300);
		this.context.fillRect(200,10,5,300);
		this.context.fillRect(10,100,300,5);
		this.context.fillRect(10,200,300,5);
	},
	venceu: function() {
		if (this.igual([1,2,3])) {
			return true;
		} else if (this.igual([4,5,6])) {
			return true;
		} else if (this.igual([7,8,9])) {
			return true;
		} else if (this.igual([1,4,7])) {
			return true;
		} else if (this.igual([2,5,8])) {
			return true;
		} else if (this.igual([3,6,9])) {
			return true;
		} else if (this.igual([1,5,9])) {
			return true;
		} else if (this.igual([3,5,7])) {
			return true;
		} else {
			return false;
		}
	},
	igual: function(array) {
		var retorno = true;
		for (i=0;i<array.length;i++) {
			if (this.posicoes[array[i]] != this.jogadorAtivo) {
				retorno = false;
				break;
			}
		}
		return retorno;
	},
	posicaoCursor: function(e) {
		var x;
		var y;
		if (e.pageX || e.pageY) {
		  x = e.pageX;
		  y = e.pageY;
		} else {
		  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x -= this.canvas.offsetLeft;
		y -= this.canvas.offsetTop;
		return new Ponto(x,y);
	},
	/*
	1 de (0,0)  	at� (99,99)		; 2 de (106,0) 	at� (199,99)	; 3 de (206,0)    	at� (299,99)
	4 de (0,106) at� (99,199)	; 5 de (106,199) 	at� (199,199)	; 6 de (206,199)	at� (299,199)
	7 de (0,206) at� (99,299)	; 8 de (106,206)  	at� (199,299)	; 9 de (206,206)	at� (299,299)	
	*/
	obterQuadradoSelecionado: function(ponto) {
		if (ponto.x >=0 && ponto.x <=99) { //1, 4 ou 7
			if (ponto.y >=0 && ponto.y <= 99) {
				return 1;
			} else if (ponto.y >= 106 && ponto.y <= 199) {
				return 4;
			} else if (ponto.y >= 206 && ponto.y <= 299) {
				return 7;
			} 
		} else if (ponto.x >=106 && ponto.x <=199) { //2, 5 ou 8
			if (ponto.y >=0 && ponto.y <= 99) {
				return 2;
			} else if (ponto.y >= 106 && ponto.y <= 199) {
				return 5;
			} else if (ponto.y >= 206 && ponto.y <= 299) {
				return 8;
			} 
		} else if (ponto.x >=206 && ponto.x <=299) { //3, 6 ou 9
			if (ponto.y >=0 && ponto.y <= 99) {
				return 3;
			} else if (ponto.y >= 106 && ponto.y <= 199) {
				return 6;
			} else if (ponto.y >= 206 && ponto.y <= 299) {
				return 9;
			} 
		} else {
			return null;
		}
	},
	marcarBola: function(context, ponto) {
		context.drawImage(imgBola, ponto.x, ponto.y);
	},
	marcarX: function(context, ponto) {
		context.drawImage(imgX, ponto.x, ponto.y);
	},
	marcarJogada: function(number){
		this.posicoes[number] = this.jogadorAtivo;
		var marcar = this.jogadorAtivo ? this.marcarX : this.marcarBola;
		if (number == 1) {
			marcar(this.context, new Ponto(30, 30));
		} else if (number == 2) {
			marcar(this.context, new Ponto(130, 30));
		} else if (number == 3) {
			marcar(this.context, new Ponto(230, 30));
		} else if (number == 4) {
			marcar(this.context, new Ponto(30, 130));
		} else if (number == 5) {
			marcar(this.context, new Ponto(130, 130));
		} else if (number == 6) {
			marcar(this.context, new Ponto(230, 130));
		} else if (number == 7) {
			marcar(this.context, new Ponto(30, 230));
		} else if (number == 8) {
			marcar(this.context, new Ponto(130, 230));
		} else if (number == 9) {
			marcar(this.context, new Ponto(230, 230));
		}
	}
}

//metodo com a regra do jogo
function main(tabuleiro, event) {
	var quadrado = tabuleiro.obterQuadradoSelecionado(tabuleiro.posicaoCursor(event));
	if (tabuleiro.posicoes[quadrado] == null) {
		tabuleiro.marcarJogada(quadrado);
		if (tabuleiro.venceu(tabuleiro.jogadorAtivo)) {
			alert('Jogador ' + (tabuleiro.jogadorAtivo ? 'xis vermelho' : 'bola verde') + ' venceu!');
			tabuleiro.setPosicoes(null);
		} else {
			tabuleiro.setJogadorAtivo(!tabuleiro.jogadorAtivo);
		}
	}
}