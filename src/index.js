const { timedFunctionSync, timedFunction } = require('./utils');
const {
  task1,
  task2,
  task3: { taskRunner: task3, taskRunnerFizzBuzz: task3FizzBuzz },
  task4: { taskRunnerSync: task4Sync, taskRunner: task4 },
  slow: { taskRunner: slow, taskRunnerFizzBuzz: slowFizzBuzz },
} = require('./tasks');

(async () => {
  const { lag: task1Lag } = timedFunctionSync(task1);
  const { lag: task2Lag } = timedFunctionSync(task2);
  const { lag: task3iLag } = await timedFunction(task3);
  const { lag: task3iiLag } = await timedFunction(task3FizzBuzz);
  const { lag: task4iLag } = timedFunctionSync(task4Sync);
  const { lag: task4iiLag } = await timedFunction(task4);
  const { lag: task5iLag } = await timedFunction(slow);
  const { lag: task5iiLag } = await timedFunction(slowFizzBuzz);

  console.log(`
  ************************ Execution Time Result ************************

  > Task 1 (Random word)                                    : ${task1Lag}
  > Task 2 (Random word, FizzBuzz)                          : ${task2Lag}
  > Task 3 Step 1 (Async random word)                       : ${task3iLag}
  > Task 3 Step 2 (Async random word, FizzBuzz)             : ${task3iiLag}
  > Task 4 Step 1 (Random word, FizzBuzz, error text)       : ${task4iLag}
  > Task 4 Step 2 (Async random word, FizzBuzz, error text) : ${task4iiLag}
  > Task 5 Step 1 (Random word - slow mode)                 : ${task5iLag}
  > Task 5 Step 2 (Random word, FizzBuzz - slow mode)       : ${task5iiLag}

  ************************************************************************
`);
})();
