import * as chalk from 'chalk'

export default class Loggers {
    public static log(string: string): void {
        console.log(this.getTime() + string);
    }

    public static logo(): void {
        console.log(     chalk.green("         __"));
        console.log(     chalk.green("     _.-'  '-._"));
        console.log(     chalk.green(" _.-'          '-._"));
        console.log(     chalk.green("(_                _)"));
        console.log(     chalk.green("| '-._        _.-' |")  + "  _____             _           _    ");
        console.log(     chalk.green("|_    '-.__.-'    _|")  + " |  |  |___ _ _ ___| |___ ___ _| |___ ");
        console.log("|" + chalk.green(" '-._    |   _.-' ")  + "| |  |  | . |_'_| -_| | .'|   | . |_ -|");
        console.log("|" + chalk.green("     '-._|.-'     ") + "|  \\___/|___|_,_|___|_|__,|_|_|___|___|");
        console.log(                 "|_        |       _|");
        console.log(                 "  '-._    |   _.-'");
        console.log(                 "      '-._|.-'\n");
    }

    private static addZero(number: number): any {
        if (number < 10) {
            return "0" + number;
        }
        return number;
    }

    private static getTime(): string {
        var now = new Date();
        return chalk.gray('[' +this.addZero(now.getDate()) + '. ' + 
            (this.addZero(now.getMonth() + 1)) + '. ' + 
            now.getFullYear() + ' - ' + 
            this.addZero(now.getHours()) + ':' + 
            this.addZero(now.getMinutes()) + ':' + 
            this.addZero(now.getSeconds()) + '] ');
    }   
}