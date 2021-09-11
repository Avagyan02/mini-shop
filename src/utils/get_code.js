function getRandom(min, max) {
  return Math.floor(Math.random() * max - min + 1) + min;
}

function getRandomCode(str, length) {
  let result = '';

  for (let i = 0; i <= length; i++) {
    result += str[getRandom(0, str.length - 1)];
  }

  return result;
}

module.exports = getRandomCode;
