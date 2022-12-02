function Controller(x, y, speed) {
    this.x = x;
    this.y = y;

    this.speed = speed;
    this.vector = [0, 0];

    this.angle = 0;
}

Controller.prototype = {
    w: function() {
        this.vector[0] = this.speed * Math.cos(this.angle);
        this.vector[1] = this.speed * Math.sin(this.angle);
    },

    s: function() {
        this.vector[0] = -this.speed * Math.cos(this.angle);
        this.vector[1] = -this.speed * Math.sin(this.angle);
    },

    a: function() {
        this.vector[0] = this.speed * Math.sin(this.angle);
        this.vector[1] = -this.speed * Math.cos(this.angle);
    },

    d: function() {
        this.vector[0] = -this.speed * Math.sin(this.angle);
        this.vector[1] = this.speed * Math.cos(this.angle);
    },

    stop: function() {this.vector = [0, 0]},

    move: function() {
        this.x += this.vector[0];
        this.y += this.vector[1];
    },
};
