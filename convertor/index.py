obj_path = '{}.obj'.format(input('Model name: '))
map_path = 'map.js'


ribs = []
vertexes = []
faces = []

counter = 0
scale = 100


obj = open(obj_path, 'r')

for line in obj:
    if line[0] == 'v' and line[1] != 't' and line[1] != 'n':
        s = line[2:len(line) - 1].split(' ')
        a = []
        for v in s:
            a.append(float(v) * scale)
        vertexes.append(a)

    elif line[0] == 'f':
        s = line[2:len(line) - 1].split(' ')
        a = []
        b = []
        for e in s:
            a.append(e.split('/')[0])
        for v in a:
            b.append(int(v) - 1)
        ribs.append(b)

obj.close()

for i in ribs:
    v_in_true_sequence = []
    for f in i:
        v_in_true_sequence.append(vertexes[f])
    faces.append(v_in_true_sequence)

map_file = open(map_path, 'w')
map_file.write('let obj = {}.flat().flat()'.format(faces))
map_file.close()
