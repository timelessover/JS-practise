
/**
 * 需求：深拷贝和浅拷贝的实现
 * 深拷贝：复制一个和原对象一样的对象，但是内存地址不同，不会随着原对象该变
 * 浅拷贝： 只是赋值元素，原来的引用改变，拷贝对象也会改变
 **/
 
/** 
 * 深拷贝技巧型实现
 **/ 
//jsonstringify,但是不能拷贝函数
let arr = ['old', 1, true, ['old1', 'old2'], { old: 1 }]

let new_arr = JSON.parse(JSON.stringify(arr));

/* 
    浅拷贝使用技巧
    ES6扩展运算符
*/

let arr = ['old', 1, true, ['old1', 'old2'], { old: 1 }]

let new_arr = [...arr];

// 类型判断实现浅拷贝
let shallowCopy = function (obj) {
    // 只拷贝对象
    if (obj === null || typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    let newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
//类型判断实现深拷贝
let deepCopy = function (obj) {
    if (obj === null || typeof obj !== 'object') return;
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            //对象元素会继续递归来赋值
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}