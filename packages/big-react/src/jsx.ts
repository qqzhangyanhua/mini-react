import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	return {
		$$typeof: REACT_ELEMENT_TYPE,
		type: type,
		key: key,
		ref: ref,
		props: props,
		__mark: 'zyh'
	};
};

export const jsx = (type: ElementType, config: any, ...mayChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
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
export const jsxDEV = jsx;
