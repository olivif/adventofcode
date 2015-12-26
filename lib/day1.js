module.exports = {
	getFloors: getFloors,
	getBasementIndex: getBasementIndex
}

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