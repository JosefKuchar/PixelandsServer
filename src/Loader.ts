import * as zlib from 'zlib';
import * as fs from 'fs';

import MapGenerator from './MapGenerator';
import Chunk from './Chunk';
import ArrayManipulator from './ArrayManipulator';

export default class Loader {

    constructor() {
    }

    public saveWorld(chunks: Chunk[][]) {
        zlib.gzip(new Buffer(JSON.stringify(chunks)), (error: Error, result: Buffer) => {
            if (error) {
                throw error;
            }

            fs.writeFile(__dirname + '/data/map.vox', result, (error: NodeJS.ErrnoException) => {
                if (error) {
                    throw error;
                }
            });
        });
    }
    
    public loadWorld(cb: Function) {
        
        fs.stat(__dirname + '/data/map.vox', (error: NodeJS.ErrnoException) => {
            if (error === null) {
                fs.readFile(__dirname + '/data/map.vox', (error: NodeJS.ErrnoException, data: Buffer) => {
                    zlib.gunzip(data, (error: Error, result: Buffer) => {

                        var chunks: any = JSON.parse(result.toString());
                        
                        var world: Chunk[][] = ArrayManipulator.create2D(chunks.length, chunks[0].length, 0);

                        for(var x: number = 0; x < chunks.length; x++) {
                            for (var y: number = 0; y < chunks[0].length; y++) {
                                world[x][y] = new Chunk(chunks[x][y].voxels);
                            }
                        }

                        cb(world);
                    });
                });
            } else if (error.code === 'ENOENT') {
                var mapGenerator: MapGenerator = new MapGenerator();
                var chunks: Chunk[][] = mapGenerator.generateMap(4, 4);
                this.saveWorld(chunks);
                cb(chunks);
            } else {
                throw error;
            }
        });
    }
}