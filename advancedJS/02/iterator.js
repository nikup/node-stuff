function iterator(array, stopIteration) {
    return function () {
        if (array.length) {
            return array.shift();
        } else {
            return stopIteration;
        }
    }
}

var stopIteration = {},
    arr = [1,3,5],
    iterate = iterator(arr, stopIteration),
    item;

while((item = iterate()) !== stopIteration) {
    console.log(item);
}