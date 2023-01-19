import {
	appendInitialChild,
	Container,
	createInstance,
	createTextInstance
} from 'hostConfig';
import { FiberNode } from './fiber';
import { NoFlags } from './fiberFlags';
import { HostComponent, HostRoot, HostText } from './workTags';

export const completeWork = (wip: FiberNode) => {
	const current = wip.alternate;
	const newProps = wip.pendingProps;
	switch (wip.tag) {
		case HostComponent:
			if (current !== null && wip.stateNode) {
				//update
			} else {
				//第一步构建dom
				const instance = createInstance(wip.type, newProps);
				//将dom 插入dom树中
				appendAllChildren(instance, wip);
				wip.stateNode = instance;
			}
			bubbleProperties(wip);
			return null;
			break;
		case HostText:
			if (current !== null && wip.stateNode) {
				//update
			} else {
				//第一步构建dom
				const instance = createTextInstance(newProps.content);
				wip.stateNode = instance;
			}
			bubbleProperties(wip);
			return null;
			break;
		case HostRoot:
			return null;
			break;
		default:
			if (__DEV__) {
				console.warn('未处理的情况', wip);
			}
			break;
	}
};

//插入行为
function appendAllChildren(parent: Container, wip: FiberNode) {
	let node = wip.child;
	while (node) {
		if (node.tag === HostComponent || node.tag === HostText) {
			appendInitialChild(parent, node?.stateNode);
		} else if (node.child !== null) {
			node.child.return = node;
			node = node.child;
			continue;
		}
		if (node === wip) {
			return;
		}
		while (node.sibling === null) {
			if (node.return === null || node.return === wip) {
				return;
			}
			node = node?.return;
		}
		node.sibling.return = node.return;
	}
}

function bubbleProperties(wip: FiberNode) {
	let subTreeFlags = NoFlags;
	let child = wip.child;
	while (child !== null) {
		subTreeFlags |= child.subTreeFlags;
		subTreeFlags |= child.flags;
		child.return = wip;
		child = child.sibling;
	}
	wip.subTreeFlags |= subTreeFlags;
}
