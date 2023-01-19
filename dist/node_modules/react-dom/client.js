(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.client = global.client || {}, global.client.js = factory()));
})(this, (function () { 'use strict';

	const FunctionComponent = 0;
	const HostComponent = 5;
	const HostText = 6;
	const HostRoot = 3;

	const NoFlags = 0b0000001;
	const Placement = 0b0000010;
	const Update = 0b0000100;
	const ChildDeletion = 0b0001000;
	const MutationMask = Placement | Update | ChildDeletion;
	// export const PlacementAndUpdate = 0b001100;
	// export const Deletion = 0b010000;
	// export const ContentReset = 0b100000
	// export const Callback = 0b1000000;
	// export const DidCapture = 0b10000000;
	// export const Ref = 0b100000000;
	// export const Snapshot = 0b1000000000;
	// export const Passive = 0b10000000000;
	// export const Hydrating = 0b100000000000;
	// export const HydratingAndUpdate = 0b100000000100;
	// export const Visibility = 0b1000000000000;

	class FiberNode {
	    type;
	    tag;
	    key;
	    pendingProps;
	    stateNode;
	    return;
	    index;
	    props;
	    sibling;
	    ref;
	    child;
	    memoizedProps;
	    memoizedState;
	    alternate;
	    flags;
	    subTreeFlags;
	    updateQueue;
	    constructor(tag, pendingProps, key) {
	        this.tag = tag;
	        this.key = key;
	        this.pendingProps = pendingProps;
	        this.stateNode = null;
	        this.props = null;
	        //指向父fiberNode
	        this.return = null;
	        this.sibling = null;
	        this.child = null;
	        this.index = 0;
	        this.ref = null;
	        //作为工作单元
	        this.pendingProps = pendingProps;
	        this.memoizedProps = null;
	        this.alternate = null;
	        this.memoizedState = null;
	        //副作用
	        this.flags = NoFlags;
	        this.subTreeFlags = NoFlags;
	        this.updateQueue = null;
	    }
	}
	class FiberRootNode {
	    container;
	    current;
	    finishedWork;
	    constructor(container, hostRootFiber) {
	        this.container = container;
	        this.current = hostRootFiber;
	        hostRootFiber.stateNode = this;
	        this.finishedWork = null;
	    }
	}
	const createWorkInProgress = (current, pendingProps) => {
	    let wip = current.alternate;
	    if (wip === null) {
	        //创建一个新的fiberNode
	        wip = new FiberNode(current.tag, pendingProps, current.key);
	        wip.stateNode = current.stateNode;
	        wip.alternate = current;
	        current.alternate = wip;
	    }
	    else {
	        //update
	        wip.pendingProps = pendingProps;
	        wip.flags = NoFlags;
	        wip.subTreeFlags = NoFlags;
	    }
	    wip.type = current.type;
	    wip.updateQueue = current.updateQueue;
	    wip.memoizedProps = current.memoizedProps;
	    wip.memoizedState = current.memoizedState;
	    return wip;
	};
	const createFiberFormElement = (element) => {
	    const { type, key, props } = element;
	    let fiberTag = FunctionComponent;
	    if (typeof type === 'string') {
	        fiberTag = HostComponent;
	    }
	    else if (typeof type !== 'function' && true) {
	        console.log('warning', 'unknown type');
	    }
	    const fiber = new FiberNode(fiberTag, props, key);
	    fiber.type = type;
	    return fiber;
	};

	const createUpdate = (action) => {
	    return { action };
	};
	const createUpdateQueue = () => {
	    return {
	        shared: {
	            pending: null
	        }
	    };
	};
	const enqueueUpdate = (updateQueue, update) => {
	    updateQueue.shared.pending = update;
	};
	const processUpdateQueue = (baseState, pendingUpdate) => {
	    const result = { memoizedState: baseState };
	    if (pendingUpdate !== null) {
	        const action = pendingUpdate.action;
	        if (action instanceof Function) {
	            result.memoizedState = action(baseState);
	        }
	        else {
	            result.memoizedState = action;
	        }
	    }
	    return result;
	};

	const supportSymbol = typeof Symbol === 'function' && Symbol.for;
	const REACT_ELEMENT_TYPE = supportSymbol
	    ? Symbol.for('react.element')
	    : 0xeac7;

	function childReconciler(shouldTrackEffects) {
	    function reconcileSingleElement(returnFiber, currentFiber, element) {
	        console.log('reconcileSingleElement', currentFiber);
	        //根据element 创建fiber 并返回
	        const fiber = createFiberFormElement(element);
	        fiber.return = returnFiber;
	        return fiber;
	    }
	    function reconcileSingleTextNode(returnFiber, currentFiber, content) {
	        console.log('currentFiber', currentFiber);
	        const fiber = new FiberNode(HostText, content, null);
	        fiber.return = returnFiber;
	        return fiber;
	    }
	    function placeSingleChild(fiber) {
	        if (shouldTrackEffects && fiber.alternate === null) {
	            fiber.flags |= Placement;
	        }
	        return fiber;
	    }
	    return function reconcileChildrenFibers(returnFiber, currentFiberNode, newChild) {
	        //return fiberNode
	        // 判断当前fiber的类型
	        if (typeof newChild === 'object' && newChild !== null) {
	            switch (newChild.$$typeof) {
	                case REACT_ELEMENT_TYPE:
	                    return placeSingleChild(reconcileSingleElement(returnFiber, currentFiberNode, newChild));
	                default:
	                    {
	                        console.log('未实现的类型', newChild);
	                    }
	                    break;
	            }
	        }
	        //如果是文本节点
	        if (typeof newChild === 'string' || typeof newChild === 'number') {
	            return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFiberNode, newChild));
	        }
	        return null;
	    };
	}
	const reconcileChildrenFibers = childReconciler(true);
	const mountChildFibers = childReconciler(false);

	//递归中的第阶段
	const beginWork = (wip) => {
	    //比较反回子fiber
	    switch (wip.tag) {
	        case HostRoot:
	            return updateHostRoot(wip);
	        case HostComponent:
	            return updateHostComponent(wip);
	        case HostText:
	            return updateHostText(wip);
	        default:
	            {
	                console.log('未实现的类型');
	            }
	            break;
	    }
	};
	function updateHostRoot(wip) {
	    const basetState = wip.memoizedState;
	    const updateQueue = wip.updateQueue;
	    const pending = updateQueue.shared.pending;
	    updateQueue.shared.pending = null;
	    const { memoizedState } = processUpdateQueue(basetState, pending);
	    wip.memoizedState = memoizedState;
	    const nextChildren = wip.memoizedState;
	    reconcileChildren(wip, nextChildren);
	    return wip.child;
	}
	function updateHostComponent(wip) {
	    const nextProps = wip.pendingProps;
	    const nextChildren = nextProps.children;
	    reconcileChildren(wip, nextChildren);
	    return wip.child;
	}
	function updateHostText(wip) {
	    console.log('updateHostText', wip);
	    return null;
	}
	function reconcileChildren(wip, children) {
	    const current = wip.alternate;
	    if (current !== null) {
	        //update
	        wip.child = reconcileChildrenFibers(wip, current?.child, children);
	    }
	    else {
	        wip.child = mountChildFibers(wip, null, children);
	    }
	}

	const createInstance = (type, props) => {
	    const element = document.createElement(type);
	    console.log('createInstance', type, props);
	    return element;
	};
	const appendInitialChild = (parent, child) => {
	    parent.appendChild(child);
	};
	const createTextInstance = (content) => {
	    return document.createTextNode(content);
	};

	const completeWork = (wip) => {
	    const current = wip.alternate;
	    const newProps = wip.pendingProps;
	    switch (wip.tag) {
	        case HostComponent:
	            if (current !== null && wip.stateNode) ;
	            else {
	                //第一步构建dom
	                const instance = createInstance(wip.type, newProps);
	                //将dom 插入dom树中
	                appendAllChildren(instance, wip);
	                wip.stateNode = instance;
	            }
	            bubbleProperties(wip);
	            return null;
	        case HostText:
	            if (current !== null && wip.stateNode) ;
	            else {
	                //第一步构建dom
	                const instance = createTextInstance(newProps.content);
	                wip.stateNode = instance;
	            }
	            bubbleProperties(wip);
	            return null;
	        case HostRoot:
	            return null;
	        default:
	            {
	                console.warn('未处理的情况', wip);
	            }
	            break;
	    }
	};
	//插入行为
	function appendAllChildren(parent, wip) {
	    let node = wip.child;
	    while (node) {
	        if (node.tag === HostComponent || node.tag === HostText) {
	            appendInitialChild(parent, node?.stateNode);
	        }
	        else if (node.child !== null) {
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
	function bubbleProperties(wip) {
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

	let workInProgress;
	function prepareFreshStack(root, expirationTime) {
	    // This is the root of the stack
	    console.log(expirationTime);
	    workInProgress = createWorkInProgress(root.current, null);
	}
	function scheduleUpdateOnFiber(fiber) {
	    // TODO
	    // 调度功能
	    const root = markUpdateFormFiberToRoot(fiber);
	    renderRoot(root);
	}
	function markUpdateFormFiberToRoot(fiber) {
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
	function renderRoot(root) {
	    prepareFreshStack(root, 0);
	    do {
	        try {
	            workLoop();
	        }
	        catch (e) {
	            {
	                console.log('warning', e);
	            }
	            workInProgress = null;
	        }
	    } while (true);
	    const finishedWork = root.current.alternate;
	    root.finishedWork = finishedWork;
	    commitRoot(root);
	}
	function commitRoot(root) {
	    const finishedWork = root.finishedWork;
	    if (finishedWork === null) {
	        return;
	    }
	    {
	        console.log('commit 阶段', finishedWork);
	    }
	    //重置
	    root.finishedWork = null;
	    //判断是否存在3个字阶段需要执行操作
	    const subTreeHasEffect = (finishedWork.subTreeFlags & MutationMask) !== NoFlags;
	    const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;
	    if (subTreeHasEffect || rootHasEffect) {
	        root.current = finishedWork;
	    }
	    else {
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
	function performUnitOfWork(fiber) {
	    // Do work here
	    // workInProgress = null;
	    const next = beginWork(fiber);
	    if (next === null) {
	        completeUnitOfWork(fiber);
	    }
	    else {
	        workInProgress = next;
	    }
	}
	function completeUnitOfWork(fiber) {
	    let node = fiber;
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

	function createContainer(container) {
	    const hostRootFiber = new FiberNode(HostRoot, {}, null);
	    const root = new FiberRootNode(container, hostRootFiber);
	    hostRootFiber.updateQueue = createUpdateQueue();
	    return root;
	}
	function updateContainer(element, root) {
	    const hostRootFiber = root.current;
	    const update = createUpdate(element);
	    enqueueUpdate(hostRootFiber.updateQueue, update);
	    scheduleUpdateOnFiber(hostRootFiber);
	    return element;
	}

	function createRoot(container) {
	    const root = createContainer(container);
	    return {
	        render(element) {
	            updateContainer(element, root);
	        }
	    };
	}

	var a = /*#__PURE__*/Object.freeze({
		__proto__: null,
		createRoot: createRoot
	});

	return a;

}));
