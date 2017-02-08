// Third-party modules
const snappy = require('snappy'); // Google compression algorithm
const fs = require('fs');

// Internal modules
const helpers = require('./helpers.js');
const mapGenerator = require('./generate.js');

module.exports = {
    loadWorld: function(cb) {
        // Check if json exists
        fs.stat('data/map.json', function(err, stat) {
            // If file exist
            if (err == null) {
                helpers.log('Map found, loading...');
                
                // Read file
                fs.readFile('data/map.json', function(err, compressed) {
                    // If there is read error, throw it
                    if (err) {
                        throw err;
                    }

                    // Decompress the string from the loaded file
                    snappy.uncompress(compressed, { asBuffer: false }, function (err, original) {
                        // If string is broken or somethink else, throw error
                        if(err) {
                            throw err;
                        }

                        // Parse string to object and return it
                        cb(JSON.parse(original));
                    })
                })

            // If file not exist
            } else if(err.code == 'ENOENT') {
                helpers.log('Map not found, generating...');
                
                // Generate new map
                var map = mapGenerator.generateVoxels(16, 16, 64, 50, 4, 0.5, 2, 0, 0);
                // Return the map
                cb(map);
                // Parse object to string and compress it
                snappy.compress(JSON.stringify(map), function (err, compressed) {
                    // If string cannot be compressed, throw error
                    if(err) {
                        throw err;
                    }

                    // Write compressed string to a new file
                    fs.writeFile('data/map.json', compressed, function(err) {
                        // If string cannot be saved on the disk, throw error
                        if (err) {
                            throw err;
                        }
                    });
                })

            // If there is unknown error
            } else {
                throw err;
            }
        });
    },
    saveWorld: function(world, cb) {
        // Parse object to string and compress it
        snappy.compress(JSON.stringify(world), function(err, compressed) {
            // If string cannot be compressed, throw error
            if(err) {
                throw err;
            }

            // Write compressed string to file
            fs.writeFile('data/map.json', compressed, function(err) {
                // If string cannot be saved on the disk, throw error
                if (err) {
                    throw err;
                }
                
                // Call optional callback
                typeof cb === 'function' && cb();
            });
        });
    }
}