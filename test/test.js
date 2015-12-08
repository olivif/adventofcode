var should = require("should");
var main = require("./../lib/adventofcode");
var fs = require('fs');

function runTestSuite(testCases, processCallback, comparisonCallback) {
	for (var index = 0; index < testCases.length; index++) {
		var testCase = testCases[index];
		
		var output = processCallback(testCase.input)
		
		if (comparisonCallback === undefined) {
			// default to equals op
			output.should.equal(testCase.output);
		} else {
			comparisonCallback(output, testCase.output);
		}
	}
}

describe("day1", function() {

	it("should be able to count floors A", function(done) {
	
		var testCases = [
		{ input: "(())", output: 0 },
		{ input: "()()", output: 0 },
		{ input: "(((", output: 3 },
		{ input: "(()(()(", output: 3 },
		{ input: "))(((((", output: 3 },
		{ input: "())", output: -1 },
		{ input: "))(", output: -1 },
		{ input: ")))", output: -3 },
		{ input: ")())())", output: -3 }
		];
		
		runTestSuite(testCases, main.getFloors);
		
		done();
	});
	
		it("should be able to count floors B", function(done) {
		
		var testCases = [
			{ input: ")", output: 1 },
			{ input: "()())", output: 5 }
		];
		
		runTestSuite(testCases, main.getBasementIndex);
		
		done();
	});
	
	it("should be able to count floors answer A", function(done) {
	
		var answerInput = fs.readFileSync('data/day1in.txt').toString();
		var output = main.getFloors(answerInput);
		output.should.equal(280);
		
		console.log(output);
		
		done();
	});
	
	it("should be able to count floors answer B", function(done) {
	
		var answerInput = fs.readFileSync('data/day1in.txt').toString();
		var output = main.getBasementIndex(answerInput);
		output.should.equal(1797);
		
		console.log(output);
		
		done();
	});
 
});

describe("day2", function() {

	it("should be able to calculate wrapping paper A1", function(done) {
	
		var output = main.getWrappingPaper(2, 3, 4);
		output.should.equal(58);
		
		done();
	});
	
	it("should be able to calculate wrapping paper A2", function(done) {
	
		var output = main.getWrappingPaper(1, 1, 10);
		output.should.equal(43);

		done();
	});
  
  	it("should be able to calculate wrapping paper B1", function(done) {
	
		var output = main.getRibbon(2, 3, 4);
		output.should.equal(34);
		
		done();
	});
	
	it("should be able to calculate wrapping paper B2", function(done) {
	
		var output = main.getRibbon(1, 1, 10);
		output.should.equal(14);
		
		done();
	});
	
  	it("should be able to calculate wrapping paper answer A", function(done) {
	
		var array = fs.readFileSync('data/day2in.txt').toString().split("\n");
		var total = 0;

		for(var i in array) {
			var input = array[i].split("x");
			var output = main.getWrappingPaper(input[0], input[1], input[2]);
			
			total += output;
		}
		
		total.should.equal(1588178);
		done();
	});
	
	it("should be able to calculate wrapping paper answer B", function(done) {
	
		var array = fs.readFileSync('data/day2in.txt').toString().split("\n");
		var total = 0;

		for(var i in array) {
			var input = array[i].split("x");
			var output = main.getRibbon(input[0], input[1], input[2]);
			
			total += output;
		}
		
		total.should.equal(3783758);
		done();
	});
	
});

describe("day3", function() {

	it("should be able to count houses A", function(done) {
	
		var testCases = [
			{ input: ">", output: 2 },
			{ input: "^>v<", output: 4 },
			{ input: "^v^v^v^v^v", output: 2 }
		];
		
		runTestSuite(testCases, main.getHousesCount);
		
		done();
	});

	it("should be able to count houses B", function(done) {
	
		var testCases = [
			{ input: "^v", output: 3 },
			{ input: "^>v<", output: 3 },
			{ input: "^v^v^v^v^v", output: 11 }
		];
		
		runTestSuite(testCases, main.getTwoSantasHouseCount);
		
		done();
	});
	
	it("should be able to count houses answer A", function(done) {
	
		var answerInput = fs.readFileSync('data/day3in.txt').toString();
		var output = main.getHousesCount(answerInput);
		
		output.should.equal(2592);
		
		done();
	});
	
	it("should be able to count houses answer B", function(done) {
	
		var answerInput = fs.readFileSync('data/day3in.txt').toString();
		var output = main.getTwoSantasHouseCount(answerInput);
		
		output.should.equal(2360);
		
		done();
	});
	
});

describe("day4", function() {

	var zeroes5 = "00000";
	var zeroes6 = "000000";

	xit("should be able to get salt A1", function(done) {
	
		var output = main.getHashSalt("abcdef", zeroes5);
		output.should.equal(609043);
		
		done();
	});
	
	xit("should be able to get salt A2", function(done) {
	
		var output = main.getHashSalt("pqrstuv", zeroes5);
		output.should.equal(1048970);
		
		done();
	});
	
	xit("should be able to get salt answer A", function(done) {
	
		var output = main.getHashSalt("yzbqklnj", zeroes5);
		output.should.equal(282749);
		
		done();
	});
	
	xit("should be able to get salt answer B", function(done) {
	
		var output = main.getHashSalt("yzbqklnj", zeroes6);
		output.should.equal(9962624);
		
		done();
	});
	
});

describe("day5", function() {

	it("should be able to get nice string A", function(done) {
	
		var testCases = [
			{ input: "ugknbfddgicrmopn", output: true },
			{ input: "aaa", output: true },
			{ input: "jchzalrnumimnmhp", output: false },
			{ input: "haegwjzuvuyypxyu", output: false },
			{ input: "dvszwmarrgswjxmb", output: false }
		];
	
		runTestSuite(testCases, main.isNiceString);
		
		done();
	});
	
	it("should be able to get nice string B", function(done) {
	
		var testCases = [
			{ input: "qjhvhtzxzqqjkmpb", output: true },
			{ input: "xxyxx", output: true },
			{ input: "uurcxstgmygtbstg", output: false },
			{ input: "ieodomkazucvgmuy", output: false }
		];
	
		runTestSuite(testCases, main.isNiceStringV2);
		
		done();
	});
	
	it("should be able to get nice string answer A", function(done) {
	
		var array = fs.readFileSync('data/day5in.txt').toString().split("\n");
		var total = 0;

		for(var i in array) {
			var input = array[i];
			var output = main.isNiceString(input);
			
			if (output ) {
				total++;
			}
		}
		
		total.should.equal(236);
		done();
	});
	
	it("should be able to get nice string answer B", function(done) {
	
		var array = fs.readFileSync('data/day5in.txt').toString().split("\n");
		var total = 0;

		for(var i in array) {
			var input = array[i];
			var output = main.isNiceStringV2(input);
			
			if (output) {
				total++;
			}
		}
		
		total.should.equal(51);
		done();
	});
});
	
describe("day6", function() {

	it("should be able to parse instruction type", function(done) {
	
		var testCases = [
			{ input: "turn on 887,9 through 959,629", output: "turn on" },
			{ input: "turn off 301,3 through 808,453", output: "turn off" },
			{ input: "toggle 294,259 through 474,326", output: "toggle" },
		];
	
		runTestSuite(testCases, main.parseInstruction, function(actualOutput, expectedOutput) {
			return expectedOutput.should.equal(actualOutput.type);
		});
				
		done();
	});
	
	it("should be able to parse instruction top XY", function(done) {
	
		var testCases = [
			{ input: "turn on 887,9 through 959,629", output: {topX: 887, topY: 9} },
			{ input: "turn off 301,3 through 808,453", output: {topX: 301, topY: 3} },
			{ input: "toggle 294,259 through 474,326", output: {topX: 294, topY: 259} },
		];
	
		runTestSuite(testCases, main.parseInstruction, function(actualOutput, expectedOutput) {
			return expectedOutput.topX.should.equal(actualOutput.topX);
			return expectedOutput.topY.should.equal(actualOutput.topY);
		});
				
		done();
	});
	
	it("should be able to parse instruction bottom XY", function(done) {
	
		var testCases = [
			{ input: "turn on 887,9 through 959,629", output: {bottomX: 959, bottomY: 629} },
			{ input: "turn off 301,3 through 808,453", output: {bottomX: 808, bottomY: 453} },
			{ input: "toggle 294,259 through 474,326", output: {bottomX: 474, bottomY: 326} },
		];
	
		runTestSuite(testCases, main.parseInstruction, function(actualOutput, expectedOutput) {
			return expectedOutput.bottomX.should.equal(actualOutput.bottomX);
			return expectedOutput.bottomY.should.equal(actualOutput.bottomY);
		});
				
		done();
	});
	
	it("should be able to count lights A", function(done) {
	
		var testCases = [
			{ input: ["turn on 0,0 through 999,999"], output: 1000000 },
			{ input: ["toggle 0,0 through 999,0"], output: 1000 },
			{ input: ["turn off 499,499 through 500,500"], output: 0 },
		];
	
		runTestSuite(testCases, main.runLightsInstructions);
				
		done();
	});
	
	it("should be able to count lights answer A", function(done) {
	
		var array = fs.readFileSync('data/day6in.txt').toString().split("\n");
	
		var output = main.runLightsInstructions(array);
		output.should.equal(377891);
				
		done();
	});
	
});		