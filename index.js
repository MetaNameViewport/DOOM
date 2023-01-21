let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = canvas.width / 16 * 9;

let x = 400;
let y = 0;
let z = 300;
let speed = 20;
let vector = [0, 0, 0];

let screenDistance = 400;
let centerOfScreenX = canvas.width / 2;
let centerOfScreenY = canvas.height / 2;

let angle = 0;
let fps = 60;


function drawObject(obj, ribs) {
	let diff = [], translated = [], disp = [];
	let z_buffer = [];

	for (let v of obj) {
		let x_diff = v[0] - x;
		let y_diff = v[1] - y;
		let z_diff = v[2] - z;
		diff.push([x_diff, y_diff, z_diff]);
	}

	for (let i of diff) {
		let translatedX = i[0] * Math.cos(-angle) + i[2] * Math.sin(-angle);
		let translatedZ = i[2] * Math.cos(-angle) - i[0] * Math.sin(-angle);
		if (translatedZ < 0) return;
		translated.push([translatedX, translatedZ]);
	}

	for (let d in translated) {
		let dispX = (translated[d][0] / translated[d][1]) * screenDistance + centerOfScreenX;
		let dispY = centerOfScreenY - (diff[d][1] / translated[d][1]) * screenDistance;
		let dist = translated[d][1];
		disp.push([dispX, dispY, dist]);
	}

	for (let hz of ribs) {
		let local = [];
		local.push(disp[hz[0][0]]);

		for (let num = 1; num < hz[0].length; num++) {
			local.push(disp[hz[0][num]], hz[1]);
		}

		z_buffer.push(local);
	}

	z_buffer = z_buffer.sort(function(a, b) {
		return b[0][2] - a[0][2];
	})

	for (let faces of z_buffer) {
		ctx.fillStyle = faces[2];
		ctx.beginPath();
		ctx.moveTo(faces[0][0], faces[0][1]);

		for (let num = 1; num < faces.length; num++) {
			ctx.lineTo(faces[num][0], faces[num][1]);
		}

		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
}

function clear() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
	clear()
	drawObject(obj, ribs);
}

function move() {
	x += vector[0]
	z += vector[2]
}

setInterval( function() {
	move();
	draw();
}, 1000 / fps);

document.addEventListener("keydown", function(e) {
    switch(e.key) {
		case 'w':
			vector[0] = speed * Math.sin(angle);
        	vector[2] = speed * Math.cos(angle);
			break;

		case 's':
        	vector[0] = -speed * Math.sin(angle);
        	vector[2] = -speed * Math.cos(angle);
			break;

		case 'a':
        	vector[0] = -speed * Math.cos(angle);
        	vector[2] = speed * Math.sin(angle);
			break;

		case 'd':
        	vector[0] = speed * Math.cos(angle);
        	vector[2] = -speed * Math.sin(angle);
			break;
	}
});

document.addEventListener("keyup", function(e) {
    if (e.key == 'w' || e.key == 's' || e.key == 'a' || e.key == 'd') vector = [0, 0, 0];
});

document.addEventListener('mousemove', function(e) {
	angle += e.movementX / 180;
})
