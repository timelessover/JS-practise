// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

//考察：闭包，事件轮询机制，链式调用，队列

class _LazyMan{
    constructor(name){
        this.tasks = [] //创建一个任务队列
        const task = (()=>{
            console.log(`Hi! This is ${name}`);
            this.next()//执行下一个任务
        })
        this.tasks.push(task)
        setTimeout(()=>{
            this.next() //上一次调用栈清空后执行
        },0)
    }
    next(){
        const exec = this.tasks.shift() //执行队列中第一个任务
        exec && exec()
    }
    sleep(time) {
        this.isSleepFirst(time, false);
        return this;                     // 链式调用
    }

    sleepFirst(time) {
        this.isSleepFirst(time, true);
        return this;
    }

    isSleepFirst(time, first) {
        const task = () => {
            setTimeout(() => {
                console.log(`Wake up after ${time}`);
                this.next();
            }, time * 1000)
        }
        if (first) {
            this.tasks.unshift(task);     // 放到任务队列首部
        } else {
            this.tasks.push(task);        // 放到任务队列尾部
        }
    }
    eat(name){
        const task = () => {
            console.log(`Eat ${name}`);
            this.next();
        }
        this.tasks.push(task);
        return this
    }
}


function LazyMan(name){
    return new _LazyMan(name) 
}

