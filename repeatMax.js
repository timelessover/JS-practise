// 'abbkejsbcccwqaa' => {'c':3}
//  相邻两数省于最多
function findMax(str){
    let tem = []
    let res = {}
    let _res = {}
    let max = 0
    let arr = str.split("")
    for(let i = 0; i<arr.length;i++){
        if(arr[i] === arr[i-1]){
            tem.push(arr[i])
        }
    }
    //记录出现个数
    for(key in tem){
        if(!res[tem[key]]){
            res[tem[key]] = 2
        }else{
            res[tem[key]]++
        }
    }
    //获得最大值
    for(key in res){
        if(res[key] > max){
            max = res[key]
        }
    }
    for(key in res){
        if(res[key] === max){
           _res[key] = max
        }
    }
    return _res
}