module.exports = {
	// day 8
	getStringCodeLength: getStringCodeLength,
	getStringTotalLength: getStringTotalLength,
    gesl: getEncodedStringLength
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

function getEncodedStringLength(string) {
  var encodedString = string
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"');
                  
  encodedString = `"${encodedString}"`;
  return encodedString.length;
}