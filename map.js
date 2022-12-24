let WORLD_MAP = [
    new Mesh([[0, 0], [10, 0], [10, 10], [0, 10]], floor_z=0, height=3, color=[0, 100, 255], closed=true),
    new Mesh([[20, 0], [30, 0], [30, 10], [20, 10]], floor_z=2, height=1, color=[0, 100, 255], closed=true), 
]

for (let object of WORLD_MAP) {
    is_closed(object);
}