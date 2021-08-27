function getRandomCode(str, length){
	let result = '';

	for(i = 0; i <= length; i++){
		result += str[getRandom(0, str.length - 1)];    
	}

  return result;
}

function getRandom(min, max){
  return Math.floor(Math.random() * max - min + 1) + min;
}

module.exports = getRandomCode;