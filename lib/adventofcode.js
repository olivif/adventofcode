var md5 = require('js-md5');
var fs = require('fs');

module.exports = {
// day 1
  getFloors: getFloors,
  getBasementIndex: getBasementIndex,
// day 2
  getWrappingPaper: getWrappingPaper,
  getRibbon: getRibbon,
// day 3
  getHousesCount: getHousesCount,
  getTwoSantasHouseCount: getTwoSantasHouseCount,
// day 4
  getHashSalt: getHashSalt,
// day 5
  isNiceString: isNiceString,
  isNiceStringV2: isNiceStringV2,
// day 6
  runLightsInstructionsA: runLightsInstructionsA,
  runLightsInstructionsB: runLightsInstructionsB,
  runLightsInstructions: runLightsInstructions,
  parseInstruction: parseInstruction,
// day 7
  parseAssignmentOperation: parseAssignmentOperation,
  runAssignmentOperations: runAssignmentOperations 
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

// Day 6
// http://adventofcode.com/day/6
var on = "turn on";
var off = "turn off";
var toggle = "toggle";
var through = "through";

function runLightsInstructionsA(instructions) {
	return runLightsInstructions(instructions, runInstructionA);	
}

function runLightsInstructionsB(instructions) {
	return runLightsInstructions(instructions, runInstructionB);	
}

function runLightsInstructions(instructions, runInstruction) {
	
	var n = 1000;
	var grid = initGrid(n, n);
	
	for (var index = 0; index < instructions.length; index++) {
		var instructionString = instructions[index];
		var instruction = parseInstruction(instructionString, grid);
		grid = runInstruction(instruction, grid);
	}
	
	return countLights(grid, n, n);
}

function countLights(grid, n, m) {

	var total = 0;
	for (var i = 0; i < n; i++) {
		for(var j = 0; j < m; j++){
			total += grid[i][j];
		}
	}
	return total;	
}

function initGrid(n, m) {
	var grid = [[]];
	for (var i = 0; i < n; i++) {
		grid[i] = [];
		for (var j = 0; j < m; j++) {
			grid[i][j] = 0;
		}
	}
	return grid;
}

function parseXY(string, start, end) {
	var xyPart = string.substr(start, end);
	var xy = xyPart.split(',');
	
	var x = parseInt(xy[0]);
	var y = parseInt(xy[1]);
	
	return {x:x, y:y};
}

function parseInstruction(instruction, grid) {
	var instructionResult = {};

	// Get instruction type
	var instructionTypePos = -1;	
	if ((instructionTypePos = instruction.indexOf(on)) !== -1) {
		instructionResult.type = on;
	} else if ((instructionTypePos = instruction.indexOf(off)) !== -1) {
		instructionResult.type = off;
	} else if ((instructionTypePos = instruction.indexOf(toggle)) !== -1) {
		instructionResult.type = toggle;
	}

	// Get topX, topY
	var throughPos = instruction.indexOf(through);
	var start = instructionTypePos + instructionResult.type.length + 1;
	var end = throughPos - start - 1;
	var topXY = parseXY(instruction, start, end);
	instructionResult.topX = topXY.x;
	instructionResult.topY = topXY.y;
	
	// Get bottomX, bottomY
	start = throughPos + through.length + 1;
	end = instruction.length - start;
	var bottomXY = parseXY(instruction, start, end);
	instructionResult.bottomX = bottomXY.x;
	instructionResult.bottomY = bottomXY.y;
	
	return instructionResult;
}

function modifyGrid(grid, topX, topY, bottomX, bottomY, callback) {

	for (var i = topY; i <= bottomY; i++) {
		for(var j = topX; j <= bottomX; j++){
			grid[i][j] = callback(grid[i][j]);
		}
	}
	return grid;	
}

function runInstructionA(instruction, grid) {
	
	var callback;
	
	switch (instruction.type) {
		case on:
			callback = function(item) {
				return 1;
			};
			break;
		case off:
			callback = function(item) {
				return 0;
			};
			break;
		case toggle:
			callback = function(item) {
				return item === 1 ? 0 : 1;
			};
			break;
	}
	
	return modifyGrid(
		grid, 
		instruction.topX, 
		instruction.topY, 
		instruction.bottomX, 
		instruction.bottomY,
		callback
		); 
}

function runInstructionB(instruction, grid) {
	
	var callback;
	
	switch (instruction.type) {
		case on:
			callback = function(item) {
				return item + 1;
			};
			break;
		case off:
			callback = function(item) {
				return item === 0 ? 0 : item - 1;
			};
			break;
		case toggle:
			callback = function(item) {
				return item + 2;
			};
			break;
	}
	
	return modifyGrid(
		grid, 
		instruction.topX, 
		instruction.topY, 
		instruction.bottomX, 
		instruction.bottomY,
		callback
		); 
}

// Day 7
// http://adventofcode.com/day/7
function runAssignmentOperations(inputFileName) {
	var operations = fs.readFileSync(inputFileName).toString().split("\r\n");
	var registry = {};
	
	return runAssignmentOperationsInternal(operations, registry);
}

function runAssignmentOperationsInternal(operations, registry) {
	
	var remainingOperations = [];
	
	for (var index = 0; index < operations.length; index++) {
		var operation = operations[index];
		var operationResult = parseAssignmentOperation(operation, registry);
		
		if (operationResult === null) {
			remainingOperations.push(operation);
		} else {
			registry[operationResult.key] = operationResult.value;
		}
	}

	if (remainingOperations.length > 0) {
		return runAssignmentOperationsInternal(remainingOperations, registry)
	} else {
		return registry;
	}
}

function parseAssignmentOperation(input, registry) {
	
	var split = input.split(" -> ");
	
	var left = split[0];
	var right = split[1];
	
	var value = processBitWiseInstruction(left, registry);
	
	if (value === null) {
		return null;
	}
	
	return { key: right, value: value};
}

function processBitWiseInstruction(instruction, registry) {
	
	var split = instruction.split(" ");
	var value = 0;
	
	if (split.length === 1) {
		value = resolveValue(split[0	], registry);
		
		if (value === null || value === undefined || isNaN(value)) {
			return null;
		}
		
	} else if (split.length === 2) {
		var a = resolveValue(split[1], registry);
		
		if (a === null || a === undefined || isNaN(a)) {
			return null;
		}
		
		switch (split[0]) {
			case "NOT": value = ~a & 0xFFFF; break;
		}
	} else if (split.length === 3) {
		var a = resolveValue(split[0], registry);
		var b = resolveValue(split[2], registry);
		
		if (a === null || a === undefined || b === null || b === undefined ) {
			return null;
		}
		
		switch (split[1]) {
			case "AND": value = a & b; break;
			case "OR": value = a | b; break;
			case "LSHIFT": value = a << b; break;
			case "RSHIFT": value = a >> b; break;
		}
	}
	
	return value;
}

function resolveValue(token, registry) {
	var number = parseFloat(token);
	
	if (isNaN(number)) {
		// must be a variable
		number = registry[token];
	}
	
	return number;
}