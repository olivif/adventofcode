var should = require("should");
var fs = require('fs');

const day1 = require('./../lib/day1');
const day2 = require('./../lib/day2');
const day3 = require('./../lib/day3');
const day4 = require('./../lib/day4');
const day5 = require('./../lib/day5');
const day6 = require('./../lib/day6');
const day7 = require('./../lib/day7');
const day8 = require('./../lib/day8');
const day9 = require('./../lib/day9');
const day10 = require('./../lib/day10');
const day11 = require('./../lib/day11');
const day12 = require('./../lib/day12');

function runTestSuite(testCases, processCallback, comparisonCallback) {
	for (var index = 0; index < testCases.length; index++) {
		var testCase = testCases[index];
		
		var output = processCallback(testCase.input)
		
		if (comparisonCallback === undefined) {
			// default to equals op
			output.should.eql(testCase.output);
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
		
		runTestSuite(testCases, day1.getFloors);
		
		done();
	});
	
		it("should be able to count floors B", function(done) {
		
		var testCases = [
			{ input: ")", output: 1 },
			{ input: "()())", output: 5 }
		];
		
		runTestSuite(testCases, day1.getBasementIndex);
		
		done();
	});
	
	it("should be able to count floors answer A", function(done) {
	
		var answerInput = fs.readFileSync('data/day1in.txt').toString();
		var output = day1.getFloors(answerInput);
		output.should.equal(280);
		
		console.log(output);
		
		done();
	});
	
	it("should be able to count floors answer B", function(done) {
	
		var answerInput = fs.readFileSync('data/day1in.txt').toString();
		var output = day1.getBasementIndex(answerInput);
		output.should.equal(1797);
		
		console.log(output);
		
		done();
	});
 
});

describe("day2", function() {

	it("should be able to calculate wrapping paper A1", function(done) {
	
		var output = day2.getWrappingPaper(2, 3, 4);
		output.should.equal(58);
		
		done();
	});
	
	it("should be able to calculate wrapping paper A2", function(done) {
	
		var output = day2.getWrappingPaper(1, 1, 10);
		output.should.equal(43);

		done();
	});
  
  	it("should be able to calculate wrapping paper B1", function(done) {
	
		var output = day2.getRibbon(2, 3, 4);
		output.should.equal(34);
		
		done();
	});
	
	it("should be able to calculate wrapping paper B2", function(done) {
	
		var output = day2.getRibbon(1, 1, 10);
		output.should.equal(14);
		
		done();
	});
	
  	it("should be able to calculate wrapping paper answer A", function(done) {
	
		var array = fs.readFileSync('data/day2in.txt').toString().split("\n");
		var total = 0;

		for(var i in array) {
			var input = array[i].split("x");
			var output = day2.getWrappingPaper(input[0], input[1], input[2]);
			
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
			var output = day2.getRibbon(input[0], input[1], input[2]);
			
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
		
		runTestSuite(testCases, day3.getHousesCount);
		
		done();
	});

	it("should be able to count houses B", function(done) {
	
		var testCases = [
			{ input: "^v", output: 3 },
			{ input: "^>v<", output: 3 },
			{ input: "^v^v^v^v^v", output: 11 }
		];
		
		runTestSuite(testCases, day3.getTwoSantasHouseCount);
		
		done();
	});
	
	it("should be able to count houses answer A", function(done) {
	
		var answerInput = fs.readFileSync('data/day3in.txt').toString();
		var output = day3.getHousesCount(answerInput);
		
		output.should.equal(2592);
		
		done();
	});
	
	it("should be able to count houses answer B", function(done) {
	
		var answerInput = fs.readFileSync('data/day3in.txt').toString();
		var output = day3.getTwoSantasHouseCount(answerInput);
		
		output.should.equal(2360);
		
		done();
	});
	
});

describe("day4", function() {

	var zeroes5 = "00000";
	var zeroes6 = "000000";

	xit("should be able to get salt A1", function(done) {
	
		var output = day4.getHashSalt("abcdef", zeroes5);
		output.should.equal(609043);
		
		done();
	});
	
	xit("should be able to get salt A2", function(done) {
	
		var output = day4.getHashSalt("pqrstuv", zeroes5);
		output.should.equal(1048970);
		
		done();
	});
	
	xit("should be able to get salt answer A", function(done) {
	
		var output = day4.getHashSalt("yzbqklnj", zeroes5);
		output.should.equal(282749);
		
		done();
	});
	
	xit("should be able to get salt answer B", function(done) {
	
		var output = day4.getHashSalt("yzbqklnj", zeroes6);
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
	
		runTestSuite(testCases, day5.isNiceString);
		
		done();
	});
	
	it("should be able to get nice string B", function(done) {
	
		var testCases = [
			{ input: "qjhvhtzxzqqjkmpb", output: true },
			{ input: "xxyxx", output: true },
			{ input: "uurcxstgmygtbstg", output: false },
			{ input: "ieodomkazucvgmuy", output: false }
		];
	
		runTestSuite(testCases, day5.isNiceStringV2);
		
		done();
	});
	
	it("should be able to get nice string answer A", function(done) {
	
		var array = fs.readFileSync('data/day5in.txt').toString().split("\n");
		var total = 0;

		for(var i in array) {
			var input = array[i];
			var output = day5.isNiceString(input);
			
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
			var output = day5.isNiceStringV2(input);
			
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
	
		runTestSuite(testCases, day6.parseInstruction, function(actualOutput, expectedOutput) {
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
	
		runTestSuite(testCases, day6.parseInstruction, function(actualOutput, expectedOutput) {
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
	
		runTestSuite(testCases, day6.parseInstruction, function(actualOutput, expectedOutput) {
			return expectedOutput.bottomX.should.equal(actualOutput.bottomX);
			return expectedOutput.bottomY.should.equal(actualOutput.bottomY);
		});
				
		done();
	});
	
	xit("should be able to count lights A", function(done) {
	
		var testCases = [
			{ input: ["turn on 0,0 through 999,999"], output: 1000000 },
			{ input: ["toggle 0,0 through 999,0"], output: 1000 },
			{ input: ["turn off 499,499 through 500,500"], output: 0 },
		];
	
		runTestSuite(testCases, day6.runLightsInstructionsA);
				
		done();
	});
	
	xit("should be able to count lights answer A", function(done) {
	
		var array = fs.readFileSync('data/day6in.txt').toString().split("\n");
	
		var output = day6.runLightsInstructionsA(array);
		output.should.equal(377891);
				
		done();
	});
	
	xit("should be able to count lights answer B", function(done) {
	
		var array = fs.readFileSync('data/day6in.txt').toString().split("\n");
	
		var output = day6.runLightsInstructionsB(array);
		output.should.equal(14110788);
				
		done();
	});
	
});		

describe("day7", function() {

	xit("should be able to parse assignment op", function(done) {
	
		var testCases = [
			{ input: "123 -> x", output: {key: "x", value: 123 } },
			{ input: "a AND b -> d", output: {key: "d", value: 2 } },
			{ input: "a OR c -> d", output: {key: "d", value: 10 } },
			{ input: "a LSHIFT c -> d", output: {key: "d", value: 40 } },
			{ input: "a RSHIFT c -> d", output: {key: "d", value: 2 } },
			{ input: "NOT e -> d", output: {key: "d", value: 91 } },
		];
	
		var registry = {
			"a": 10,
			"b": 3,
			"c": 2,
			"e": 90
		};
		
		runTestSuite(testCases, 
			function(input) {
				return day7.parseAssignmentOperation(input, registry);
			}, 
			function(actualOutput, expectedOutput) {
				return expectedOutput.key.should.equal(actualOutput.key);
				return expectedOutput.value.should.equal(actualOutput.value);
			}
		);
				
		done();
	});
	
	it("should be able to run list of ops", function(done) {
		
		var registry = day7.runAssignmentOperations("data/day7in.txt");
		
		registry["d"].should.equal(72);
		registry["e"].should.equal(507);
		registry["f"].should.equal(492);
		registry["g"].should.equal(114);
		registry["h"].should.equal(65412);
		registry["i"].should.equal(65079);
		registry["x"].should.equal(123);
		registry["y"].should.equal(456);
				
		done();
	});
	
	it("should be able to run list of ops answer A", function(done) {
		
		var registry = day7.runAssignmentOperations("data/day7in2.txt");

		registry["a"].should.equal(3176);
				
		done();
	});
	
	it("should be able to run list of ops answer B", function(done) {
		
		var registry = day7.runAssignmentOperations("data/day7in3.txt");

		registry["a"].should.equal(14710);
				
		done();
	});
});

describe("day8", function() {

	it("should be able to get string length", function(done) {
		var testCases = [
			{ input: '""', output: 0},
			{ input: '"abc"', output: 3},
			{ input: '"aaa\\"aaa"', output: 7},
			{ input: '"\\x27"', output: 1},
		];
		
		runTestSuite(testCases, day8.getStringCodeLength);
		
		done();
	});
	
	it("should be able to get string code length", function(done) {
		var testCases = [
			{ input: '""', output: 2},
			{ input: '"abc"', output: 5},
			{ input: '"aaa\\"aaa"', output: 10},
			{ input: '"\\x27"', output: 6},
		];
		
		runTestSuite(testCases, day8.getStringTotalLength);
		
		done();
	});
	
	it("should be able to get string code answer A", function(done) {
		
		var fileName = 'data/day8in.txt';
		var array = fs.readFileSync(fileName, "utf8").split("\r\n");
		var totalLength = 0;
		var codeLength = 0;

		for(var i in array) {
			var input = array[i];
			totalLength += day8.getStringTotalLength(input);
			codeLength += day8.getStringCodeLength(input);
		}
		
		var total = totalLength - codeLength;
		
		total.should.equal(1371);
		done();
	});
    
    it("should be able to encode a string", function(done) {
        
		var testCases = [
			{ input: '""', output: 6},
			{ input: '"abc"', output: 9},
			{ input: '"aaa\\"aaa"', output: 16},
			{ input: '"\\x27"', output: 11}  
		];
		
		runTestSuite(testCases, day8.gesl);
		
		done();
	});

    it("should be able to get string code answer B", function(done) {
		
		var fileName = 'data/day8in.txt';
		var array = fs.readFileSync(fileName, "utf8").split("\r\n");
		var totalLength = 0;
		var encodedLength = 0;

		for(var i in array) {
			var input = array[i];
			totalLength += day8.getStringTotalLength(input);
			encodedLength += day8.gesl(input);
		}
		
		var total = encodedLength - totalLength;
		
		total.should.equal(2117);
		done();
	});
});


describe("day9", function() {

	it("should be able to parse an edge", function(done) {
		var testCases = [
			{ input: 'AlphaCentauri to Snowdin = 66', output: {
                cost: 66,
                from: "AlphaCentauri",
                to: "Snowdin",
                state: ""
            }},
		];
		
		runTestSuite(testCases, day9.parseEdge);
		
		done();
	});
    
     it("should be able to construct graph", function(done) {
		
		var fileName = 'data/day9in1.txt';
		var array = fs.readFileSync(fileName, "utf8").split("\r\n");

        var graph = day9.constructGraph(array);
        console.log(graph);
        
		done();
	});
    
    xit("should get answer part A", function(done) {
        var fileName = 'data/day9in.txt';
        var array = fs.readFileSync(fileName, "utf8").split("\r\n");
        var minCost = day9.getMin(array);
        
        minCost.should.eql(141);
        done();
	});  
    
    xit("should get answer part B", function(done) {
        var fileName = 'data/day9in.txt';
        var array = fs.readFileSync(fileName, "utf8").split("\r\n");
        var minCost = day9.getMax(array);
        
        minCost.should.eql(736);
        done();
	}); 
});

describe("day10", function() {

	it("should be able to generate look and say string", function(done) {
		var testCases = [
			{ input: "1", output: "11" },
			{ input: "11", output: "21" },
			{ input: "21", output: "1211" },
			{ input: "1211", output: "111221" },
			{ input: "111221", output: "312211" },
		];
		
		runTestSuite(testCases, day10.lookAndSay);

		done();
	});
    
    it("should be able to get answer A", function(done) {
        
        var iterations = 40;
        var input = "1321131112";
        for (var index = 0; index < iterations; index++) {
            input = day10.lookAndSay(input);
        }
        
        input.length.should.eql(492982);  

		done();
	});
    
    xit("should be able to get answer B", function(done) {
        
        var iterations = 50;
        var input = "1321131112";
        for (var index = 0; index < iterations; index++) {
            input = day10.lookAndSay(input);
        }
        
        input.length.should.eql(6989950);  

		done();
	});
});

describe("day11", function() {

	it("should be able to check if a password has a straight", function(done) {
		var testCases = [
			{ input: "abc", output: true },
			{ input: "bcd", output: true },
			{ input: "cde", output: true },
			{ input: "xyz", output: true },
			{ input: "abd", output: false }
		];
		
		runTestSuite(testCases, day11.hasStraight);

		done();
	});
    
    it("should be able to check if a password contains forbidden letters", function(done) {
		var testCases = [
			{ input: "abc", output: false },
			{ input: "bcd", output: false },
			{ input: "code", output: true },
			{ input: "xlyz", output: true },
			{ input: "xiyz", output: true },
			{ input: "abd", output: false }
		];
		
		runTestSuite(testCases, day11.containsForbidden);

		done();
	});
    
    it("should be able to check if a password is valid", function(done) {
		var testCases = [
			{ input: "hijklmmn", output: false },
			{ input: "abbceffg", output: false },
			{ input: "abbcegjk", output: false },
			{ input: "abcdffaa", output: true },
			{ input: "ghjaabcc", output: true },
		];
		
		runTestSuite(testCases, day11.isValid);

		done();
	});
    
    it("should be able to get next password", function(done) {
		var testCases = [
			{ input: "abcdefgh", output: "abcdffaa" },
		];
		
		runTestSuite(testCases, day11.getNextPassword);

		done();
	});
    
    it("should be able to get next password A", function(done) {
        
        var input = "vzbxkghb";	
		var output = day11.getNextPassword(input);
        
        output.should.eql("vzbxxyzz");

		done();
	});
    
    it("should be able to get next password B", function(done) {
        
        var input = "vzbxxyzz";	
		var output = day11.getNextPassword(input);
        
        output.should.eql("vzcaabcc");

		done();
	});
});

describe("day12", function() {

	it("should be able to parse json", function(done) {
		var testCases = [
			{ input: JSON.parse("[1,2,3]"), output: 6 },
			{ input: JSON.parse("{\"a\":2,\"b\":4}"), output: 6 },
			{ input: JSON.parse("[[[3]]]"), output: 3 },
			{ input: JSON.parse("{\"a\":[-1,1]}"), output: 0 },
			{ input: JSON.parse("[-1,{\"a\":1}]"), output: 0 },
			{ input: JSON.parse("[]"), output: 0 },
			{ input: JSON.parse("{}"), output: 0 }
		];
		
		runTestSuite(testCases, day12.processJson);
        
		done();
	});
    
    xit("should be able to parse json A", function(done) {
        
        var fileName = 'data/day12in.txt';
        var input = fs.readFileSync(fileName, "utf8");
        
        var output = day12.processJson(JSON.parse(input));
        
        output.should.eql(156366);
		done();
    });
    
    it("new test", function(done) {
        
        var fileName = 'data/day12in.txt';
        var input = fs.readFileSync(fileName, "utf8");
        var json = JSON.parse(input);
        
        var output = day12.processJson(json);
        
        output.should.eql(96852);
		done();
    });
});
