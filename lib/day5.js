module.exports = {
	// day 5
	isNiceString: isNiceString,
	isNiceStringV2: isNiceStringV2
}

// Day 5
// http://adventofcode.com/day/5
function isNiceString(input) {
	
	var notAllowed = ["ab", "cd", "pq", "xy"];
	var vowels = ["a", "e", "i", "o", "u"];
	
	// Contains 3 vowels
	var vowelCount = 0;
	var consecutiveLetter = false;
	for (var index = 0; index < input.length; index++) {
		var char = input[index];
		if (vowels.indexOf(char) !== -1) {
			vowelCount++;
		}
		
		if (index+1 < input.length && char == input[index+1]) {
			consecutiveLetter = true;
		}
	}
		
	if (vowelCount < 3) {
		return false;
	}
	if (!consecutiveLetter) {
		return false;
	}
	
	// not allowed strings
	var foundNotAllowedString = false;
	notAllowed.forEach(function(notAllowedString) {
		if (input.indexOf(notAllowedString) !== -1) {
			foundNotAllowedString = true;
		}
	}, this); 

	if (foundNotAllowedString)	{
		return false;
	}
	
	return true;
}

function hasRepeatingLetter(input) {
	for (var index = 0; index < input.length - 2; index++) {
		if (input[index] === input[index+2]) {
			return true;
		}
	}
	return false;
} 

function hasPairOfLetters(input) {
	for (var index = 0; index < input.length - 2; index++) {
		var pair = input[index] + input[index+1];
		if (input.indexOf(pair, index + 2) !== -1) {
			return true;
		}
	}
	return false;
}

function isNiceStringV2(input) {
	var repeatingLetter = hasRepeatingLetter(input);
	var pair = hasPairOfLetters(input);
	
	return repeatingLetter && pair;
}