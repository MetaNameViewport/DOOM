let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl = canvas.getContext('webgl');

gl.viewport(0, 0, window.innerWidth, window.innerHeight);

let vertex_shader = document.querySelector("#vertexShader").text;
let fragment_shader = document.querySelector("#fragmentShader").text;

let programInfo = twgl.createProgramInfo(gl, [vertex_shader, fragment_shader]);

let vertexBufferInfo = [];

for (let model of arrays) {
    vertexBufferInfo.push(twgl.createBufferInfoFromArrays(gl, model));
}

let cameraMatrix = mat4.create();
let projection = mat4.create();
let view = mat4.create();

let viewProjection = mat4.create();
let vertexMatrix = mat4.create();
let screenTranslation = mat4.create();

let cameraMatrixPosition = vec3.create();
let tempStraightDirection = vec3.create();
let tempSideDirection = vec3.create();

mat4.perspective(projection, FOV, ASPECT, NearPlane, FarPlane);

function render() {
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(programInfo.program);

    vector = [0, 0, 0];

    if( key.w ) vector[0] = 0.1;
    if( key.a ) vector[2] = -0.1;
    if( key.s ) vector[0] = -0.1;
    if( key.d ) vector[2] = 0.1;

    tempStraightDirection[0] = cameraMatrix[8];
    tempStraightDirection[1] = 0;
    tempStraightDirection[2] = cameraMatrix[10];
    
    tempSideDirection[0] = cameraMatrix[0];
    tempSideDirection[1] = cameraMatrix[1];
    tempSideDirection[2] = cameraMatrix[2];

    vec3.scaleAndAdd(cameraMatrixPosition, cameraMatrixPosition, tempStraightDirection, -vector[0]);
    vec3.scaleAndAdd(cameraMatrixPosition, cameraMatrixPosition, tempSideDirection, vector[2]);

    cameraMatrix = mat4.fromTranslation(cameraMatrix, cameraMatrixPosition);
    cameraMatrix = mat4.rotateY(cameraMatrix, cameraMatrix, angle);

    mat4.invert(view, cameraMatrix);
    mat4.multiply(viewProjection, projection, view);
    mat4.multiply(screenTranslation, viewProjection, vertexMatrix);
    
    for (let model of vertexBufferInfo) {
        twgl.setBuffersAndAttributes(gl, programInfo, model);
        twgl.setUniforms(programInfo, {
            u_screenTranslation: screenTranslation,
            u_color: [0.2, 0.8, 0.4, 1.0],
        });

        twgl.drawBufferInfo(gl, model, gl.TRIANGLES);
    }      
}

setInterval(render, 1000 / FPS);

window.addEventListener('keydown', (e) => key[e.key] = true);
window.addEventListener('keyup', (e) => key[e.key] = false);

window.addEventListener('mousemove', (e) => angle += -e.movementX / 200);
