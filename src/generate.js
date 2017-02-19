const SimplexNoise = require('simplex-noise');

var simplex = new SimplexNoise(Math.random);
                        //16,       16,       50,     4,       0.5,         2,         0,       0
function generateNoiseMap(mapWidth, mapHeight, scale, octaves, persistance, lacunarity, offsetX, offsetY) {
    // TODO: Seed
    var noiseMap = Array(mapWidth).fill().map(() => Array(mapHeight).fill(0));

    if (scale <= 0) {
        scale = 0.0001;
    }
    
    var octaveOffsets = [];
    for (var i = 0; i < octaves; i++) {
        var offX = (Math.random() * 200000 - 100000) + offsetX;
        var offY = (Math.random() * 200000 - 100000) + offsetY;;
        octaveOffsets[i] = [offX, offY];
    }

    var maxNoiseHeight = Number.MIN_VALUE;
    var minNoiseHeight = Number.MAX_VALUE;

    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            amplitude = 1;
            frequency = 1;
            noiseHeight = 0;

            for (var i = 0; i < octaves; i++) {
                sampleX = x / scale * frequency + octaveOffsets[i][0];
                sampleY = y / scale * frequency + octaveOffsets[i][1];
                simplexValue = simplex.noise2D(sampleX, sampleY);
                noiseHeight += simplexValue * amplitude;

                amplitude *= persistance;
                frequency *= lacunarity;
            }

            if (noiseHeight > maxNoiseHeight) {
                maxNoiseHeight = noiseHeight;
            } else if (noiseHeight < minNoiseHeight) {
                minNoiseHeight = noiseHeight;
            }

            noiseMap[x][y] = noiseHeight;
        }
    }

    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            noiseMap[x][y] = (noiseMap[x][y] - minNoiseHeight) / (maxNoiseHeight - minNoiseHeight);
        }
    }

    return noiseMap;
}

function generateVoxels(mapWidth, mapDepth, mapHeight, scale, octaves, persistance, lacunarity, offsetX, offsetY) {
    var noiseMap = generateNoiseMap(mapWidth, mapDepth, scale, octaves, persistance, lacunarity, offsetX, offsetY);
    var voxelMap = Array(mapWidth).fill().map(() => Array(mapDepth).fill().map(() => Array(mapHeight).fill(0)));
    
    /*
    for (var x = 0; x < mapWidth; x++)
    {
        for (var y = 0; y < mapDepth; y++)
        {
            for (var z = 2; z >= 0; z--) {
                voxelMap[x][y][z] = 1;
            }
        }
    }
    */

    
    for (var x = 0; x < mapWidth; x++)
    {
        for (var y = 0; y < mapDepth; y++)
        {   
            var blockCount = Math.floor(noiseMap[x][y] * Math.floor(mapHeight / 3));

            for (var z = 0; z < blockCount - 1; z++)
            {
                voxelMap[x][y][(mapHeight - 1)- z] = 1;
            }

            voxelMap[x][y][(mapHeight) - (blockCount)] = 2;
            
        }
    }

    return voxelMap;
}

module.exports = {
    generateVoxels: generateVoxels
}