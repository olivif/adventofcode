var Combinatorics = require('js-combinatorics');

function findSolutions() {
    
    var max = 150;
    var set = [11,30,47,31,32,36,3,1,5,3,32,36,15,11,46,26,28,1,19,3];
    var combinations = Combinatorics.power(set).toArray();
    var foundSolutions = [];
    
    for(var combination of combinations) {
        var total = 0;
        for (var key in combination) {
            if (combination.hasOwnProperty(key)) {
                total += combination[key];
            }
        }

        if (total === max) {
            foundSolutions.push(combination);
        }
    }
    
    return foundSolutions;
}

function getMinLength(solutions) {
    var min = Number.MAX_VALUE;
    for(var combination of solutions) {
        if (combination.length < min) {
            min = combination.length;
        }
    }
    return min;
}

function getMinLengthCount() {
    var solutions = findSolutions();
    var min = getMinLength(solutions); 
    
    var count = 0;
    for(var combination of solutions) {
        if (combination.length === min) {
            count++;
        }
    }
    
    return count;
}

console.log(getMinLengthCount());
