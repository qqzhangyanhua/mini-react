import { updateQueue } from './Component';
/**
 *给真实dom添加事件
 *目的:
 1兼容处理
2.事件委托
 * @export
 * @param {*} dom
 * @param {*} eventType
 * @param {*} listener
 */
export function addEvent(dom, eventType, listener) {
	let store = dom.store || (dom.store = {});
	store[eventType] = listener; //store.onclick = listener
	if (!document[eventType]) {
		//事件委托
		document[eventType] = dispatchEvent; //document.onclick = dispatchEvent
	}
}
let syntheticEvent = {
	stopping: false,
	stopPropagation() {
		this.stopping = true;
		console.log('阻止冒泡');
	}
};
function dispatchEvent(event) {
	let { target, type } = event; //事件源，事件类型
	let eventType = 'on' + type;
	updateQueue.isBatchingUpdate = true; //批量更新
	syntheticEvent = createSyntheticEvent(event); //创建合成事件
	while (target) {
		//事件冒泡处理
		let { store } = target;
		let listener = store && store[eventType];
		listener && listener.call(target, syntheticEvent);
		if (syntheticEvent.stopping) {
			break;
		}
		target = target.parentNode;
	}

	updateQueue.batcherUpdate();
}
function createSyntheticEvent(nativeEvent) {
	for (let key in nativeEvent) {
		syntheticEvent[key] = nativeEvent[key];
	}
	return syntheticEvent;
}
