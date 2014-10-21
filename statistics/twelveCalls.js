// Mathematical model
// Phone rings 12 times a week, what is the chance it rings at least once a day

var ACCURACY = 10000000,
    count = 0,
    currentWeek = [false, false, false, false, false, false, false];

for (var i = 0; i < ACCURACY; i++) {
    for (var j = 0; j < 12; j++) {
        var call = Math.floor(Math.random() * 7);
        currentWeek[call] = true;
    }

    if (currentWeek.indexOf(false) === -1) {
        count += 1;
    }

    currentWeek = [false, false, false, false, false, false, false];
};

console.log(count / ACCURACY);