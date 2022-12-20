const Drawing = {
    clear: function() {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    background: function() {
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
    },

    draw_fps: function() {
        THIS_LOOP = performance.now();
        ctx.fillStyle = 'white';
        ctx.fillText((1000/(THIS_LOOP-LAST_LOOP)).toFixed(0), 30, Math.round(HEIGHT / 20) + 30);
        LAST_LOOP = THIS_LOOP;
    },

    world: function() {
        raycasting(player.x, player.y);
    }
}