import ArrayManipulator from './ArrayManipulator';

export default class Chunk {
    public voxels: number[][][];
    public visibleVoxels: boolean[][][];
    public owner: string;

    constructor(voxels: number[][][]) {
        this.voxels = voxels;
    }

    public serialize(): {} {
        var json = {
            voxels: ArrayManipulator.serialize3D(this.voxels)
        };

        return json;
    }
}