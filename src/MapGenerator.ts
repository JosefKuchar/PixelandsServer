import SimplexNoise from './SimplexNoise';
import ArrayManipulator from './ArrayManipulator';
import Coord2D from './Coord2D';
import Blocks from './Blocks';
import Chunk from './Chunk';
import WaveAlgorithm from './WaveAlgorithm'

export default class MapGenerator {
    private simplexNoise: SimplexNoise;

    constructor() {
        this.simplexNoise = new SimplexNoise();
    }

    public generateMap(width: number, height: number): Chunk[][] {
        var voxels: number[][][];
        voxels = this.generateVoxels(width * 16, height * 16, 64);
        voxels = this.setGrass(voxels);
        var algorithm = new WaveAlgorithm(voxels);
        var chunks = this.splitToChunks(voxels);
        return chunks;
    }

    private generateVoxels(width: number, depth: number, height: number): number[][][] {
        var voxels: number[][][] = ArrayManipulator.create3D(width, depth, height, 0);
        var noiseMap: number[][] = this.simplexNoise.generateNoiseMap(width, depth, 50, 4, 0.5, 2, new Coord2D(0, 0));

        for (var x: number = 0; x < width; x++) {
            for (var y: number = 0; y < depth; y++) {
                var columnHeight = Math.floor(noiseMap[x][y] * 20);

                for (var z: number = 0; z < columnHeight; z++) {
                    voxels[x][y][(height - 1) - z] = Blocks.DIRT;
                }
            }
        }

        return voxels;
    }

    private setGrass(voxels: number[][][]): number[][][] {
        for (var x: number = 0; x < voxels.length; x++) {
            for (var y: number = 0; y < voxels[0].length; y++) {
                for (var z: number = 0; z < voxels[0][0].length; z++) {
                    if (voxels[x][y][z] != Blocks.NONE) {
                        voxels[x][y][z] = Blocks.GRASS;
                        break;
                    }
                }
            }
        }

        return voxels;
    }

    private splitToChunks(voxels: number[][][]): Chunk[][] {
        var chunks: Chunk[][] = ArrayManipulator.create2D(voxels.length / 16, voxels[0].length / 16, 0);
        for (var i: number = 0; i < voxels.length / 16; i++) {
            for (var j: number = 0; j < voxels[0].length / 16; j++) {
                var chunkData: number[][][] = ArrayManipulator.create3D(16, 16, 64, 0);

                for (var x: number = 0; x < 16; x++) {
                    for (var y: number = 0; y < 16; y++) {
                        for (var z: number = 0; z < 64; z++) {
                            chunkData[x][y][z] = voxels[x + i * 16][y + j * 16][z];
                        }
                    }
                }

                chunks[i][j] = new Chunk(chunkData);
            }
        }

        return chunks;
    }

    //TODO: Wave algorithm for hidden blocks detection after world generation
    
}