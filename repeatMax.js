// 'abbkejsbcccwqaa' => {'c':3}
//  相邻两数省于最多
function findMax(str) {
    if(!str) return
    let arr = []
    let res = {}
    let _res = {}
    let max = 0
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i - 1]) {
            arr.push(str[i])
        }
    }
    //最大值为1的处理
    if(!arr.length){
       let _arr = str.split('')
       for(key in _arr){
           _res[_arr[key]] = 1
       }
       return _res
    }
    //记录出现个数
    for (key in arr) {
        if (!res[arr[key]]) {
            res[arr[key]] = 2
        } else {
            res[arr[key]]++
        }
    }

    //获得最大值
    for (key in res) {
        if (res[key] > max ) {
            max = res[key]
            
        }
    }
    for (key in res) {
        if (res[key] === max) {
                _res[key] = max
        }
    }
    return _res
}