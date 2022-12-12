import { createDom } from './react-dom';

export let updateQueue = {
	isBatchingUpdate: false, //是否批量更新
	updaters: new Set() //存放所有的updater
};
class Updater {
	constructor(classInstance) {
		this.classInstance = classInstance; // 类组件的实例
		this.pendingStates = []; //等待生效的状态
		this.callbacks = [];
	}
	addState(partialState, cb) {
		this.pendingStates.push(partialState); //更新放进去
		this.callbacks.push(cb); //更新状态后的回调
		if (updateQueue.isBatchingUpdate) {
			//如果是批量更新,先缓存起来
			updateQueue.updaters.add(this);
		} else {
			this.updateClassComponent(); //z直接更新
		}
	}
	updateClassComponent() {
		let { classInstance, pendingStates, callbacks } = this;
		if (pendingStates.length > 0) {
			//如果有等待生效的状态
			classInstance.state = this.getState();
			classInstance.forceUpdate();
		} else {
			callbacks.forEach((cb) => cb());
		}
	}
	getState() {
		// 获取最新的状态
		let { classInstance, pendingStates } = this;
		let { state } = classInstance;
		pendingStates.forEach((nextState) => {
			if (typeof nextState === 'function') {
				nextState = nextState(state);
			}
			state = { ...state, ...nextState };
		});
		pendingStates.length = 0;
		return state;
	}
}
class Component {
	//用来区分啥是类组件，啥是函数组件
	static isReactComponent = true;
	constructor(props) {
		this.props = props;
		this.state = {};
		this.updater = new Updater(this);
	}
	setState(partialState, cb) {
		this.updater.addState(partialState, cb);
		// this.state = {
		// 	...this.state,
		// 	...partialState
		// };
		// let newVdom = this.render();
		// updateClassComponent(this, newVdom);
	}
	render() {
		throw new Error('子类必须实现render方法');
	}
}
//TODO 更新类组件
const updateClassComponent = (instance, newVdom) => {
	// console.log('updateClassComponent==', instance, newVdom);
	let oldDom = instance.dom; //取出老的dom
	let newDom = createDom(newVdom);
	oldDom.parentNode.replaceChild(newDom, oldDom); //用新的dom替换老的dom
	instance.dom = newDom;
};
export default Component;
