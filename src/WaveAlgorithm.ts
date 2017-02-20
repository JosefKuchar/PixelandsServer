import Coord3D from './Coord3D'
import ArrayManipulator from './ArrayManipulator'

export default class WaveAlgorithm {

    private voxels: number[][][];
    private visibleVoxels: boolean[][][];

    constructor(voxels: number[][][]) {
        this.voxels = voxels;
        this.visibleVoxels = ArrayManipulator.create3D(voxels.length, voxels[0].length, voxels[0][0].length, false);
    }

    public calculateVisibleVoxels() {
        this.algorithm(this.findFreeSpot())
        this.expand();
        return this.visibleVoxels;
    }

    private findFreeSpot(): Coord3D {
        for (var x: number = 0; x < this.voxels.length; x++) {
            for (var y: number = 0; y < this.voxels[0].length; y++) {
                if (this.freeSpot(new Coord3D(x, y, 0))) {
                    return new Coord3D(x, y, 0)
                }
            }
        }
    }

    private algorithm(start: Coord3D): void {
        var queue: Coord3D[] = [];

        queue.push(start);
        this.visibleVoxels[start.x][start.y][start.z] = true;

        while(queue.length > 0) {
            var currentVoxel: Coord3D = queue.shift();

            if (this.freeSpot(new Coord3D(currentVoxel.x, currentVoxel.y, currentVoxel.z - 1))) {
                queue.push(new Coord3D(currentVoxel.x, currentVoxel.y , currentVoxel.z - 1));
                this.visibleVoxels[currentVoxel.x][currentVoxel.y][currentVoxel.z - 1] = true;
            } else if (this.freeSpot(new Coord3D(currentVoxel.x - 1, currentVoxel.y, currentVoxel.z))) {
                queue.push(new Coord3D(currentVoxel.x - 1, currentVoxel.y, currentVoxel.z));
                this.visibleVoxels[currentVoxel.x - 1][currentVoxel.y][currentVoxel.z] = true;
            } else if (this.freeSpot(new Coord3D(currentVoxel.x, currentVoxel.y - 1, currentVoxel.z))) {
                queue.push(new Coord3D(currentVoxel.x, currentVoxel.y - 1, currentVoxel.z));
                this.visibleVoxels[currentVoxel.x][currentVoxel.y - 1][currentVoxel.z] = true;
            } else if (this.freeSpot(new Coord3D(currentVoxel.x, currentVoxel.y + 1, currentVoxel.z))) {
                queue.push(new Coord3D(currentVoxel.x, currentVoxel.y + 1, currentVoxel.z));
                this.visibleVoxels[currentVoxel.x][currentVoxel.y + 1][currentVoxel.z] = true;
            } else if (this.freeSpot(new Coord3D(currentVoxel.x + 1, currentVoxel.y, currentVoxel.z))) {
                queue.push(new Coord3D(currentVoxel.x + 1, currentVoxel.y, currentVoxel.z));
                this.visibleVoxels[currentVoxel.x + 1][currentVoxel.y][currentVoxel.z] = true;
            } else if (this.freeSpot(new Coord3D(currentVoxel.x, currentVoxel.y, currentVoxel.z + 1))) {
                queue.push(new Coord3D(currentVoxel.x, currentVoxel.y, currentVoxel.z + 1));
                this.visibleVoxels[currentVoxel.x][currentVoxel.y][currentVoxel.z + 1] = true;
            }
        }
    }

    private expand(): void {
        for (var x: number = 0; x < this.visibleVoxels.length; x++) {
            for (var y: number = 0; y < this.visibleVoxels[0].length; y++) {
                for (var z: number = 0; z < this.visibleVoxels[0][0].length; z++) {
                    if (this.visibleVoxels[x][y][z] === true) {
                        if (this.validSpot(new Coord3D(x, y, z - 1))) {
                            this.visibleVoxels[x][y][z - 1] = true;
                        } else if (this.validSpot(new Coord3D(x, y - 1, z))) {
                            this.visibleVoxels[x][y - 1][z] = true;
                        } else if (this.validSpot(new Coord3D(x - 1, y, z))) {
                            this.visibleVoxels[x - 1][y][z] = true;
                        } else if (this.validSpot(new Coord3D(x, y, z + 1))) {
                            this.visibleVoxels[x][y][z + 1] = true;
                        } else if (this.validSpot(new Coord3D(x, y + 1, z))) {
                            this.visibleVoxels[x][y + 1][z] = true;
                        } else if (this.validSpot(new Coord3D(x + 1, y, z))) {
                            this.visibleVoxels[x + 1][y][z] = true;
                        }
                    }
                }
            }
        }
    }

    private validSpot(spot: Coord3D): boolean {
        return spot.x >= 0 && spot.x < this.voxels.length && 
            spot.y >= 0 && spot.y < this.voxels[0].length &&
            spot.z >= 0 && spot.z < this.voxels[0][0].length
    }

    private freeSpot(spot: Coord3D): boolean {
        return spot.x >= 0 && spot.x < this.voxels.length && 
            spot.y >= 0 && spot.y < this.voxels[0].length &&
            spot.z >= 0 && spot.z < this.voxels[0][0].length &&
            this.voxels[spot.x][spot.y][spot.z] === 0 &&
            this.visibleVoxels[spot.x][spot.y][spot.z] === false
    }
}