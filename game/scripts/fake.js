let levels = [
	[
		"0000000002",
		"0000000001",
		"0000000001",
		"0000000201",
		"0000002101",
		"0000021101",
		"0000211101",
		"0000000000",
		"0020000000",
		"2212222222"
	],
	//this is an old level. i should fix it (2's when 0 above, otherwise a 1)
	[
		"0000000001",
		"0000000001",
		"1111111101",
		"0000000001",
		"0000000001",
		"0111111111",
		"0000000001",
		"0000000001",
		"1111111100",
		"0000000000"
	],
	//its bad to screw with the keyboard when coding
	//it looks like all the numbers to remove are stuff that isnt 0 1 or 2
	//just gotta remove those
	[
		"000003400000",
		"000006400000",
		"000460000022",
		"00006000001",
		"00000003201",
		"000000005401",
		"000460002001",
		"000640000001",
		"006400020001",
		"00400000001"
	],
	[
		"0000002000",
		"0000001000",
		"0000200022",
		"0000100001",
		"2000100201",
		"0000100001",
		"0000100001",
		"0002102001",
		"0000100001",
		"0000100001",
	],

];

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
		image(this.img, this.body.position.x, this.body.position.y, this.size.x, this.size.y);
	}

	update(){
		//im gonna have to uncomment the rest of this area at somepoint
		//good thing i can use ctrl+/ on windows and linux
		//or cmd+/ on mac
		//developers note: (seamless hint, i know)
// 		Body.setAngularSpeed(this.body, 0);
// 		if(keys[37]){
// 			Body.applyForce(this.body, this.body.position, Matter.Vector.create(-0.008, 0));
// 		}
// 		if(keys[39]){
// 			Body.applyForce(this.body, this.body.position, Matter.Vector.create(0.008, 0));
// 		}
// 		this.grounded = false;
// 		let detector = Detector.create({bodies: [this.body].concat(groundBodies)});
// 		let collisions = Detector.collisions(detector);
// 		for(let pair of collisions){
// 			if(pair.bodyA === this.body || pair.bodyB === this.body){
// 				let otherBody = pair.bodyA === this.body ? pair.bodyB : pair.bodyA;

// 				let thisBottom = this.body.bounds.max.y;
// 				let otherTop = otherBody.bounds.min.y;

// 				if(thisBottom >= otherTop - 1 && thisBottom <= otherTop + 1){
// 					this.grounded = true;
// 					this.groundedFrames++;
// 					break;
// 				}
// 			}
// 		}

// 		if(this.grounded === false){
// 			this.groundedFrames = 0;
// 		}

// 		moving = true;

// 		if(keys[38] && this.groundedFrames > 2){
// 			Body.applyForce(this.body, this.body.position, Matter.Vector.create(0, -0.14));
//          playSound(jump);
// 		}

// 		let velocityMod = Body.getVelocity(this.body);
// 		let velocityUpdated = createVector(velocityMod.x * 0.9, velocityMod.y);
// 		Body.setVelocity(this.body, Vector.create(velocityUpdated.x, velocityUpdated.y));

// 		if(this.body.position.x > width && level < levels.length - 1){
// 			level++;
// 			loadLevel();
//          playSound(complete);
// 		}else if(this.body.position.x > width){
// 			won = true;
// 		}
	}
}

function preload(){
	//i cant remember the filename... maybe something like player.png
	playerImage = loadImage("./assets/image/err.png");
	//ground tiles are numerically ordered i think
	tiles.push(loadImage("./assets/image/1.png"));
	tiles.push(loadImage("./assets/image/1.png"));

	jump = loadSound("./assets/effect/jump.wav");
	complete = loadSound("./assets/effect/complete.wav");
}

function draw(){
	background(220);

	for(let i = 0; i < levels[level].length; i++){
		for(let j = 0; j < levels[level][i].length; j++){
			if(levels[level][i].charAt(j) !== "0"){
				noStroke();
				fill(128);
				image(tiles[parseInt(levels[level][i].charAt(j)) - 1], j * s + s / 2, i * s + s / 2, s, s);
			}
		}
	}
	player.render();

	player.update();

	Engine.update(engine);

	ithinkthisisimportant();
}

function loadLevel(){
	Composite.clear(engine.world);

	s = floor(min(width / levels[level][0].length, height / levels[level].length));
	player = new Player(s, s, s, s * 2, playerImage);

	let bodies = [];
	for(let i = 0; i < levels[level].length; i++){
		for(let j = 0; j < levels[level][i].length; j++){
			if(levels[level][i].charAt(j) !== "0"){
				bodies.push(Bodies.rectangle(j * s + s / 2, i * s + s / 2, s, s, {isStatic: true}));
			}
		}
	}

	groundBodies = bodies;

	bodies.push(Bodies.rectangle(width / 2, -50, width, 100, {isStatic: true}));
	bodies.push(Bodies.rectangle(width / 2, height + 50, width, 100, {isStatic: true}));
	bodies.push(Bodies.rectangle(-50, height / 2, 100, height, {isStatic: true}));

	bodies.push(player.body);

	Composite.add(engine.world, bodies);
}