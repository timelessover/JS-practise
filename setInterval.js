// setTimeout模拟setInterval
const _setInterval = (fn, t) => {
    function tx() {
        setTimeout(tx, t)
        fn()
    }
    setTimeout(tx, t);
}
_setInterval(() => { console.log('2') }, 1000)

