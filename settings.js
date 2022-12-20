let WIDTH = document.body.clientWidth;
let HEIGHT = (WIDTH / 16) * 9;
let HALF_HEIGHT = HEIGHT / 2;
let METER_COEFF = 50;

let FOV = Math.PI / 3;
let HALF_FOV = FOV / 2;
let NUM_RAYS = 900;
let MAX_DEPTH = 400;
let DELTA_ANGLE = FOV / NUM_RAYS;
let DIST = NUM_RAYS / (2 * Math.tan(HALF_FOV));
let PROJ_COEFF_FOR_1_METER_WALL = DIST * METER_COEFF;
let SCALE = Math.round(WIDTH / NUM_RAYS);

let FPS = 1000 / 60;
let LAST_LOOP = performance.now();
let THIS_LOOP = 0;
