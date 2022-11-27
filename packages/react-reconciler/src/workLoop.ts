import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workInProgress: FiberNode | null;

function prepareFreshStack(root: FiberNode, expirationTime: number) {
	// This is the root of the stack
	workInProgress = root;
}
function renderRoot(root: FiberNode) {
	prepareFreshStack(root, 0);
	do {
		try {
			workLoop();
		} catch (e) {
			console.log('warning', e);
			workInProgress = null;
		}
	} while (true);
}
function workLoop() {
	while (workInProgress) {
		performUnitOfWork(workInProgress);
	}
}
function performUnitOfWork(fiber: FiberNode) {
	// Do work here
	// workInProgress = null;
	const next = beginWork(fiber);
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next!;
	}
}
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;
		if (sibling) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node);
}
export {};
