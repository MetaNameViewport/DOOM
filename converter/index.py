objectName = input('Enter obj file name: ')

objectsFile = open('models/' + objectName + '.obj', 'r')
objects = objectsFile.readlines()
objectsFile.close()

markers = list()
models = list()
scene = list()
vertices = list()

for line in objects:
    if line[0] == 'v' and line[1] != 't' and line[1] != 'n':
        _vertices = line[2:len(line) - 1].split(' ')
        vertices.append([float(_vertices[0]),
                          float(_vertices[1]),
                          float(_vertices[2])])


def parse(obj):
    faces = list()
    webglVerticesArray = list()

    for line in obj:
        if line[0] == 'f':
            _face = line[2:len(line) - 1].split(' ')
            for faceId in _face:
                faces.append(int(faceId.split('/')[0]))

    for faceId in faces:
        for _i in range(3):
            webglVerticesArray.append(vertices[faceId - 1][_i])

    return webglVerticesArray


for i in range(len(objects)):
    if objects[i][0] == 'o':
        markers.append(i)

markers.append(len(objects))

for i in range(len(markers) - 1):
    models.append(objects[markers[i]+1:markers[i+1]])

for model in models:
    scene.append(parse(model))

mapFile = open('map.js', 'w')
mapFile.write('let arrays = [\n')

for i in range(len(scene)):
    mapFile.write('{position: ' + 'new Float32Array({})'.format(scene[i]) + '},\n')

mapFile.write('\n]')
mapFile.close()
