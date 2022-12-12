import Component from './Component.js';
/**
 *
 *
 * @param {*} type 元素类型
 * @param {*} config
 * @param {*} children
 */
function createElement(type, config, children) {
	let props = { ...config };
	if (arguments.length > 3) {
		children = Array.prototype.slice.call(arguments, 2);
	}
	props.children = children;
	return {
		type,
		props
	};
}
const React = {
	createElement,
	Component
};
export default React;
