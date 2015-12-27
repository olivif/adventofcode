module.exports = {
    processJson: processJson
};

// Day 12
// http://adventofcode.com/day12
function hasRedKey(obj) {
    for (var key in obj) {
        if (obj[key] === "red") {
            return true;
        }
    }
    return false;
}

function processJson(obj) {
    var total = 0;
    if (Array.isArray(obj)) {
        obj.forEach(x => total += processJson(x));
    } else if (typeof obj === "object" && !hasRedKey(obj)) {
        var keys = Object.keys(obj);
        keys.forEach(x => total += processJson(obj[x]));
    } else if (typeof obj === "number") {
        return obj;
    }

    return total;
}