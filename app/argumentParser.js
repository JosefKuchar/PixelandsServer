// Third-party modules
const argumentParser = new require('argparse').ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Server side for Voxelands game'
});

// Add arguments
argumentParser.addArgument(
    ['--no-info'],
    {
        action: 'storeFalse',
        dest: 'info',
        help: 'Don\'t print any information'
    }
);

// Parse arguments
var args = argumentParser.parseArgs();

// Use arguments
if(!args.info) {
    console.log = function() {};
}
