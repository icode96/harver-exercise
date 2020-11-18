const {
  mockArray,
  logResult,
  getDisplayTextSync,
  getDisplayText,
} = require('../utils');

/**
 * @function taskRunner - Task 4: Step 1 [With random word and error text]
 * @description Print numbers from 1 to 100 to the console/file,
 *              When an error is caught, it shoyld print "It shouldn't break anything!"
 *              instead of the random word, "Fizz", "Buzz" or "FizzBuzz"
 */
function taskRunnerSync() {
  const dataset = mockArray.map(
    (counter) =>
      `${counter}: ${getDisplayTextSync({
        counter,
        withFizzBuzz: true,
        withErrors: true,
      })}`
  );

  logResult('task_4__step_1.log', dataset);
}

/**
 * @function taskRunner - Task 4: Step 1 [With random word and error text]
 * @description Asynchronously print numbers from 1 to 100 to the console/file,
 *              When an error is caught, it shoyld print "It shouldn't break anything!"
 *              instead of the random word, "Fizz", "Buzz" or "FizzBuzz"
 */
async function taskRunner() {
  const promiseMap = mockArray.map(async (counter) => {
    const text = await getDisplayText({
      counter,
      withFizzBuzz: true,
      withErrors: true,
    });
    return `${counter}: ${text}`;
  });

  const dataset = await Promise.all(promiseMap);

  logResult('task_4__step_2.log', dataset);
}

const runners = {
  taskRunnerSync,
  taskRunner,
};

module.exports = runners;
