const chalk = require('chalk');

module.exports = {
    log: function(string) {
        console.log(getTime() + string)
    },
    showLogo: function() {
        console.log(       chalk.green("         __"));
        console.log(       chalk.green("     _.-'  '-._"));
        console.log(       chalk.green(" _.-'          '-._"));
        console.log(       chalk.green("(_                _)"));
        console.log(       chalk.green("| '-._        _.-' |")  + "  _____             _           _    ");
        console.log(       chalk.green("|_    '-.__.-'    _|")  + " |  |  |___ _ _ ___| |___ ___ _| |___ ");
        console.log(  "|" + chalk.green(" '-._    |   _.-' ")  + "| |  |  | . |_'_| -_| | .'|   | . |_ -|");
        console.log(  "|" + chalk.green("     '-._|.-'     ") + "|  \\___/|___|_,_|___|_|__,|_|_|___|___|");
        console.log(                   "|_        |       _|");
        console.log(                   "  '-._    |   _.-'");
        console.log(                   "      '-._|.-'\n");
    }
}

function getTime() {
    var now = new Date();
    return chalk.gray('[' + addZero(now.getDate()) + '. ' + 
            (addZero(now.getMonth() + 1)) + '. ' + 
            now.getFullYear() + ' - ' + 
            addZero(now.getHours()) + ':' + 
            addZero(now.getMinutes()) + ':' + 
            addZero(now.getSeconds()) + '] ');

    function addZero(number) {
        if (number < 10) {
            return "0" + number;
        }
        return number;
    }
}