(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.index = global.index || {}, global.index.js = factory()));
})(this, (function () { 'use strict';

	const supportSymbol = typeof Symbol === 'function' && Symbol.for;
	const REACT_ELEMENT_TYPE = supportSymbol
	    ? Symbol.for('react.element')
	    : 0xeac7;

	const ReactElement = function (type, key, ref, props) {
	    return {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        ref: ref,
	        props: props,
	        __mark: 'zyh'
	    };
	};
	const jsx = (type, config, ...mayChildren) => {
	    let key = null;
	    const props = {};
	    let ref = null;
	    for (const prop in config) {
	        const val = config[prop];
	        if (prop === 'key') {
	            if (val !== undefined) {
	                key = '' + val;
	            }
	            continue;
	        }
	        if (prop === 'ref') {
	            if (val !== undefined) {
	                ref = '' + val;
	            }
	            continue;
	        }
	        if ({}.hasOwnProperty.call(config, prop)) {
	            props[prop] = val;
	        }
	    }
	    const len = mayChildren.length;
	    if (len) {
	        props.children = len === 1 ? mayChildren[0] : mayChildren;
	    }
	    return ReactElement(type, key, ref, props);
	};

	var index = {
	    version: '0.0.1',
	    createElement: jsx
	};

	return index;

}));
