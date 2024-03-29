import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { createWorkInProgress, FiberNode, FiberRootNode } from './fiber';
import { MutationMask, NoFlags } from './fiberFlags';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null;

function prepareFreshStack(root: FiberRootNode, expirationTime: number) {
	// This is the root of the stack
	console.log(expirationTime);

	workInProgress = createWorkInProgress(root.current, null);
}
export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// TODO
	// 调度功能
	const root = markUpdateFormFiberToRoot(fiber);
	renderRoot(root);
}
function markUpdateFormFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}
function renderRoot(root: FiberRootNode) {
	prepareFreshStack(root, 0);
	do {
		try {
			workLoop();
		} catch (e) {
			if (__DEV__) {
				console.log('warning', e);
			}
			workInProgress = null;
		}
	} while (true);
	const finishedWork = root.current.alternate;
	root.finishedWork = finishedWork;
	commitRoot(root);
}
function commitRoot(root: FiberRootNode) {
	const finishedWork = root.finishedWork;
	if (finishedWork === null) {
		return;
	}
	if (__DEV__) {
		console.log('commit 阶段', finishedWork);
	}
	//重置
	root.finishedWork = null;

	//判断是否存在3个字阶段需要执行操作
	const subTreeHasEffect =
		(finishedWork.subTreeFlags & MutationMask) !== NoFlags;
	const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;
	if (subTreeHasEffect || rootHasEffect) {
		root.current = finishedWork;
	} else {
		root.current = finishedWork;
	}
	//beforeMutation

	//mutation

	//afterMutation
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
