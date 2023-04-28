const FPS = 60;
const NearPlane = 0.1;
const FarPlane = 1000;
const FOV = 70 * Math.PI / 180;
const ASPECT = window.innerWidth / window.innerHeight;

let angle = [0, 0];
let vector = [0, 0, 0];
let key = {};
