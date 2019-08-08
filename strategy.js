/** 
 * 定义: 根据不同参数可以命中不同的策略 
 * 优点: 1.能减少大量的 if 语句  2.复用性好
 **/
//以计算年终奖为例
//方法一
const strategy = {
    'S': function(salary) {
      return salary * 4
    },
    'A': function(salary) {
      return salary * 3
    },
    'B': function(salary) {
      return salary * 2
    }
  }
  
  const calculateBonus = function(level, salary) {
    return strategy[level](salary)
  }
  
  calculateBonus('A', 10000) // 30000
  //方法二
  const S = function(salary) {
    return salary * 4
  }
  
  const A = function(salary) {
    return salary * 3
  }
  
  const B = function(salary) {
    return salary * 2
  }
  
  const calculateBonus = function(func, salary) {
    return func(salary)
  }
  
  calculateBonus(A, 10000) // 30000