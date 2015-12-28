var fs = require('fs');

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

function modifyGrid(grid, topX, topY, bottomX, bottomY, callback) {

	for (var i = topY; i < bottomY; i++) {
		for(var j = topX; j < bottomX; j++){
			grid[i][j] = callback(grid[i][j], i, j);
		}
	}
	return grid;	
}

function processGrid(array, steps) {
    var rows = array.length;
    var cols = array[0].length;
    var grid = initGrid(rows, cols)
    
    modifyGrid(grid, 0, 0, cols, rows, function(element, i, j) {
        return array[i][j];
    }); 
    
    for (var index = 0; index < steps; index++) {
        iterateGrid(grid, cols, rows);
    }
    
    var on = countOn(grid, cols, rows);
    return on;
}

function getElementSafe(grid, rows, cols, i, j) {
    if (i >= 0 && i < rows && j >= 0 && j < cols) {
        return grid[i][j];
    } 
    
    return null;
}

function getNeightbours(grid, rows, cols, i, j) {
    var neighbours = [];
    
    neighbours.push(getElementSafe(grid, rows, cols, i-1, j-1));
    neighbours.push(getElementSafe(grid, rows, cols, i-1, j));
    neighbours.push(getElementSafe(grid, rows, cols, i-1, j+1));
    neighbours.push(getElementSafe(grid, rows, cols, i, j-1));
    neighbours.push(getElementSafe(grid, rows, cols, i, j+1));
    neighbours.push(getElementSafe(grid, rows, cols, i+1, j-1));
    neighbours.push(getElementSafe(grid, rows, cols, i+1, j));
    neighbours.push(getElementSafe(grid, rows, cols, i+1, j+1));

    return neighbours;
}

function getNeighboursOn(grid, rows, cols, i, j) {
    var neighbours = getNeightbours(grid, rows, cols, i, j);
    var count = 0;
    neighbours.forEach(function(neighbour) {
        if (neighbour === "#") {
            count++;
        }
    }, this);
    
    return count;
}

function isCornerLight(rows, cols, i, j) {
    var topLeft = i === 0 && j === 0;
    var topRight = i === 0 && j === (cols - 1);
    var bottomLeft = i === (rows -1) && j === 0;
    var bottomRight = i === (rows -1) && j === (cols - 1);
    
    return topLeft || topRight || bottomLeft || bottomRight;
}

function iterateGrid(grid, cols, rows) {
    var gridCopy = JSON.parse(JSON.stringify(grid));
    modifyGrid(grid, 0, 0, cols, rows, function(element, i, j) {
        var count = getNeighboursOn(gridCopy, rows, cols, i, j);
        var nextState;
        
        if (isCornerLight(rows, cols, i, j)) {
            nextState = "#";
        } else {
            if (element === "#") {
                if (count === 2 || count === 3) {
                    nextState = "#";
                } else {
                    nextState = ".";
                }
            } else if (element === "."){
                if (count === 3) {
                    nextState = "#";
                } else {
                    nextState = ".";
                }
            }
        }
        return nextState;
    }); 
}

function countOn(grid, cols, rows) {
    var count = 0;
    modifyGrid(grid, 0, 0, cols, rows, function(element, i, j) {
        if (element === "#") {
            count++;
        }
    }); 
    return count;
}

function run() {
    var fileName = 'data/day18in.txt';
    var array = fs.readFileSync(fileName, "utf8").toString().split("\r\n");
    var on = processGrid(array, 100);
    console.log(on);
}

run();