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
}
const ReacrDOM = {
	render
};

const createDom = (vdom) => {
	//如果是数字或者是字符串，就创建文本节点
	if (typeof vdom === 'string' || typeof vdom === 'number') {
		return document.createTextNode(vdom);
	}
	//否则就赛一个虚拟dom 对象
	let { type, props } = vdom;
	let dom = document.createElement(type);
	//使用虚拟dom的属性更新真实dom的属性
	updateProps(dom, props);
	if (typeof props.children === 'string' || props.children === 'number') {
		dom.textContent = props.children;
	} else if (typeof props.children === 'object' && props.children.type) {
		//如果是对象，就递归渲染
		//把children变成真实dom插入进来
		render(props.children, dom);
	}
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
		} else {
			dom[key] = newProps[key];
		}
	}
}
export default ReacrDOM;
