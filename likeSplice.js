let arr = [1, 2, 3, 4, 5, 6]

function remove(arr, item) {
    let lens = arr.length
    for (let i = 0; i < lens; i++) {
        if (arr[i] === item) {
            for (let j = i; j < lens - i + 1; j++) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
            arr.length = arr.length - 1
        }
    }
    return arr
}
remove(arr, 3)