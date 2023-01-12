import { appendChildToContainer, Container } from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import { MutationMask, NoFlags, Placement } from './fiberFlags';
import { HostComponent, HostText } from './workTags';

let nextEffect: FiberNode | null = null;
export const commitMutationEffects = (finishedWork: FiberNode) => {
	nextEffect = finishedWork;
	while (nextEffect !== null) {
		//向下遍历
		const child: FiberNode | null = nextEffect.child;
		if (
			(nextEffect.subTreeFlags & MutationMask) !== NoFlags &&
			child === null
		) {
			nextEffect = child;
		} else {
			//向上遍历 DFS
			while (nextEffect !== null) {
				commitMutationEffectsOnFiber(nextEffect);
				const sibling: FiberNode | null = nextEffect.sibling;
				if (sibling !== null) {
					nextEffect = sibling;
					break;
				}
				nextEffect = nextEffect.return;
			}
		}
	}
};
const commitMutationEffectsOnFiber = (finishedWork: FiberNode) => {
	const flags = finishedWork.flags;
	if ((flags & Placement) !== NoFlags) {
		commitPlacement(finishedWork);
		finishedWork.flags = flags & ~Placement;
	}
};
const commitPlacement = (finishedWork: FiberNode) => {
	if (__DEV__) {
		console.log('执行commitPlacement', finishedWork);
	}
	const hostParent = getHostParentFiber(finishedWork) as Container;
	appendPlacementNodeIntoContainer(finishedWork, hostParent);
};
function getHostParentFiber(fiber: FiberNode) {
	let parent = fiber.return;
	while (parent !== null) {
		const parentTag = parent.tag;
		if (parentTag === HostComponent) {
			return parent.stateNode as Container;
		}
		if (parentTag === HostText) {
			return (parent.stateNode as FiberRootNode).container;
		}

		parent = parent.return;
	}
	if (__DEV__) {
		console.log('warning', '没有找到父节点');
	}
	return null;
}

function appendPlacementNodeIntoContainer(
	finishedWork: FiberNode,
	hostParent: Container
) {
	// TODO

	if (finishedWork.tag === HostComponent || finishedWork.tag === HostText) {
		appendChildToContainer(finishedWork.stateNode, hostParent);
		return;
	}
	const child = finishedWork.child;
	if (child !== null) {
		appendPlacementNodeIntoContainer(child, hostParent);
		let sibling = child.sibling;
		while (sibling !== null) {
			appendPlacementNodeIntoContainer(sibling, hostParent);
			sibling = sibling.sibling;
		}
	}
}
