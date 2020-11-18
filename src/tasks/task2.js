const { mockArray, logResult, getDisplayTextSync } = require('../utils');

/**
 * @function taskRunner - Task 2
 * @description Print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word,
 *              multiples of three, print "Fizz" (instead of the random word),
 *              for multiples of five, print "Buzz" and for numbers which are both multiples of three and five,
 *              print "FizzBuzz"
 */
function taskRunner() {
  const dataset = mockArray.map(
    (counter) =>
      `${counter}: ${getDisplayTextSync({ counter, withFizzBuzz: true })}`
  );

  logResult('task_2.log', dataset);
}

module.exports = taskRunner;
