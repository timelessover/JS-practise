/**
 * 适配者模式: 主要用于解决两个接口之间不匹配的问题。
 */
// 老接口

const CityOld = [
    {
        name: 'hangzhou',
        id: 11,
    },
    {
        name: 'jinhua',
        id: 12
    }
]
// 新接口希望是下面形式
const newCityInterface = {
    hangzhou: 11,
    jinhua: 12,
}

// 这时候就可采用适配者模式
const adaptor = (function () {
    const obj = {}
    for (let city of CityOld) {
        obj[city.name] = city.id
    }
    return obj
}())