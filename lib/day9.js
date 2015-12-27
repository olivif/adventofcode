var HashMap = require("hashmap");
var permutations = require('array-permutation');

module.exports = {
	// day 9
    parseEdge: parseEdge,
    constructGraph: constructGraph,
    getPermutations: getPermutations,
    getMin: getMin,
    getMax: getMax
};

// Day 9
// http://adventofcode.com/day/9
function parseEdge(edgeString) {
    var split = edgeString.split(" = ");
    var locations = split[0];
    var cost = parseInt(split[1]);
    
    var splitLocations = locations.split(" to ");
    var from = splitLocations[0];
    var to = splitLocations[1];
    
    return {
        from: from,
        to: to,
        cost: cost,
        state: ""
    }
}

function constructGraph(edgeStrings) {
    
    var graph = new HashMap();
    
    edgeStrings.forEach(function(edgeString) {
        var edge = parseEdge(edgeString);
        
        if (!graph.has(edge.from)) {
            graph.set(edge.from, new HashMap());
        }
        
        if (!graph.get(edge.from).has(edge.to)) {
            graph.get(edge.from).set(edge.to, {cost: edge.cost});
        }
        
        // Graph is bidirectional so we have to do the same for edge.to
        if (!graph.has(edge.to)) {
            graph.set(edge.to, new HashMap());
        }
        
        if (!graph.get(edge.to).has(edge.from)) {
            graph.get(edge.to).set(edge.from, {cost: edge.cost});
        }
        
    }, this);
    
    return graph;
}

function getMin(array) {
    return getPermutations(
        array,
        function() { return Number.MAX_VALUE;},
        function(a, b) { return a < b; } );
}

function getMax(array) {
    return getPermutations(
        array,
        function() { return 0;},
        function(a, b) { return a > b; } );
}

function getPermutations(array, init, comparison) {
    var graph = constructGraph(array);
    var routes = permutations(graph.keys());
    
    var otherCost = init();
    for (var route of routes) {
        
        var cost = 0; 
        for (var index = 0; index < route.length - 1; index++) {
            var from = route[index];
            var to = route[index + 1];
            cost += graph.get(from).get(to).cost;
        }
        
        if (comparison(cost, otherCost)) {
            otherCost = cost;
        }
    }
    
    return otherCost;
}