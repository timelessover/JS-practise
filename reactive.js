/** 
 * Vue的响应式原理 
 **/

  
  function observer (obj){
    if( !obj || typeof obj !== 'object') return 
  
    Object.keys(obj).forEach((key)=>{
       reactive(obj,key,obj[key])
    })
  }
  function reactive(obj,key,val){
     Object.defineProperty(obj,key,{
       configurable:true,
       enumerable: true,
       get: function(){
         return val
       },
       set:function(newVal){
          if (newVal === val) return
          val = newVal
          console.log('newvalue',val)
       }
     })
  }

  class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
    }
  }
  
  let vm = new Vue({
    data: {
        test: "test"
    }
  });
  vm._data.test = "test2";