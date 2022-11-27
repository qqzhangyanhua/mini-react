let Promise = require('./promie')
//函数的柯里化
function sum(a, b) {
    return (c,d)=>{

    }
}
sum(1,2)(3,5)

//判断函数有几种类型
function isType(type,value){
    return Object.prototype.toString.call(value) === `[object ${type}]`
}
let p =new Promise((resolve,reject) =>{
    console.log('action')
    resolve('123')
    reject('123')
})
p.then(res=>{
    console.log('success')
},()=>{
    console.log('fail')

})



