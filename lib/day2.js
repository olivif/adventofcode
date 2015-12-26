module.exports = {
	// day 2
	getWrappingPaper: getWrappingPaper,
	getRibbon: getRibbon
}

// Day 2
// http://adventofcode.com/day/2
function getAreas(length, width, height) {
	return [
		length * width, 
		length * height, 
		width * height
	];	
}

function getTotalArea(length, width, height) {
	var areas = getAreas(length, width, height);
	var total = 0;
	areas.forEach(function(area) {
		total += area * 2;
	});
	
	return total;
}

function getSmallestArea(length, width, height) {
	var areas = getAreas(length, width, height);
	return Math.min.apply(null, areas);
}

function getVolume(length, width, height) {
	return length * width * height;
}

function getSmallestPerimeter(length, width, height) {
	var perimeters = [
		2 * length + 2 * width,
		2 * length + 2 * height,
		2 * height + 2 * width
	];
	
	return Math.min.apply(null, perimeters);
}

function getWrappingPaper(length, width, height) {
	var total = getTotalArea(length, width, height);
	var slack = getSmallestArea(length, width, height); 
	return total + slack;
}

function getRibbon(length, width, height) {
	var volume = getVolume(length, width, height);
	var smallestPerimeter = getSmallestPerimeter(length, width, height);
	return volume + smallestPerimeter;
}