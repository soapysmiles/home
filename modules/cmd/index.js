'use strict';

const cmds = {
	Reset:      '\x1b[0m',
	Bright:     '\x1b[1m',
	Dim:        '\x1b[2m',
	Underscore: '\x1b[4m',
	Blink:      '\x1b[5m',
	Reverse:    '\x1b[7m',
	Hidden:     '\x1b[8m',
};

const colours = {
	FgBlack:   '\x1b[30m',
	FgRed:     '\x1b[31m',
	FgGreen:   '\x1b[32m',
	FgYellow:  '\x1b[33m',
	FgBlue:    '\x1b[34m',
	FgMagenta: '\x1b[35m',
	FgCyan:    '\x1b[36m',
	FgWhite:   '\x1b[37m',
};

exports.black    = (string) => `${colours.FgBlack}${string}${cmds.Reset}`;
exports.red      = (string) => `${colours.FgRed}${string}${cmds.Reset}`;
exports.green    = (string) => `${colours.FgGreen}${string}${cmds.Reset}`;
exports.yellow   = (string) => `${colours.FgYellow}${string}${cmds.Reset}`;
exports.blue     = (string) => `${colours.FgBlue}${string}${cmds.Reset}`;
exports.magenta  = (string) => `${colours.FgMagenta}${string}${cmds.Reset}`;
exports.cyan     = (string) => `${colours.FgCyan}${string}${cmds.Reset}`;
exports.white    = (string) => `${colours.FgWhite}${string}${cmds.Reset}`;


exports.log = (...line)=>{
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(line.join(' '));
};

exports.endLog = () => {console.log();};

exports.ask = async (question) => {
	const readline = require('readline').createInterface({
	  input:  process.stdin,
	  output: process.stdout
	});
	
	let response = '';

	readline.setPrompt(question);
	readline.prompt();

	return new Promise(( resolve , reject) => {

		readline.on('line', (userInput) => {
			response = userInput;
			readline.close();
		});

		readline.on('close', () => {
			resolve(response);
		});

	});

};