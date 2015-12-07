var should = require("should");
var main = require("./../lib/adventofcode");
var fs = require('fs');

function runTestSuite(testCases, processCallback) {
	for (var index = 0; index < testCases.length; index++) {
		var testCase = testCases[index];
		
		var output = processCallback(testCase.input)
		output.should.equal(testCase.output);
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
		
		output.should.equal(2356);
		
		done();
	});
	
});

describe("day4", function() {

	xit("should be able to get salt 1", function(done) {
	
		var output = main.getHashSalt("abcdef");
		output.should.equal(609043);
		
		done();
	});
	
	xit("should be able to get salt 2", function(done) {
	
		var output = main.getHashSalt("pqrstuv");
		output.should.equal(1048970);
		
		done();
	});
	
	xit("should be able to get salt answer", function(done) {
	
		var output = main.getHashSalt("yzbqklnj");
		output.should.equal(282749);
		
		done();
	});
});

describe("day5", function() {

	it("should be able to get nice string", function(done) {
	
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
	
	it("should be able to get nice string answer", function(done) {
	
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
});
	
		