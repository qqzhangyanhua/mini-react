import { createDom } from './react-dom';
class Component {
	//用来区分啥是类组件，啥是函数组件
	static isReactComponent = true;
	constructor(props) {
		this.props = props;
		this.state = {};
	}
	setState(partialState) {
		// console.log('setState==', partialState);
		this.state = {
			...this.state,
			...partialState
		};
		let newVdom = this.render();
		updateClassComponent(this, newVdom);
	}
	render() {
		throw new Error('子类必须实现render方法');
	}
}
const updateClassComponent = (instance, newVdom) => {
	// console.log('updateClassComponent==', instance, newVdom);
	let oldDom = instance.dom; //取出老的dom
	let newDom = createDom(newVdom);
	oldDom.parentNode.replaceChild(newDom, oldDom); //用新的dom替换老的dom
	instance.dom = newDom;
};
export default Component;
