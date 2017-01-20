'use strict';

const commands = require('./commands');
const inquire = require('erector-set').inquire;

const main = (cliArgs) => {
    const command = getCommandName(cliArgs[0]);
    const commandArgs = cliArgs.slice(1);
    const rootDir = process.cwd();

    if (typeof commands[command] === 'function') {
        commands[command].apply(null, [rootDir].concat(commandArgs));
    } else {
        askForCommand();
    }
};

const getCommandName = (command) => {
    command = command ? command.replace(/^\-+/, '') : command;

    switch (command) {
        case 'c':
        case 'component':
            return 'component';
        case 'i':
        case 'init':
        case 'initial':
            return 'initial';
        case 'p':
        case 'pipe':
            return 'pipe';
        case 's':
        case 'service':
            return 'service';
        default:
            return '';
    }
};

const askForCommand = () => {
    inquire([{
        name: 'command',
        question: 'What would you like to generate?'
    }])
    .then((answers) => main(answers[0].answer.split(/\s+/)));
};

if (!module.parent) {
    main(process.argv.slice(2));
}