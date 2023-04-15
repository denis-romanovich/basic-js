const { NotImplementedError } = require("../extensions/index.js");

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  const seasons = [
    { numbers: [0, 1, 11], name: `winter` },
    { numbers: [5, 6, 7], name: `summer` },
    { numbers: [8, 9, 10], name: `autumn` },
    { numbers: [2, 3, 4], name: `spring` },
  ];

  if (typeof date == `undefined`) {
    return "Unable to determine the time of year!";
  }

  try {
    date.getTime();
  } catch {
    throw new Error(`Invalid date!`);
  }

  return seasons.find(season => season.numbers.includes(date.getMonth())).name;
}

module.exports = {
  getSeason,
};
