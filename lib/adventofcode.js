var md5 = require('js-md5');

module.exports = {
// day 1
  getFloors: getFloors,
  getBasementIndex: getBasementIndex,
// day 2
  getWrappingPaper: getWrappingPaper,
  getRibbon: getRibbon,
// day 3
  getHousesCount: getHousesCount,
// day 4
  getHashSalt: getHashSalt,
// day 5
  isNiceString: isNiceString
};

// Day 1
// http://adventofcode.com/day/1
function getFloors(input) {
	
	var upCount = 0;
	var downCount = 0;
	for (var index = 0; index < input.length; index++) {
		var char = input[index];
		
		if (char === "(") {
			upCount++;
		}
		
		if (char === ")") {
			downCount++;
		}
	}
	
	return upCount - downCount;
}
function getBasementIndex(input) {
	
	var currentFloor = 0;
	for (var index = 0; index < input.length; index++) {
		var char = input[index];
		
		if (char === "(") {
			currentFloor++;
		}
		
		if (char === ")") {
			currentFloor--;
		}
		
		if (currentFloor == -1) {
			return index + 1;			
		}
	}
	
	return -1;
}

// Day 2
// http://adventofcode.com/day/2
function getAreas(length, width, height) {
	return [
		length * width, 
		length * height, 
		width * height
	];	
}

function getTotalArea(length, width, height) {
	var areas = getAreas(length, width, height);
	var total = 0;
	areas.forEach(function(area) {
		total += area * 2;
	});
	
	return total;
}

function getSmallestArea(length, width, height) {
	var areas = getAreas(length, width, height);
	return Math.min.apply(null, areas);
}

function getVolume(length, width, height) {
	return length * width * height;
}

function getSmallestPerimeter(length, width, height) {
	var perimeters = [
		2 * length + 2 * width,
		2 * length + 2 * height,
		2 * height + 2 * width
	];
	
	return Math.min.apply(null, perimeters);
}

function getWrappingPaper(length, width, height) {
	var total = getTotalArea(length, width, height);
	var slack = getSmallestArea(length, width, height); 
	return total + slack;
}

function getRibbon(length, width, height) {
	var volume = getVolume(length, width, height);
	var smallestPerimeter = getSmallestPerimeter(length, width, height);
	return volume + smallestPerimeter;
}

// Day 3
// http://adventofcode.com/day/3
function getHousesCount(input) {
	
	var visitedHouses = {};
	var x = 0;
	var y = 0;
	visitedHouses[y] = [];
	visitedHouses[y].push(x);
	
	for (var index = 0; index < input.length; index++) {
		var char = input[index];
		
		switch (char) {
			case '<':
				x--;
				break;
			case '>':
				x++;
				break;
			case '^':
				y--;
				break;
			case 'v':
				y++;
				break;
		}
		
		// Update visited count
		if (visitedHouses[y] === undefined) {
			visitedHouses[y] = [];
		}
		
		if (visitedHouses[y].indexOf(x) === -1) {
			visitedHouses[y].push(x);
		}
	}
	
	// Count 
	var total = 0;
	for (var name in visitedHouses) {
		total += visitedHouses[name].length;
	}

	return total;
}

// Day 4
// http://adventofcode.com/day/4
function getHashSalt(input) {
	for (var salt = 0; ; salt++) {
		var md5Hash = md5(input + salt);
		if (md5Hash.lastIndexOf("00000", 0) === 0) {
			return salt;
		}
	}
	return -1;	
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