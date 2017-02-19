import Chunk from './Chunk';
import MapGenerator from './MapGenerator';
import Loader from './Loader'

export default class World {
    public chunks: Chunk[][];

    constructor(chunks: Chunk[][]) {
        this.chunks = chunks;
    }

    /*
    private generate(width: number, height: number): void {
        var mapGenerator: MapGenerator = new MapGenerator();
        this.chunks = mapGenerator.generateMap(width, height);
        var loader: Loader = new Loader();
        loader.saveWorld(this.chunks);
    }*/
}