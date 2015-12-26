module.exports = {
	// day 6
	runLightsInstructionsA: runLightsInstructionsA,
	runLightsInstructionsB: runLightsInstructionsB,
	runLightsInstructions: runLightsInstructions,
	parseInstruction: parseInstruction
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