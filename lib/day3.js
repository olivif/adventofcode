module.exports = {
	// day 3
	getHousesCount: getHousesCount,
	getTwoSantasHouseCount: getTwoSantasHouseCount
}

// Day 3
// http://adventofcode.com/day/3
function getHousesCount(input) {
	
	var visitedHouses = getVisitedHouses(input, {});
	
	// Count 
	var total = 0;
	for (var name in visitedHouses) {
		total += visitedHouses[name].length;
	}

	return total;
}

function getVisitedHouses(input, visitedHouses) {
	var x = 0;
	var y = 0;
	visitedHouses[y] = [];
	visitedHouses[y].push(x);
	
	for (var index = 0; index < input.length; index++) {
		var char = input[index];
		
		var locationsResult = visitLocation(char, visitedHouses, x, y);
		visitedHouses = locationsResult.visitedHouses;
		x = locationsResult.x;
		y = locationsResult.y;
	}
	
	return visitedHouses;
}

function visitLocation(char, visitedHouses, x, y) {
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
	
	return { visitedHouses: visitedHouses, x: x, y: y};
}

function mergeSafe(array1, array2) {
	var array1Def = [];
	if (array1 !== undefined) {
		array1Def = array1;
	}
	var array2Def = [];
	if (array2 !== undefined) {
		array2Def = array2;
	}
	
	return array1Def.concat(array2Def);
}

function getDistinct(array) {
	function onlyUnique(value, index, self) { 
		return self.indexOf(value) === index;
	}
	
	return array.filter(onlyUnique); 	
}

function getTwoSantasHouseCount(input) {
	
	// build 2 strings
	var santaInput1 = ""; 
	var santaInput2 = ""; 
	for (var index = 0; index < input.length; index++) {
		var char = input[index];
		
		if (index % 2 == 0) {
			santaInput1 += char;
		} else {
			santaInput2 += char;
		}
	}
	
	var visitedHouses1 = getVisitedHouses(santaInput1, {});
	var visitedHouses2 = getVisitedHouses(santaInput2, {});
	
	// Merge them
	var keys = [];
	for (var name in visitedHouses1) {
		keys.push(name);
	}
	for (var name in visitedHouses2) {
		if (keys.indexOf(name) === -1) {
			keys.push(name);
		}
	}
	
	// Count 
	var total = 0;
	for (var index = 0; index < keys.length; index++) {
		var key = keys[index];
		// Merge arrays
		var houses = mergeSafe(visitedHouses1[key], visitedHouses2[key]);
		houses = getDistinct(houses);
		// count
		total += houses.length;
	}

	return total;
}