//需求：var arr = [1, [2, [3, 4]]];
//console.log(flatten(arr)) // [1, 2, 3, 4]
//优化：可选择平铺深度
const flatten = function (arr, depth = 1) {
    let res = arr.reduce((prev, next) => {
        if (depth <= 0) return arr
        return prev.concat(Array.isArray(next) ? flatten(next, depth - 1) : next)
    }, [])
    return res
}


function flatten(arr) {
    if (depth <= 0) return arr
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }

    return arr;
}