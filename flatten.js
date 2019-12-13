//需求：var arr = [1, [2, [3, 4]]];
//console.log(flatten(arr)) // [1, 2, 3, 4]
//优化：可选择平铺深度
const flatten = function (arr, depth = 1) {
    if (depth <= 0) return arr
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten(next, depth - 1) : next)
    }, [])
}
