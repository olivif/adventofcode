module.exports = {
	// day 8
	getStringCodeLength: getStringCodeLength,
	getStringTotalLength: getStringTotalLength,
	getStringLengthDiff: getStringLengthDiff
};

// Day 8
// http://adventofcode.com/day/8
function getStringCodeLength(string) {
    var evaluatedString = eval(string); 
	return evaluatedString.length;
}

function getStringTotalLength(string) {
	return string.length;
}

function getStringLengthDiff(string) {
	return getStringTotalLength(string) - getStringCodeLength(string);
}