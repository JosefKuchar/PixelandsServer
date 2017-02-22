import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';
import * as mongoose from 'mongoose';

import World from './World';
import Loader from './Loader';
import Chunk from './Chunk';
import DBConfig from './DBConfig'
import Loggers from './Loggers'
import User from './User'
import { IUserModel } from './IUserModel'

export default class Server {
    public readonly port: number = 8512;
    public app: any;
    private server: any;
    private io: any;
    private database: mongoose.Connection;
    private world: World;

    constructor() {
        this.createApp();
        this.createServer();
        this.socketIO();
        this.connectDatabase();
        this.databaseEvents();
        this.initWorld();
        this.listen();
    }

    private initWorld() {
        Loggers.log('Loading world')
        var loader = new Loader();
        loader.loadWorld((chunks: Chunk[][]) => {
            Loggers.log('World successfully loaded')
            this.world = new World(chunks);
        });
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = http.createServer(this.app);
    }

    private connectDatabase() {
        Loggers.log('Connecting to database')
        mongoose.connect(DBConfig.url);
        this.database = mongoose.connection;
    }

    private databaseEvents() {
        this.database.on('error', (error: Error) => {
            throw error;
        });

        this.database.once('open', () => {
            Loggers.log('Connected to database')
        });
    }

    private socketIO(): void {
        Loggers.log('Starting socket.io')
        this.io = io(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            Loggers.log('Server is running');    
        });

        this.io.on('connect', (socket: any) => {
            socket.emit('map', this.world.chunks[0][0].serialize())

            socket.on('authenticate', (data: any) => {
                User.findOne({ 'name': data.name }, (error: Error, user: IUserModel) => {
                    if (error) {
                        throw error;
                    }

                    if (!user) {
                        console.log('User not found')
                        return;
                    }

                    if(user.validPassword(data.password)) {
                        socket.logged = true;
                        Loggers.log('Good password');
                    } else {
                        Loggers.log('Bad password')
                    }
                });
            });
        }); 
    }
}