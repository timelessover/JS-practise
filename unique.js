//需求：数组内容去重
//最基础的方法
let unique = (arr) => {
    let hash = {}
    let newArr = []
    for (key in arr) {
        if (!hash[arr[key]]) {
            hash[arr[key]] = 1
            newArr.push(arr[key])
        }
    }
    return newArr
}
// ES6 set数据结构中不存在重复元素的特性
let unique = arr => [...new Set(arr)]
// ES6 map hash结构过滤掉不存在 map 中并赋值 value 为 1 的值
let unique = arr => {
    const map = new Map() 
    return arr.filter(item => !map.has(item) && map.set(item, 1))
}
//复杂类型
var array = [{value: 1}, {value: 1}, {value: 2}];

function unique(array) {
    var obj = {};
    return array.filter(function(item){
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}
//最直接的去重，直接过滤掉元素第一次出现的索引值与当前索引值不同的值
let array = [1,2,3,4,1]
let unique = function(){
    let arr = [...array]
    arr.filter((item,index,array)=>{
        return array.indexOf(item) === index
    })
    return arr
}
//利用reduce和hash多维去重
let hash = {};

function uniqueBy(arr, key){
    return arr.reduce(function(previousValue, currentValue){
        //存在的则存入hash，
        hash[currentValue[key]] ? '' : hash[currentValue[key]] = true && previousValue.push(currentValue);
        return previousValue
    }, []);
}
//去除name相同的对象
const uniqueArr = uniqueBy([{name: 'zs', age: 15}, {name: 'lisi'}, {name: 'zs'}], 'name');

console.log(uniqueArr);