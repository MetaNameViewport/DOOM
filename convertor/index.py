obj_path = '{}.obj'.format(input('Model name: '))
mtl_path = obj_path.split('.')
mtl_path[1] = 'mtl'
mtl_path = '.'.join(mtl_path)

map_path = 'map.js'

ribs = list()
vertexes = list()
faces = list()
materials = dict()
colors = []

current_color = tuple()

counter = 0
scale = 1

mtl = open(mtl_path, 'r')
for line in mtl:
    if line.startswith('Kd'):
        c = line[3:len(line)-1].split(' ')
        colors.append([float(c[0]), float(c[1]), float(c[2]) ])

mtl.close()

mtl = open(mtl_path, 'r')

for line in mtl:
    if line.startswith('new'):
        materials.update({f'{line[7:len(line)-1]}': colors[counter] })
        counter += 1

mtl.close()

obj = open(obj_path, 'r')

for line in obj:
    if line[0] == 'v' and line[1] != 't' and line[1] != 'n':
        s = line[2:len(line) - 1].split(' ')
        vertexes.append([ float(s[0]) * scale, float(s[1]) * scale, -float(s[2]) * scale ])

    elif line[0] == 'f':
        s = line[2:len(line) - 1].split(' ')
        a = []
        b = []
        for e in s:
            a.append(e.split('/')[0])
        for v in a:
            b.append(int(v) - 1)
        ribs.append(b)

        for i in range(len(line[2:len(line) - 1].split(' '))):
            colors.append(current_color)

    elif line.startswith('usemtl'):
        current_color = materials[line[7:len(line)-1]]

obj.close()

for i in ribs:
    v_in_true_sequence = []
    for f in i:
        v_in_true_sequence.append(vertexes[f])
    faces.append(v_in_true_sequence)

map_file = open(map_path, 'w')
map_file.write('let arrays = ' + '{\nposition: ' + 'new Float32Array({}.flat().flat())\n'.format(faces) + '\n}')
map_file.close()
