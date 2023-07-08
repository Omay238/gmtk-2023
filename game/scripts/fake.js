let player, playerImage;

let levels = [
	[
		"0000000001",
		"0000000001",
		"0000000001",
		"0000000101",
		"0000001101",
		"0000011101",
		"0000111101",
		"0000000001",
		"0010000001",
		"1111111111"
	]
];
let level = 0;

class Player{
	constructor(x, y, w, h, img){
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.size = createVector(w, h);
		this.img = img;
	}

	render(){
		image(this.img, this.pos.x - this.size.x / 2, this.pos.y, this.size.x * 2, this.size.y);
	}

	update(world){

	}
}

function preload(){
	playerImage = loadImage("./assets/image/player.png");
}

function setup(){
	let scl = min(innerWidth, innerHeight);
	createCanvas(scl, scl);
	player = new Player(0, 0, 1, 1, playerImage);
}

function draw(){
	background(220);
	let s = floor(min(width / levels[level][0].length, height / levels[level].length));
	player.size = createVector(s, s * 2);
	for(let i = 0; i < levels[level].length; i++){
		for(let j = 0; j < levels[level][i].length; j++){
			if(levels[level][i].charAt(j) == "1"){
				//noStroke();
				fill(128);
				rect(j * s, i * s, s, s);
			}
		}
	}
	player.render();

	player.update(levels[level]);
}