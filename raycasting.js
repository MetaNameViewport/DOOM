function raycasting(xo, yo) {
    let cur_angle = player.angle - HALF_FOV;
    let x = 0;
    let y = 0;

    for (let ray = 0; ray < NUM_RAYS; ray++) {
        let sin_a = Math.sin(cur_angle);
        let cos_a = Math.cos(cur_angle);
        let depth = MAX_DEPTH;
        let wall_height = METER_COEFF;
        let fz = 0;
        let rgb = [255, 255, 255];

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
                        wall_height = object.height * METER_COEFF;
                        fz = object.floor_z;
                        rgb = object.color;
                    }
                }
            }
        }

        if (depth < MAX_DEPTH) {
            depth *= Math.cos(player.angle - cur_angle);
            let proj_height = (DIST * wall_height) / depth;
            let v = 0.5 * (DIST * METER_COEFF) / depth * player.camera_z;
            let y0 = HALF_HEIGHT + (v - proj_height) - fz * (DIST * METER_COEFF)/depth;
            
            let r = rgb[0] / (1 + depth * depth * 0.00002);
            let g = rgb[1] / (1 + depth * depth * 0.00002);
            let b = rgb[2] / (1 + depth * depth * 0.00002);
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
            ctx.fillRect(ray * SCALE, y0, SCALE, proj_height);
        }

        cur_angle += DELTA_ANGLE;
    }
}

