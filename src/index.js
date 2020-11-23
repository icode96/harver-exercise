const fs = require('fs');
const { getRandomWordSync, getRandomWord } = require('word-maker');

// [1, 2, ... 100]
const mockArray = [...Array(101).keys()].slice(1);

/**
 * @function getFizzBuzzText - Compute FizzBuzz text
 * @param {number} counter
 * @returns {string}
 */
const getFizzBuzzText = (counter) =>
  `${counter % 3 === 0 ? 'Fizz' : ''}${counter % 5 === 0 ? 'Buzz' : ''}`;

/**
 * @function logResult - Write give dataset to external file in the rool
 * @param {string} fileName - file name to be written
 * @param {Array} dataset - dataset to be written to file
 * @param {boolean} [logConsole] - bool to write data into console
 * @returns {void}
 */
const logResult = (
  fileName = 'unknown.log',
  dataset = [],
  logConsole = false
) => {
  if (logConsole) {
    dataset.forEach((data) => console.log(data));
  }

  fs.writeFile(fileName, dataset.join('\n'), function (err) {
    if (err) throw err;
  });
};

/**
 * @function task1
 * @description Print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word
 */
function task1() {
  const dataset = mockArray.map(
    (counter) => `${counter}: ${getRandomWordSync()}`
  );

  logResult('task_1.log', dataset);
}

/**
 * @function task2
 * @description Print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word,
 *              multiples of three, print "Fizz" (instead of the random word),
 *              for multiples of five, print "Buzz" and for numbers which are both multiples of three and five,
 *              print "FizzBuzz"
 */
function task2() {
  const dataset = mockArray.map((counter) => {
    const fizzBuzzText = getFizzBuzzText(counter);
    const text = fizzBuzzText || getRandomWordSync();

    return `${counter}: ${text}`;
  });

  logResult('task_2.log', dataset);
}

/**
 * @function task3 Step 1 [With random word]
 * @description Asynchronously print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word
 */
async function task3() {
  const promiseMap = mockArray.map(async (counter) => {
    const text = await getRandomWord();
    return `${counter}: ${text}`;
  });

  const dataset = await Promise.all(promiseMap);

  logResult('task_3__step_1.log', dataset);
}

/**
 * @function task3FizzBuzz Step 2 [With random word and FizzBuzz]
 * @description Asynchronously print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word,
 *              multiples of three, print "Fizz" (instead of the random word),
 *              for multiples of five, print "Buzz" and for numbers which are both multiples of three and five,
 *              print "FizzBuzz"
 */
async function task3FizzBuzz() {
  const promiseMap = mockArray.map(async (counter) => {
    const fizzBuzzText = getFizzBuzzText(counter);
    const text = fizzBuzzText || (await getRandomWord());
    return `${counter}: ${text}`;
  });

  const dataset = await Promise.all(promiseMap);

  logResult('task_3__step_2.log', dataset);
}

/**
 * @function task4Sync Step 1 [With random word and error text]
 * @description Print numbers from 1 to 100 to the console/file,
 *              When an error is caught, it shoyld print "It shouldn't break anything!"
 *              instead of the random word, "Fizz", "Buzz" or "FizzBuzz"
 */
function task4Sync() {
  const dataset = mockArray.map((counter) => {
    const fizzBuzzText = getFizzBuzzText(counter);
    let text = '';

    try {
      text = fizzBuzzText || getRandomWordSync({ withErrors: true });
    } catch (error) {
      text = "It shouldn't break anything!";
    }

    return `${counter}: ${text}`;
  });

  logResult('task_4__step_1.log', dataset);
}

/**
 * @function task4 Step 1 [With random word and error text]
 * @description Asynchronously print numbers from 1 to 100 to the console/file,
 *              When an error is caught, it shoyld print "It shouldn't break anything!"
 *              instead of the random word, "Fizz", "Buzz" or "FizzBuzz"
 */
async function task4() {
  const promiseMap = mockArray.map(async (counter) => {
    const fizzBuzzText = getFizzBuzzText(counter);
    let text = '';

    try {
      text = fizzBuzzText || (await getRandomWord({ withErrors: true }));
    } catch (error) {
      text = "It shouldn't break anything!";
    }

    return `${counter}: ${text}`;
  });

  const dataset = await Promise.all(promiseMap);

  logResult('task_4__step_2.log', dataset);
}

/**
 * @function slow Step 1 [With random word - slow mode]
 * @description Asynchronously print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word
 */
async function slow() {
  const start = new Date();

  const promiseMap = mockArray.map(async (counter) => {
    const fizzBuzzText = getFizzBuzzText(counter);
    const text = fizzBuzzText || (await getRandomWord({ slow: true }));
    return `${counter}: ${text}`;
  });

  const dataset = await Promise.all(promiseMap);

  logResult('slow__step_1.log', dataset);
  console.log(`Slow mode:1 Execution time: ${new Date() - start}ms`);
}

/**
 * @function slowFizzBuzz Step 2 [With random word and FizzBuzz - slow mode]
 * @description Asynchronously print numbers from 1 to 100 to the console/file,
 *              but for each number also print a random word,
 *              multiples of three, print "Fizz" (instead of the random word),
 *              for multiples of five, print "Buzz" and for numbers which are both multiples of three and five,
 *              print "FizzBuzz"
 */
async function slowFizzBuzz() {
  const start = new Date();

  const promiseMap = mockArray.map(async (counter) => {
    const fizzBuzzText = getFizzBuzzText(counter);
    let text = '';

    try {
      text =
        fizzBuzzText || (await getRandomWord({ withErrors: true, slow: true }));
    } catch (error) {
      text = "It shouldn't break anything!";
    }

    return `${counter}: ${text}`;
  });

  const dataset = await Promise.all(promiseMap);

  logResult('slow__step_2.log', dataset);
  console.log(`Slow mode:2 Execution time: ${new Date() - start}ms`);
}

// Executors --->
task1();
task2();
task3();
task3FizzBuzz();
task4Sync();
task4();
slow();
slowFizzBuzz();
