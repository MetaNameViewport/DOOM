/** @type {WebGLRenderingContext} */

let canvas = document.getElementById('canvas');
let gl = canvas.getContext('webgl');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

gl.viewport(0, 0, window.innerWidth, window.innerHeight);

let vertexShaderSource = document.querySelector("#vertexShader").text;
let fragmentShaderSource = document.querySelector("#fragmentShader").text;
 
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
let program = createProgram(gl, vertexShader, fragmentShader);

let aPosition = gl.getAttribLocation(program, "a_position");
let uColor = gl.getUniformLocation(program, 'u_color')

let positionBuffer = gl.createBuffer();

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
	let render_vertexes = translate(obj);

	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

	let uResolution = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height);
	gl.uniform4f(uColor, Math.random()/2, Math.random()/2, Math.random()/2, 1);


    gl.enableVertexAttribArray(aPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(render_vertexes), gl.STATIC_DRAW);

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, render_vertexes.length);
	
}

function move() {
	x += vector[0];
	z += vector[2];
}

setInterval( function() {
	move();
	drawObject(obj);
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
