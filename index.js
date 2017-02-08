// Third-party modules
const app = require('express');
const http = require('http').Server(app);
const mongoose = require('mongoose'); // DB Driver
const io = require('socket.io')(http); // Websocket layer

// Internal modules
const Chunk = require('./app/models/Chunk.js').Chunk;

const helpers = require('./app/helpers.js');
const configDB = require('./config/database.js');
const loader = require('./app/loader.js')

//console.log(new Chunk(Array(16).fill().map(() => Array(16).fill().map(() => Array(64).fill(0)))).blocks[0][0][0]);

require('./app/argumentParser.js');

helpers.showLogo();

// Connect to DB
helpers.log('Connecting to database...')
//mongoose.connect(configDB.url);

mongoose.connection.on('connected', function() {
    helpers.log('Connected to database')
});

var map;
loader.loadWorld(function(array) {
    map = array;
});


http.listen(8512);


io.sockets.on('connection', function(socket) {
    helpers.log("New player!");

    socket.emit('map', to1D(map));
});

function to1D(array3D) {
    console.log(array3D[0][0]);
    array = [];
    for (var x = 0; x < 16; x++)
    {
        for (var y = 0; y < 16; y++)
        {
            for (var z = 0; z < 64; z++)
            {
                array[z*16*16 + y*16 + x] = array3D[x][y][z]; 
            }
        }
    }
    return array;
}

require('./app/cli.js');