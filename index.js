let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
ctx.font = `${Math.round(WIDTH / 26)}px Arial`;

let player = new Controller(200, 200, 5);

setInterval(function() {
    if (player.vector[0] || player.vector[1]) player.move();
    Drawing.clear();
    Drawing.background();
    Drawing.world();
    Drawing.draw_fps();
}, FPS);

document.addEventListener('keydown', function(e) {
    if (e.key == 'w') {
        player.w();
    } else if (e.key == 's') {
         player.s();
    } else if (e.key == 'a') {
        player.a();
    } else if (e.key == 'd') {
        player.d();
    };
})

document.addEventListener('keyup', function(e) {
    if (e.key == 'w' || e.key == 's' || e.key == 'a' || e.key == 'd') player.stop();
})

document.addEventListener('mousemove', function(e) {
    player.angle += (e.movementX * Math.PI) / 180 / 2.25;
})
