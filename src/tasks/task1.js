const { mockArray, logResult, getDisplayTextSync } = require('../utils');

/**
 * @function taskRunner - Task 1
 * @description Print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word
 */
function taskRunner() {
  const dataset = mockArray.map(
    (counter) => `${counter}: ${getDisplayTextSync()}`
  );

  logResult('task_1.log', dataset);
}

module.exports = taskRunner;
