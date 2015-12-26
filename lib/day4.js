var md5 = require('js-md5');

module.exports = {
	// day 4
	getHashSalt: getHashSalt
}

// Day 4
// http://adventofcode.com/day/4
function getHashSalt(input, leadingString) {
	for (var salt = 0; ; salt++) {
		var md5Hash = md5(input + salt);
		if (md5Hash.lastIndexOf(leadingString, 0) === 0) {
			return salt;
		}
	}
	return -1;	
}