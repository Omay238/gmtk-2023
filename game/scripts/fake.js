let { Engine, Bodies, Composite, Body, Vector, Detector, Pairs } = Matter;

console.log = (content) => {
	let doc = window.top.document;
	let create = (content) => {
		let container = doc.createElement("div");
		let cont = doc.createElement("p");
		let num = doc.createElement("p");
		cont.innerText = content;
		container.appendChild(num);
		container.appendChild(cont);
		container.classList.add("log");
		doc.querySelector("#console").appendChild(container);
	};
	if(doc.querySelector("#console").lastChild !== null){
		if(doc.querySelector("#console").lastChild.lastChild.innerText === content.toString()){
			if(doc.querySelector("#console").lastChild.firstChild.innerText === ''){
				doc.querySelector("#console").lastChild.firstChild.innerText = "2";
			}else{
				doc.querySelector("#console").lastChild.firstChild.innerText = parseInt(doc.querySelector("#console").lastChild.firstChild.innerText) + 1;
			}
		}else{
			create(content);
		}
	}else{
		create(content);
	}
	doc.querySelector("#console").scrollTo(0, doc.querySelector("#console").scrollHeight);
};

console.warn = (content) => {
	let doc = window.top.document;
	let create = (content) => {
		let container = doc.createElement("div");
		let cont = doc.createElement("p");
		let num = doc.createElement("p");
		cont.innerText = content;
		container.appendChild(num);
		container.appendChild(cont);
		container.classList.add("warn");
		doc.querySelector("#console").appendChild(container);
	};
	if(doc.querySelector("#console").lastChild !== null){
		if(doc.querySelector("#console").lastChild.lastChild.innerText === content.toString()){
			if(doc.querySelector("#console").lastChild.firstChild.innerText === ''){
				doc.querySelector("#console").lastChild.firstChild.innerText = "2";
			}else{
				doc.querySelector("#console").lastChild.firstChild.innerText = parseInt(doc.querySelector("#console").lastChild.firstChild.innerText) + 1;
			}
		}else{
			create(content);
		}
	}else{
		create(content);
	}
	doc.querySelector("#console").scrollTo(0, doc.querySelector("#console").scrollHeight);
};

console.error = (content) => {
	let doc = window.top.document;
	let create = (content) => {
		let container = doc.createElement("div");
		let cont = doc.createElement("p");
		let num = doc.createElement("p");
		cont.innerText = content;
		container.appendChild(num);
		container.appendChild(cont);
		container.classList.add("error");
		doc.querySelector("#console").appendChild(container);
	};
	if(doc.querySelector("#console").lastChild !== null){
		if(doc.querySelector("#console").lastChild.lastChild.innerText === content.toString()){
			if(doc.querySelector("#console").lastChild.firstChild.innerText === ''){
				doc.querySelector("#console").lastChild.firstChild.innerText = "2";
			}else{
				doc.querySelector("#console").lastChild.firstChild.innerText = parseInt(doc.querySelector("#console").lastChild.firstChild.innerText) + 1;
			}
		}else{
			create(content);
		}
	}else{
		create(content);
	}
};

// create an engine
let engine = Engine.create();

let player, playerImage;

let keys = [];

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
		this.body = Bodies.rectangle(x, y, w - 10, h - 10);
		this.body.friction = 0;
		this.size = createVector(w - 10, h - 10);
		this.img = img;
		this.grounded = false;
		this.groundedFrames = 0;
	}

	render(){
		//console.log(this.body);
		image(this.img, this.body.position.x, this.body.position.y, this.size.x, this.size.y);
		//ellipse(this.pos.x, this.pos.y, 10, 10);
	}

	update(){
		Body.setAngularSpeed(this.body, 0);
		if(keys[37]){
			Body.applyForce(this.body, this.body.position, Matter.Vector.create(-0.008, 0));
		}
		if(keys[39]){
			Body.applyForce(this.body, this.body.position, Matter.Vector.create(0.008, 0));
		}
		this.grounded = false;
		let detector = Detector.create({bodies: [this.body].concat(groundBodies)});
		let collisions = Detector.collisions(detector);
		for(let pair of collisions){
			if(pair.bodyA === this.body || pair.bodyB === this.body){
				let otherBody = pair.bodyA === this.body ? pair.bodyB : pair.bodyA;

				let thisBottom = this.body.bounds.max.y;
				let otherTop = otherBody.bounds.min.y;

				if(thisBottom >= otherTop - 1 && thisBottom <= otherTop + 1){
					this.grounded = true;
					this.groundedFrames++;
					break;
				}
			}
		}

		if(this.grounded === false){
			this.groundedFrames = 0;
		}

		console.log(this.grounded);

		if(keys[38] && this.groundedFrames > 2){
			Body.applyForce(this.body, this.body.position, Matter.Vector.create(0, -0.1));
		}

		let velocityMod = Body.getVelocity(this.body);
		let velocityUpdated = createVector(velocityMod.x * 0.9, velocityMod.y);
		Body.setVelocity(this.body, Vector.create(velocityUpdated.x, velocityUpdated.y));
	}
}

function preload(){
	playerImage = loadImage("./assets/image/player.png");
}

let s;

let groundBodies = [];

function setup(){
	let scl = min(innerWidth, innerHeight);
	createCanvas(scl, scl);
	s = floor(min(width / levels[level][0].length, height / levels[level].length));
	player = new Player(s, s, s, s * 2, playerImage);
	loadLevel(0, s);
	imageMode(CENTER);
	rectMode(CENTER);
}

function draw(){
	background(220);

	for(let i = 0; i < levels[level].length; i++){
		for(let j = 0; j < levels[level][i].length; j++){
			if(levels[level][i].charAt(j) == "1"){
				noStroke();
				fill(128);
				rect(j * s + s / 2, i * s + s / 2, s, s);
			}
		}
	}
	player.render();

	player.update();

	Engine.update(engine);
}

function loadLevel(level, s){
	let bodies = [];
	for(let i = 0; i < levels[level].length; i++){
		for(let j = 0; j < levels[level][i].length; j++){
			if(levels[level][i].charAt(j) == "1"){
				bodies.push(Bodies.rectangle(j * s + s / 2, i * s + s / 2, s, s, {isStatic: true}));
			}
		}
	}

	groundBodies = bodies;

	bodies.push(Bodies.rectangle(width / 2, -50, width, 50, {isStatic: true}));
	bodies.push(Bodies.rectangle(width / 2, height + 50, width, 50, {isStatic: true}));
	bodies.push(Bodies.rectangle(-50, height / 2, 50, height, {isStatic: true}));
	bodies.push(Bodies.rectangle(width + 50, height / 2, 50, height, {isStatic: true}));

	bodies.push(player.body);

	Composite.add(engine.world, bodies);
}

function keyPressed(){
	keys[keyCode] = true;
}

function keyReleased(){
	keys[keyCode] = false;
}