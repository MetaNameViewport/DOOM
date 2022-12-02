function raycasting(xo, yo) {
    let cur_angle = player.angle - HALF_FOV;
    let x = 0;
    let y = 0;

    for (let ray = 0; ray < NUM_RAYS; ray++) {
        let sin_a = Math.sin(cur_angle);
        let cos_a = Math.cos(cur_angle);
        let depth = MAX_DEPTH;

        x = xo + depth * cos_a;
        y = yo + depth * sin_a;

        for (let object of WORLD_MAP) {
            for (let v = 0; (v + 2) <= object.vertexes.length; v += 1 ) {
                let d1 = object.vertexes[v];
                let d2 = object.vertexes[v+1];
                let belongs = MeshCollision([x, y], [xo, yo], d1, d2);
                if (belongs) {
                    let local_d = distance([xo, yo], belongs);
                    if (local_d < depth) {
                        depth = local_d;
                        ctx.fillStyle = object.color;
                    }
                }
            }
        }

        if (depth < MAX_DEPTH) {
            depth *= Math.cos(player.angle - cur_angle);
            let proj_height = PROJ_COEFF / depth;
                /*let c = 255 / (1 + depth * depth * 0.00002);
                ctx.fillStyle = `rgb(${c}, ${Math.round(c/2)}, ${Math.round(c/3)})`;*/
            ctx.fillRect(ray * SCALE, HALF_HEIGHT - Math.round(proj_height/2), SCALE, proj_height);
            ctx.fill();
        }

        cur_angle += DELTA_ANGLE;
    }
}

