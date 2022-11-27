export type WorkTag =
	| typeof FunctionComponent
	| typeof ClassComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0;
export const ClassComponent = 1;
export const HostComponent = 5;
export const HostText = 6;
export const HostRoot = 3;
