import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}
export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return { action };
};
export const createUpdateQueue = <Action>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<Action>;
};

export const enqueueUpdate =(  updateQueue: UpdateQueue<any>,update: Update<any>):any => {
  updateQueue.shared.pending = update
}
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State>
) => {
	const result = { memoizedProps: baseState };
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			result.memoizedProps = action(baseState);
		} else {
			result.memoizedProps = action;
		}
	}
	return result;
};
