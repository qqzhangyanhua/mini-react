import { FiberNode } from './fiber';

export const completeWork = (fiber: FiberNode) => {
	console.log('completeWork', fiber);
};
