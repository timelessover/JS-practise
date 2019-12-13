/** 
 * 单例模式两个条件
 * 1.确保只有一个实例
 * 2.可以全局访问 
 * 适用于弹框的实现, 全局缓存
**/

const singleton = function(name){
    this.name = name
    this.instance = null
}
singleton.getInstance = function(name){
    if(!this.instance){
        this.instance = new singleton(name)
    }
    return this.instance
}
const a = singleton.getInstance('1')
const b = singleton.getInstance('2')
console.log(a === b) //true