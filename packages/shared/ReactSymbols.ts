const supperSymbol = typeof Symbol === 'function' && Symbol.for;

//[判断是否支持Symbol]
export const REACT_ELEMENT_TYPE = supperSymbol
	? Symbol.for('react.element')
	: 0xeac7;
