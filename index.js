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


function drawObject(obj) {
	let z_buffer = [];
	for (let face of obj) {
		let diff = [], translated = [], disp = [], face_distances = [];
		let flag = false;

		for (let v of face) {
			let x_diff = v[0] - x;
			let y_diff = -v[1] - y;
			let z_diff = -v[2] - z;
			diff.push([x_diff, y_diff, z_diff]);
		}

		for (let v of diff) {
			let translatedX = v[0] * Math.cos(-angle) + v[2] * Math.sin(-angle);
			let translatedZ = v[2] * Math.cos(-angle) - v[0] * Math.sin(-angle);
			
			if (translatedZ < 0) {
				flag = true;
				continue;
			};

			translated.push([translatedX, translatedZ]);
		}

		if (flag) continue;
		
		for (let d in translated) {
			let dispX = (translated[d][0] / translated[d][1]) * screenDistance + centerOfScreenX;
			let dispY = (diff[d][1] / translated[d][1]) * screenDistance + centerOfScreenY;
			let dist = translated[d][1];

			face_distances.push(dist);
			disp.push([dispX, dispY]);
		}

		let average_distance = face_distances.reduce((n, acc) => n + acc) / face_distances.length;

		z_buffer.push([disp, average_distance]);
	}

	z_buffer = z_buffer.sort(function(a, b) {
		return b[1] - a[1];
	})

	ctx.fillStyle = 'black';
	for (let faces of z_buffer) {
		let vertexes = faces[0];
		
		ctx.beginPath();
		ctx.moveTo(vertexes[0][0], vertexes[0][1]);

		for (let num = 1; num < vertexes.length; num++) {
			ctx.lineTo(vertexes[num][0], vertexes[num][1]);
		}

		ctx.closePath();
		ctx.stroke();
	}
	
}

function clear() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
	clear()
	drawObject(obj);
}

function move() {
	x += vector[0];
	z += vector[2];
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
