/**
 *
 *1,把虚拟dom变成真实dom
 *2,把真实dom挂载到容器上
 *3,把虚拟dom的children变成真实dom
  4 挂载再容器上
 * @param {*} vdom //虚拟dom
 * @param {*} container 容器
 */
function render(vdom, container) {
	const dom = createDom(vdom);
	container.appendChild(dom);
}
const ReactDOM = {
	render
};

export const createDom = (vdom) => {
	//如果是数字或者是字符串，就创建文本节点
	if (typeof vdom === 'string' || typeof vdom === 'number') {
		return document.createTextNode(vdom);
	}
	//否则就赛一个虚拟dom 对象
	let { type, props } = vdom;
	let dom;
	if (typeof type === 'function') {
		//自定义函数组件
		if (type.isReactComponent) {
			//类组件
			return mountClassComponent(vdom);
		} else {
			dom = mountFunctionComponent(vdom);
		}
	} else {
		dom = document.createElement(type);
	}
	//使用虚拟dom的属性更新真实dom的属性
	updateProps(dom, props);
	if (typeof props.children === 'string' || props.children === 'number') {
		dom.textContent = props.children;
	} else if (typeof props.children === 'object' && props.children.type) {
		//如果是对象，就递归渲染
		//把children变成真实dom插入进来
		render(props.children, dom);
	} else if (Array.isArray(props.children)) {
		//如果是数组，就遍历数组，递归渲染
		reconcileChildren(props.children, dom);
	} else {
		//兜底
		document.textContent = props.children ? props.children.toString() : '';
	}
	//把真实dom 作为一个属性放,为以后更新做准备
	// vdom.dom = dom;
	return dom;
};
function updateProps(dom, newProps) {
	for (let key in newProps) {
		if (key === 'children') {
			//如果是children属性，就不需要处理
			continue;
		}
		//style属性需要特殊处理
		if (key === 'style') {
			let styleOnj = newProps[key];
			for (let attr in styleOnj) {
				dom.style[attr] = styleOnj[attr];
			}
		} else if (key.startsWith('on')) {
			//如果是事件属性，就添加事件
			dom[key.toLocaleLowerCase()] = newProps[key];
		} else {
			dom[key] = newProps[key];
		}
	}
}
/**
 *
 *
 * @param {*} childrenVdoms 虚拟dom的children
 * @param {*} parentDom 父亲真实dom
 */
function reconcileChildren(childrenVdom, parentDom) {
	for (let i = 0; i < childrenVdom.length; i++) {
		let childVdom = childrenVdom[i];
		render(childVdom, parentDom);
	}
}
/**
 *把一个类型为自定义函数组件的虚拟dom变成真实dom
 *
 * @param {*} vdom
 * @return {*}
 */
function mountFunctionComponent(vdom) {
	let { type, props } = vdom;
	let renderVdom = type(props);
	return createDom(renderVdom);
}
function mountClassComponent(vdom) {
	let { type, props } = vdom;
	let classInstance = new type(props);
	let renderVdom = classInstance.render();
	let dom = createDom(renderVdom);
	classInstance.dom = dom;
	return dom;
}
export default ReactDOM;
