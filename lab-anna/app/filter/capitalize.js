'use strict';

module.exports = function() {
  return capitalize;
};

function capitalize(input) {
  let firstLetter = input.slice(0,1);
  return input.replace(firstLetter, firstLetter.toUpperCase());
}
