const map = (arr, fn, context) => {
    return arr.reduce((acc, cur, index, arr) => {
        return [...acc, fn.call(context, cur, index, arr)]
    }, [])
}

var test = (item) => {
    return item * 2
}
var arr = [1, 2, 3]
map(arr, test, this)

const filter = (arr, fn, context) => {
    return arr.reduce((acc, cur, index, arr) => {
        return fn.call(context, cur, index, arr) ? [...acc, cur] : [...acc]
    }, [])
}

var test = (item) => {
    return item > 2
}
var arr = [1, 2, 3]
filter(arr, test, this)