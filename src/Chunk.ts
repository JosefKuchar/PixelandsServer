import ArrayManipulator from './ArrayManipulator';
import Blocks from './Blocks'

export default class Chunk {
    public voxels: number[][][];
    public visibleVoxels: boolean[][][];
    public owner: string;

    constructor(voxels: number[][][], visibleVoxels: boolean[][][]) {
        this.voxels = voxels;
        this.visibleVoxels = visibleVoxels;
    }

    public serialize(): {} {
        var serialized = ArrayManipulator.create3D(16, 16, 64, 0);

        for (var x: number = 0; x < this.voxels.length; x++) {
            for (var y: number = 0; y < this.voxels[0].length; y++) {
                for (var z: number = 0; z < this.voxels[0][0].length; z++) {
                    if (this.visibleVoxels[x][y][z] === false) {
                        serialized[x][y][z] = Blocks.HIDDEN;
                    } else {
                        serialized[x][y][z] = this.voxels[x][y][z];
                    }
                    
                }
            }
        }

        var json = {
            voxels: ArrayManipulator.serialize3D(serialized)
        };

        return json;
    }
}