export type Flags = number;
export const NoFlags = 0b0000001;
export const PerformedWork = 0b000010;
export const Placement = 0b0000010;
export const Update = 0b0000100;
export const ChildDeletion = 0b0001000;
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