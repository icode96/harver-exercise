const fs = require('fs');
const { getRandomWordSync, getRandomWord } = require('word-maker');

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
 * @function timedFunction - Call an sync function to get result with execution time
 * @param {function} f - executable function
 * @param {params} - parameters of the executable function
 * @returns {object} - { lag{string}, result{any} }
 */
const timedFunctionSync = (f, ...params) => {
  const start = new Date();
  const result = f.apply(null, params);
  const lag = `${new Date() - start}ms`;
  return { lag, result };
};

/**
 * @function timedFunction - Call an async function to get result with execution time
 * @param {function} f - executable function
 * @param {params} - parameters of the executable function
 * @returns {object} - { lag{string}, result{any} }
 */
const timedFunction = async (f, ...params) => {
  const start = new Date();
  const result = await f.apply(null, params);
  const lag = `${new Date() - start}ms`;
  return { lag, result };
};

/**
 * @function getDisplayTextSync - Compute text from given params synchronously
 * @param {object} - { [counter]: number, [withFizzBuzz]: boolean, [withErrors]: boolean }
 * @returns {string} - Computed text
 */
const getDisplayTextSync = ({
  counter,
  withFizzBuzz = false,
  withErrors = false,
} = {}) => {
  let text = undefined;

  if (withFizzBuzz) {
    text = getFizzBuzzText(counter);
  }

  try {
    return text || getRandomWordSync({ withErrors });
  } catch (e) {
    return "It shouldn't break anything!";
  }
};

/**
 * @function getDisplayText - Compute text from given params asynchronously
 * @param {object} - { [counter]: number, [slow]: boolean, [withFizzBuzz]: boolean, [withErrors]: boolean }
 * @returns {string} - Computed text
 */
const getDisplayText = async ({
  counter,
  slow = false,
  withFizzBuzz = false,
  withErrors = false,
} = {}) => {
  let text = undefined;

  if (withFizzBuzz) {
    text = getFizzBuzzText(counter);
  }

  try {
    return text || (await getRandomWord({ slow, withErrors }));
  } catch (e) {
    return "It shouldn't break anything!";
  }
};

module.exports = {
  mockArray,
  logResult,
  timedFunctionSync,
  timedFunction,
  getDisplayTextSync,
  getDisplayText,
};
