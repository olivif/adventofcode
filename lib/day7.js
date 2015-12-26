var fs = require('fs');

module.exports = {
	// day 7
	parseAssignmentOperation: parseAssignmentOperation,
	runAssignmentOperations: runAssignmentOperations
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