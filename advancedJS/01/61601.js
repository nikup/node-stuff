function fib (n) {
    var i, fib = [0, 1];

    for(i = 2; i <= n; i++)
    {
        fib[i] = fib[i-2] + fib[i-1];
    }

    return fib[n];
}

function swap( array, i, j ) {
    var temp = array[ i ];
    array[ i ] = array[ j ];
    array[ j ] = temp;
}

function findNthNumber (n, array) {
    function partition_reversed(arr, low, high){
        var pivot = arr[low];

        while (low < high ){
            while ( low < high ){ 
                if (arr[high] >= pivot ){
                    arr[low] = [arr[high], arr[high] = arr[low] ][0];
                    break;
                }
                --high;
            }

            while ( low < high ) {
                if (arr[low] < pivot ){
                    arr[high] = [arr[low], arr[low] = arr[high]][0];

                    break;
                }
                ++low;
            }

        }

        return low;
    }

    var K, result;
    function findK_QS_recursive(arr,low, high){
        if (low == high){
            return result = arr[low];
        }

        if (low < high){
            var loc = partition_reversed(arr, low, high);
            if (loc == K)
                return result = arr[loc];
            if (loc < K){
                arguments.callee(arr, loc+1, high);
            } else {
                arguments.callee(arr, low, loc-1);
            }
        }
    }

    function findK_QS_base1(arr, N){
        if (N > arr.length)
            throw "N should NOT exceed arr's length";
        K = N - 1;
        findK_QS_recursive(arr, 0, arr.length-1);
        return result;
    }

    return findK_QS_base1(array, n);
}

module.exports = {
    fib: fib,
    phiEstimation: function (n) {
        return fib(n) / fib(n-1);
    },
    reverseWordsOrderInString: function (string) {
        return string.split(" ").reverse().join(" ");
    },
    reverseWordsInString: function (string) {
        return string.split(" ").map(function(word) {
            return word.split("").reverse().join("")
        }).join(" ");
    },
    findNthNumber: findNthNumber,
    median: function (arr) {
        var middle = Math.floor(arr.length / 2) + 1;

        if (arr.length % 2 == 0) {
            return (findNthNumber(middle - 1, arr) + findNthNumber(middle, arr)) / 2;
        } else {
            return findNthNumber(middle, arr);
        }
    },
    setBits: function (m, n, i, j) {
        var stringM = m.toString(2),
            stringN = n.toString(2),
            replaceIndex = i,
            arrayM = stringM.split('');
            console.log(stringM);
        stringN.split('').forEach(function (bitAtPosition) {
            if(replaceIndex <= j) {
                arrayM[replaceIndex] = bitAtPosition;
            }

            replaceIndex++;
        });

        return parseInt(arrayM.join(''), 2);
    }
}