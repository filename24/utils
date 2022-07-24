import { Client } from 'discord.js';
// @ts-ignore
import config from './config';
import { DebugTool } from '../src/';

const client = new Client({
  intents: [130815],
});
const debugTool = new DebugTool(client, {
  prefix: '.',
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', (message) => {
  debugTool.startMessage(message);
});

client.login(config.token);
