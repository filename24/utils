import { DebugProcessFunction } from '../../types';

export class DebugProcess {
  constructor(public name: string, public execute: DebugProcessFunction) {}
}
