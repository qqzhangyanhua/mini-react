import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { NoFlags } from './fiberFlags';
export class FiberNode {
	type: any;
	tag: WorkTag;
	key: Key;
	pendingProps: any;
	stateNode: any;
	return: FiberNode | null;
	index: number;
	props: Props;
	sibling: FiberNode | null;
	ref: Ref | null;
	child: FiberNode | null;
	memoizedProps: Props | null;
	alternate: FiberNode | null;
	flags: any;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
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
		this.flags = NoFlags;
	}
}
