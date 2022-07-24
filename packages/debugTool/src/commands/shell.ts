import child, { ChildProcessWithoutNullStreams } from 'child_process';
import { kill } from 'process';
import { PageManager } from '../managers/PageManager';
import { DebugProcess } from '../structures/DebugProcess';
import { splitMessage } from '../utils/Utils';

export default new DebugProcess('shell', async (message, debug) => {});
