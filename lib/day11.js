module.exports = {
    hasStraight: hasStraight,
    containsForbidden: containsForbidden,
    isValid: isValid,
    incrementPassword: incrementPassword,
    getNextPassword: getNextPassword
}

var alphabet = "abcdefghijklmnopqrstuvwxyz";

// Day 11
// http://adventofcode.com/day/11
function incrementPassword(input) {
    var lastLetter = input[input.length - 1];
    
    if (lastLetter === alphabet[alphabet.length - 1]){
        return incrementPassword(input.slice(0, input.length - 1)) + alphabet[0];
    } else {
        var lastLetterIndex = alphabet.indexOf(lastLetter) + 1;
        return input.slice(0, input.length - 1) + alphabet[lastLetterIndex];
    }
}

function hasStraight(input) {
    var diffs = [];
    for (var index = 0; index < input.length - 1; index++) {
        diffs.push(input.charCodeAt(index+1) - input.charCodeAt(index));
    }
    var diffsString = "," + diffs.toString() + ",";
    return diffsString.indexOf(",1,1,") !== -1;
}

function containsForbidden(input) {
    var forbidden = "iol";
    for (var index = 0; index < forbidden.length; index++) {
        if (input.indexOf(forbidden[index]) !== -1) {
            return true;
        }
    }
    return false; 
}

function hasRepeatingLetter(input) {
    var pairs = 0;
	for (var index = 0; index < input.length - 1; index++) {
		if (input[index] === input[index+1]) {
			pairs++;
            index++;
		}
	}
	return pairs >= 2;
} 

function isValid(input) {
    var a = hasStraight(input);
    var b = !containsForbidden(input);
    var c = hasRepeatingLetter(input);
    
    return a && b && c;
}

function getNextPassword(input) {
    while(true) {
        input = incrementPassword(input);
        if (isValid(input)) {
            return input;
        }
    }
}