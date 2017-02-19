import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';

import World from './World';
import Loader from './Loader';
import Chunk from './Chunk';

export default class Server {
    public readonly port: number = 8512;
    public app: any;
    private server: any;
    private io: any;
    private world: World;

    constructor() {
        this.createApp();
        this.createServer();
        this.socketIO();
        this.initWorld();
        this.listen();
    }

    private initWorld() {
        var loader = new Loader();
        loader.loadWorld((chunks: Chunk[][]) => {
            this.world = new World(chunks);
        });
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = http.createServer(this.app);
    }

    private socketIO(): void {
        this.io = io(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Server running');    
        });

        this.io.on('connect', (socket: any) => {
            console.log(this.world.chunks[0][0].serialize);
            socket.emit('map', this.world.chunks[0][0].serialize())
        });
    }
}