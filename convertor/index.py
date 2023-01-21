obj_path = 'scene.obj'
mtl_path = 'scene.mtl'

obj = open(obj_path, 'r')
mtl = open(mtl_path, 'r')
ribs = []
vertexes = []
materials = {}
colors = []
fillStyle = 'rgb(0, 0, 0)'
counter = 0
scale = 100

for line in mtl:
    if line[0] == 'K' and line[1] == 'd':
        c = line[3:len(line)-1].split(' ')
        colors.append(f'rgb({int(float(c[0])*255)}, {int(float(c[1])*255)}, {int(float(c[2])*255)})')

mtl.close()
mtl = open(mtl_path, 'r')

for line in mtl:
    if line.startswith('new'):
        materials.update({f'{line[7:len(line)-1]}': f'{colors[counter]}'})
        counter += 1

mtl.close()

for line in obj:
    if line[0] == 'v' and line[1] != 't' and line[1] != 'n':
        s = line[2:len(line) - 1].split(' ')
        a = []
        for v in s:
            a.append(float(v) * scale)
        vertexes.append(a)

    elif line.startswith('usemtl'):
        fillStyle = materials.get(line[7:len(line)-1])

    elif line[0] == 'f':
        s = line[2:len(line) - 1].split(' ')
        a = []
        b = []
        for e in s:
            a.append(e.split('/')[0])
        for v in a:
            b.append(int(v) - 1)
        ribs.append([b, fillStyle])

obj.close()

print('let materials = "{}"'.format(materials))
print('let obj = {}'.format(vertexes))
print('let ribs = {}'.format(ribs))
