import FastSimplexNoise from 'fast-simplex-noise'
import Coord2D from './Coord2D'
import ArrayManipulator from './ArrayManipulator'

export default class SimplexNoise {
    private noiseGenerator: FastSimplexNoise;
    
    constructor() {
        this.noiseGenerator = new FastSimplexNoise();
    }

    public generateNoiseMap(width: number, height: number, scale: number, octaves: number, persistance: number, lacunarity: number, offset: Coord2D): number[][] {
        var noiseMap = ArrayManipulator.create2D(width, height, 0);

        if (scale <= 0) {
            scale = 0.0001;
        }

        var octaveOffsets: Coord2D[] = [];
        for (var i: number = 0; i < octaves; i++) {
            var offsetX: number = (Math.random() * 200000 - 100000) + offset.x;
            var offsetY: number = (Math.random() * 200000 - 100000) + offset.y;
            octaveOffsets[i] = new Coord2D(offsetX, offsetY);
        } 

        var maxNoiseHeight: number = Number.MIN_VALUE;
        var minNoiseHeight: number = Number.MAX_VALUE;

        for (var y: number = 0; y < height; y++) {
            for (var x: number = 0; x < width; x++) {
                var amplitude: number = 1;
                var frequency: number = 1;
                var noiseHeight: number = 0;

                for (var i: number = 0; i < octaves; i++) {
                    var sampleX: number = x / scale * frequency + octaveOffsets[i].x;
                    var sampleY: number = y / scale * frequency + octaveOffsets[i].y;
                    var noiseValue: number = this.noiseGenerator.raw([sampleX, sampleY]);
                    
                    noiseHeight = noiseValue * amplitude;

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

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                noiseMap[x][y] = (noiseMap[x][y] - minNoiseHeight) / (maxNoiseHeight - minNoiseHeight);
            }
        }

        return noiseMap;
    }
}