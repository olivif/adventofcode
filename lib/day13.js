var permutations = require('array-permutation');

module.exports = {
    parseHappinessStatement: parseHappinessStatement,
    parseHappinessStatements: parseHappinessStatements,
    getUniquePeople: getUniquePeople,
    getOptimalSeating: getOptimalSeating
};

function getUnique(array)
{
    var n = []; 
    for(var i = 0; i < array.length; i++) 
    {
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}
    
function parseHappinessStatements(statements) {
    var list = [];
    statements.forEach(function(statement) {
        var s = parseHappinessStatement(statement);
        list.push(s);
    }, this);
    
    return list;
}

function parseHappinessStatement(statementString) {
    statementString = statementString.replace(" would gain ", ",");
    statementString = statementString.replace(" would lose ", ",-");
    statementString = statementString.replace(" happiness units by sitting next to ", ",");
    statementString = statementString.replace(".", "");
    var split = statementString.split(",");
    
    return {
        personA: split[0],
        personB: split[2],
        happiness: parseInt(split[1])
    };
}

function getUniquePeople(statements) {
    var people = statements.map(function(s) { return s.personA; });
    people = getUnique(people);
    return people;
}

function findHappiness(statements, a, b) {
    var happiness = 0;
    statements.forEach(function(statement) {
        if (statement.personA === a && statement.personB === b) {
            happiness = statement.happiness;
        }
    }, this);
    
    return happiness;
}

function getOptimalSeating(statementStrings, extraPerson) {
    var statements = parseHappinessStatements(statementStrings);
    var people = getUniquePeople(statements);
    if (extraPerson !== undefined) {
        people.push(extraPerson);
    }
    var seatings = permutations(people);
    
    var maxHappiness = 0;
    for (var seating of seatings) {
    
        var currentHappiness = 0;
        for (var index = 0; index < seating.length; index++) {
            var a = seating[index];
            var b;
            if (index === seating.length - 1) {
                b = seating[0];
            } else {
                b = seating[index + 1];
            }
            
            currentHappiness += findHappiness(statements, a, b);
            currentHappiness += findHappiness(statements, b, a);
        }
        
        if (currentHappiness > maxHappiness) {
            maxHappiness = currentHappiness;
        }
    }
    
    return maxHappiness;
}