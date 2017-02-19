import * as ArgParse from 'argparse';

export default class ArgumentParser {
    private argumentParser: ArgParse.ArgumentParser;
    private arguments: any;

    constructor() { 
        this.argumentParser = new ArgParse.ArgumentParser({
            version: '0.0.2',
            addHelp: true,
            description: 'Server side for Voxelands game'
        });

        this.defineArguments();
        this.parseArguments();
        this.useArguments();
    }

    private defineArguments() {
        this.argumentParser.addArgument(
            ['--no-info'],
            {
                action: 'storeFalse',
                dest: 'info',
                help: 'Don\'t print any information'
            }
        );
    }

    private parseArguments() {
        this.arguments = this.argumentParser.parseArgs();
    }

    private useArguments() {
        if (!this.arguments.info) {
            console.log = function() {};
        }
    }
}