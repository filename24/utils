import { DebugProcessFunction } from '../../types';
export declare class DebugProcess {
  name: string;
  execute: DebugProcessFunction;
  constructor(name: string, execute: DebugProcessFunction);
}
