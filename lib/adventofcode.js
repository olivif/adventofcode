module.exports = {
  getFloors: getFloors,
  getWrappingPaper: getWrappingPaper,
  getHousesCount: getHousesCount
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

function getWrappingPaper(length, width, height) {
	var total = getTotalArea(length, width, height);
	var slack = getSmallestArea(length, width, height); 
	return total + slack;
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