let WIDTH = document.body.clientWidth;
let HEIGHT = (WIDTH / 16) * 9;
let HALF_HEIGHT = HEIGHT / 2;
let TILE = 60;

let FOV = Math.PI / 3;
let HALF_FOV = FOV / 2;
let NUM_RAYS = 300;
let MAX_DEPTH = 400;
let DELTA_ANGLE = FOV / NUM_RAYS;
let DIST = NUM_RAYS / (2 * Math.tan(HALF_FOV));
let PROJ_COEFF = DIST * TILE * 1.5;
let SCALE = Math.round(WIDTH / NUM_RAYS);

let FPS = 1000 / 60;
let LAST_LOOP = performance.now();
let THIS_LOOP = 0;
