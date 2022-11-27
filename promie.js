
const  PEDDING = 'PEDDING';
const FULILLED = 'FULILLED';
const REJECTED = 'REJECTED';
class Promise {
    constructor(executor) {
        this.value = undefined;
        this.reason = undefined;
        this.status = PEDDING
        const resolve = (value) => {
            this.value = value;
            this.status = FULILLED

        };
        const reject = (reason) => {
            this.reason = reason;
            this.status = REJECTED
        };
        try {

            executor(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        console.log('then',this.status)
        if(this.status === FULILLED){
            onFulfilled()
        }
        if(this.status === REJECTED){
            onRejected()
        }

    }
    catch (e){
        
    }
}
//node 默认不支持es6
module.exports = Promise