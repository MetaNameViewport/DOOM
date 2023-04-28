let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl = canvas.getContext('webgl');

gl.viewport(0, 0, window.innerWidth, window.innerHeight);

let vertex_shader = document.querySelector("#vertexShader").text;
let fragment_shader = document.querySelector("#fragmentShader").text;

let programInfo = twgl.createProgramInfo(gl, [vertex_shader, fragment_shader]);

let vertexBufferInfo = [];
arrays.forEach(model => vertexBufferInfo.push(twgl.createBufferInfoFromArrays(gl, model)));

let cameraMatrix = mat4.create();
let projectionMatrix = mat4.create();
let viewMatrix = mat4.create();

let viewProjection = mat4.create();
let vertexMatrix = mat4.create();
let screenTranslationMatrix = mat4.create();

let cameraMatrixPosition = vec3.create();
let tempStraightDirection = vec3.create();
let tempSideDirection = vec3.create();

mat4.perspective(projectionMatrix, FOV, ASPECT, NearPlane, FarPlane);


function render() {
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(programInfo.program);

    vector = [0, 0, 0];

    if( key.w ) vector[0] = 0.1;
    if( key.a ) vector[2] = -0.1;
    if( key.s ) vector[0] = -0.1;
    if( key.d ) vector[2] = 0.1;

    if (key[' ']) cameraMatrixPosition[1] += 0.05;
    if (key['Control']) cameraMatrixPosition[1] -= 0.05;

    tempStraightDirection[0] = cameraMatrix[8];
	tempStraightDirection[1] = 0;
    tempStraightDirection[2] = cameraMatrix[10];
    
    tempSideDirection[0] = cameraMatrix[0];
    tempSideDirection[2] = cameraMatrix[2];

    vec3.scaleAndAdd(cameraMatrixPosition, cameraMatrixPosition, tempStraightDirection, -vector[0]);
    vec3.scaleAndAdd(cameraMatrixPosition, cameraMatrixPosition, tempSideDirection, vector[2]);

    cameraMatrix = mat4.fromTranslation(cameraMatrix, cameraMatrixPosition);
    cameraMatrix = mat4.rotateY(cameraMatrix, cameraMatrix, angle[0]);
    cameraMatrix = mat4.rotateX(cameraMatrix, cameraMatrix, angle[1]);

    mat4.invert(viewMatrix, cameraMatrix);
    mat4.multiply(viewProjection, projectionMatrix, viewMatrix);
    mat4.multiply(screenTranslationMatrix, viewProjection, vertexMatrix);
    
    for (let model of vertexBufferInfo) {
        twgl.setBuffersAndAttributes(gl, programInfo, model);
        twgl.setUniforms(programInfo, {
            u_screenTranslation: screenTranslationMatrix,
            u_color: [0, 0.5, 0, 1.0],
        });

        twgl.drawBufferInfo(gl, model, gl.LINE_STRIP);
    }      
}

setInterval(render, 1000 / FPS);

window.addEventListener('keydown', (e) => key[e.key] = true);
window.addEventListener('keyup', (e) => key[e.key] = false);

window.addEventListener('mousemove', (e) => {
    angle[0] += -e.movementX / 200;
    angle[1] += -e.movementY / 200;

    if (angle[1] > 1.5) angle[1] = 1.5;
    if (angle[1] < -1.5) angle[1] = -1.5;
});
