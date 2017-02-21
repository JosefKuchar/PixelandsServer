export default class ArrayManipulator {
    public static create2D(width: number, height: number, variable: any): any[][] {
        let array: number[][] = [];

        for (let x: number = 0; x < width; x++) {
            array[x] = [];

            for (let y: number = 0; y < height; y++) {
                array[x][y] = variable;
            }
        }

        return array;
    }

    public static create3D(width: number, depth: number, height: number, variable: any): any[][][] {
        let array: number[][][] = [];

        for (let x: number = 0; x < width; x++) {
            array[x] = [];

            for (let y: number = 0; y < depth; y++) {
                array[x][y] = [];

                for (let z: number = 0; z < height; z++) {
                    array[x][y][z] = variable;
                }
            }
        }

        return array;
    }

    public static serialize3D(array: any[][][]): any[] {
        var serialized: any[] = [];

        for (var x: number = 0; x < array.length; x++) {
            for (var y: number = 0; y < array[0].length; y++) {
                for (var z: number = 0; z < array[0][0].length; z++) {
                    serialized[z * array.length * array[0].length + y * array.length + x] = array[x][y][z];
                }
            }
        }

        return serialized;
    }

    public static serialize2D(array: any[][]): any[] {
        var serialized: any[] = [];

        for (var x: number = 0; x < array.length; x++) {
            for (var y: number = 0; y < array[0].length; y++) {
                serialized[y * array.length + x] = serialized[x][y];
            }
        }

        return serialized;
    }

    public static copy3D(array: any[][][]): any[][][] {
        var temp: any[][][] = ArrayManipulator.create3D(array.length, array[0].length, array[0][0].length, 0);

        for (var x: number = 0; x < array.length; x++) {
            for (var y: number = 0; y < array[0].length; y++) {
                for (var z: number = 0; z < array[0][0].length; z++) {
                    temp[x][y][z] = array[x][y][z];
                }
            }
        }

        return temp;
    }
}