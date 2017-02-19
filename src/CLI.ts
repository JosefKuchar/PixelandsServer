var vorpal = require('vorpal')();

export default class CLI {
    constructor() {
        this.addCommands();
        this.show();
    }

    private addCommands() {
        vorpal
            .command('foo', 'Outputs "bar".')
            .action(function(args: any, callback: any) {
                console.log("test")
                callback();
            });
    }   

    private show() {
        vorpal
            .delimiter('>')
            .show();
    }
}