import Coord3D from './Coord3D'

export default class WaveAlgorithm {

    private voxels: number[][][];

    constructor(voxels: number[][][]) {
        this.voxels = voxels;
    }

    private findFreeSpot() {
        for (var x: number = 0; x < this.voxels.length; x++) {
            for (var y: number = 0; y < this.voxels[0].length; y++) {

            }
        }
    }

    private freeSpot(spot: Coord3D) {
        return spot.x > 0 && spot.x < this.voxels.length && 
            spot.y > 0 && spot.y < this.voxels[0].length &&
            spot.z > 0 && spot.z < this.voxels[0][0].length &&
            this.voxels[spot.x][spot.y][spot.z] === 0
    }
}