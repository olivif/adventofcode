module.exports = {
    parseReindeer: parseReindeer,
    parseReindeers: parseReindeers,
    iterateReindeer: iterateReindeer
}

function parseReindeers(reindeerStrings) {
    var list = [];
    reindeerStrings.forEach(function(statement) {
        var s = parseReindeer(statement);
        list.push(s);
    }, this);
    
    return list;
}

function parseReindeer(reindeerString) {
    reindeerString = reindeerString.replace(" can fly ", ",");
    reindeerString = reindeerString.replace(" km/s for ", ",");
    reindeerString = reindeerString.replace(" seconds, but then must rest for ", ",");
    reindeerString = reindeerString.replace(" seconds.", "");
    
    var split = reindeerString.split(",");
    
    return {
        name: split[0],
        speed: parseInt(split[1]),
        flyDuration: parseInt(split[2]),
        restDuration: parseInt(split[3]),
        state: 1, // 1 is resting, 2 is flying
        timeInState: parseInt(split[3]),
        totalTravelled: 0,
        points: 0
    };
}

function iterateReindeer(reindeers, numberOfIterations, extraPoints) {
    
    for (var it = 1; it <= numberOfIterations; it++) {
        
        for (var reindeer in reindeers) {
            if (reindeers.hasOwnProperty(reindeer)) {
                var r = reindeers[reindeer];
                
                if (r.state === 1 && r.timeInState >= r.restDuration) {
                    r.state = 0; // switch to flying
                    r.timeInState = 1;
                } else if (r.state === 0 && r.timeInState >= r.flyDuration) {
                    r.state = 1; // switch to resting
                    r.timeInState = 1;
                } else {
                    r.timeInState++; // no switch so we can increment time in state
                }
                
                if (r.state === 0) {
                    r.totalTravelled += r.speed;
                }
            }
        }
        
        // find winning reindeer and give them a point
        if (extraPoints !== undefined) {
            // Find max
            var max = 0;
            reindeers.forEach(function(reindeer, index) {
                if (reindeer.totalTravelled > max) {
                    max = reindeer.totalTravelled;
                }
            }, this);
            // Find all indices with max
            var idx = [];
            reindeers.forEach(function(reindeer, index) {
                if (reindeer.totalTravelled === max) {
                    idx.push(index);
                }
            }, this);
            // give them points
            idx.forEach(function(i) {
                if (reindeers[i].points === undefined) {
                    reindeers[i].points = 0;
                }
                reindeers[i].points++;
            }, this);
        }
    }
    return reindeers;
}