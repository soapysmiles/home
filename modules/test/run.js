const Test = require (`${__dirname}/test.class.js`);

const test = new Test(process.cwd());

test.runTests();