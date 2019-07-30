//需求：数组内容去重
//
let unique = arr => [...new Set(arr)]
let unique = arr => {
    const map = new Map()
    return arr.filter(item => !map.has(item) && map.set(item, 1))
}
//复杂类型
var array = [{value: 1}, {value: 1}, {value: 2}];

function unique(array) {
    var obj = {};
    return array.filter(function(item){
        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}

console.log(unique(array)); // [{value: 1}, {value: 2}]

let array = [1,2,3,4,1]
let unique = function(){
    let arr = [...array]
    arr.filter((item,index,array)=>{
        return array.indexOf(item) === index
    })
    return arr
}