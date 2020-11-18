const { mockArray, logResult, getDisplayText } = require('../utils');

/**
 * @function taskRunner - Task 3: Step 1 [With random word]
 * @description Asynchronously print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word
 */
async function taskRunner() {
  const promiseMap = mockArray.map(async (counter) => {
    const text = await getDisplayText();
    return `${counter}: ${text}`;
  });

  const dataset = await Promise.all(promiseMap);

  logResult('task_3__step_1.log', dataset);
}

/**
 * @function taskRunner - Task 3: Step 2 [With random word and FizzBuzz]
 * @description Asynchronously print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word,
 *              multiples of three, print "Fizz" (instead of the random word),
 *              for multiples of five, print "Buzz" and for numbers which are both multiples of three and five,
 *              print "FizzBuzz"
 */
async function taskRunnerFizzBuzz() {
  const promiseMap = mockArray.map(async (counter) => {
    const text = await getDisplayText({ counter, withFizzBuzz: true });
    return `${counter}: ${text}`;
  });

  const dataset = await Promise.all(promiseMap);

  logResult('task_3__step_2.log', dataset);
}

const runners = {
  taskRunner,
  taskRunnerFizzBuzz,
};

module.exports = runners;
