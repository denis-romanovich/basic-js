const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr))
    throw new Error(`'arr' parameter must be an instance of the Array!`);

  let array = [];

  for (let key in arr) {
    array[key] = arr[key];
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i] == `--discard-next`) {
      if (array[i + 1]) {
        array[i + 1] = null;
      }

      array[i] = null;
    }

    if (array[i] == "--discard-prev") {
      if (array[i - 1]) {
        array[i - 1] = null;
      }

      array[i] = null;
    }

    if (array[i] == `--double-next`) {
      if (array[i + 1]) {
        array[i] = array[i + 1];
      }else{
        array[i] = null;
      }
    }

    if (array[i] == `--double-prev`) {
      if (array[i - 1]) {
        array[i] = array[i - 1];
      }else{
        array[i] = null;
      }
    }
  }

  return array.filter((a) => a !== null);
}

module.exports = {
  transform,
};
