objPath = '{}.obj'.format(input('Model name: '))
mtlPath = objPath.split('.')
mtlPath[1] = 'mtl'
mtlPath = '.'.join(mtlPath)

map_path = 'map.js'
ribs = list()
vertices = list()
faces = list()
webglVerticesArray = list()

obj = open(objPath, 'r')

for line in obj:
    if line[0] == 'v' and line[1] != 't' and line[1] != 'n':
        _vertexes = line[2:len(line) - 1].split(' ')
        vertices.append([float(_vertexes[0]),
                         float(_vertexes[1]),
                         float(_vertexes[2]) ])

    elif line[0] == 'f':
        _face = line[2:len(line) - 1].split(' ')
        for faceId in _face:
            faces.append(int(faceId.split('/')[0]))

obj.close()

for faceId in faces:
    for i in range(3):
        webglVerticesArray.append(vertices[faceId - 1][i])

map_file = open(map_path, 'w')
map_file.write('let arrays = ' + '{\nposition: ' + 'new Float32Array({})\n'.format(webglVerticesArray) + '}')
map_file.close()

