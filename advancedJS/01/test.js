var tasks = require("./61601");

console.log(tasks.fib(6));
console.log(tasks.phiEstimation(3));
console.log(tasks.phiEstimation(10));
console.log(tasks.phiEstimation(20));

console.log(tasks.reverseWordsOrderInString('Foo bar baz'), 'baz bar Foo');

console.log(tasks.reverseWordsInString('Foo bar baz'), 'ooF rab zab');

console.log(tasks.findNthNumber(2, [4, 3, 2, 1]));

console.log(tasks.median([4, 3, 2, 1, 0, 0]));

console.log(tasks.setBits(130, 26, 2, 5), 182);