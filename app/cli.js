// Third-pary modules
const vorpal = require('vorpal')(); // CLI

vorpal
  .command('foo', 'Outputs "bar".')
  .action(function(args, callback) {
    this.log('bar');
    callback();
  });

vorpal
  .delimiter('>')
  .show();