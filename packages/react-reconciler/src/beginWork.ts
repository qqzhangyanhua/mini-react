import { FiberNode } from './fiber';

export const beginWork = (fiber: FiberNode) => {
	console.log('beginWork', fiber);
};
