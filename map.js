let WORLD_MAP = [
    new Mesh([[0, 0], [60, 0], [60, 60], [0, 60]], color='red', closed=true),
    new Mesh([[100, 200], [150, 150], [200, 200]], color='blue', closed=true),
]

for (let object of WORLD_MAP) {
    is_closed(object);
}