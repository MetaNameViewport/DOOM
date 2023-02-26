function translate(obj) {
    let on_screeen_veretexes = [];

	for (let face of obj) {
		let flag = false;

		for (let v of face) {
			let x_diff = v[0] - x;
			let y_diff = v[1] - y;
			let z_diff = v[2] - z;

			let translatedX = x_diff * Math.cos(-angle) + z_diff * Math.sin(-angle);
			let translatedZ = z_diff * Math.cos(-angle) - x_diff * Math.sin(-angle);
			
			if (translatedZ < 0) {
				flag = true;
				continue;
			};

			let dispX = (translatedX / translatedZ) * screenDistance + centerOfScreenX;
			let dispY = (y_diff / translatedZ) * screenDistance + centerOfScreenY;

			on_screeen_veretexes.push([dispX, dispY]);
		}
	}

    return on_screeen_veretexes.flat();
}