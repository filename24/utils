import { Collection } from 'discord.js';

export function platfromReslove(platform: NodeJS.Platform): string {
  switch (platform) {
    case 'win32':
      return 'Windows';
    case 'linux':
      return 'Linux';
    case 'darwin':
      return 'MacOS';
    case 'android':
      return 'Android';
    case 'freebsd':
      return 'FreeBSD';
    case 'openbsd':
      return 'OpenBSD';
    case 'netbsd':
      return 'NetBSD';
    case 'sunos':
      return 'SunOS';
    default:
      return 'Unknown';
  }
}

export class System {
  static getMemoryUsage(): string {
    return `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
  }

  static processStartTime() {
    return new Date(Date.now() - process.uptime() * 1000);
  }
}

export function pingStatus(ping: number): string {
  if (ping < 100) {
    return `+ Websocket Latency: ${ping}ms`;
  } else if (ping < 200) {
    return `--- Websocket Latency: ${ping}ms`;
  } else {
    return `- Websocket Latency: ${ping}ms`;
  }
}

export function isInstance(target: unknown, theClass: any) {
  if (
    (Array.isArray(target) || target instanceof Collection) &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target.map((f: any) => f instanceof theClass).includes(false)
  )
    return false;
  else if (!(target instanceof theClass)) return false;
  else return true;
}

export function isGenerator(target: any) {
  return target && typeof target.next === 'function' && typeof target.throw === 'function';
}

export function splitMessage(
  text: string,
  { maxLength = 2_000, char = [new RegExp(`.{1,2000}`, 'g'), '\n'], prepend = '', append = '' } = {},
): string[] {
  if (text.length <= maxLength) return [text];

  text = resolveString(text);
  let splitText: string[] = [text];
  if (Array.isArray(char)) {
    while (char.length > 0 && splitText.some((elem) => elem.length > maxLength)) {
      const currentChar = char.shift();
      if (currentChar instanceof RegExp) {
        splitText = splitText.flatMap((chunk) => chunk.match(currentChar)) as string[];
      } else {
        if (!currentChar) return splitText;
        splitText = splitText.flatMap((chunk) => chunk.split(currentChar));
      }
    }
  } else {
    splitText = text.split(char);
  }
  if (splitText.some((elem) => elem.length > maxLength)) throw new RangeError('SPLIT_MAX_LEN');
  const messages = [];
  let msg = '';
  for (const chunk of splitText) {
    if (msg && (msg + char + chunk + append).length > maxLength) {
      messages.push(msg + append);
      msg = prepend;
    }
    msg += (msg && msg !== prepend ? char : '') + chunk;
  }
  return messages.concat(msg).filter((m) => m);
}

export function resolveString(data: any) {
  if (typeof data === 'string') return data;
  if (Array.isArray(data)) return data.join('\n');
  return String(data);
}
