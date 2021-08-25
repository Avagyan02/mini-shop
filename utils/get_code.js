let result = '';
let str = '0123456789qwertyuiopasdfghjkl';

for(i = 0; i <= 8; i++){
	result += str[getRandom(0, str.length - 1)];    
}

function getRandom(min, max){
	return Math.floor(Math.random() * max - min + 1) + min;
}

module.exports = result;