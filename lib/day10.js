module.exports = {
    lookAndSay: lookAndSay
}

// Day 10
// http://adventofcode.com/day/10
function lookAndSay(input) {
    
    var counter = 1;
    var output = "";
    
    if (input.length === 1) {
        return input + 1;
    }
    
    for (var index = 1; index < input.length; index++) {
        var currentC = input[index - 1];
        var nextC = input[index];
        
        if (currentC === nextC) {
            counter++;
        } else {
            output += counter + currentC;
            counter = 1;
        }
    }
    output += counter + input[input.length-1];
    
    return output;
}