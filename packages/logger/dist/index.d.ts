declare class Logger {
    scope: string;
    private readonly logger;
    readonly options: LoggerOptions;
    constructor(scope: string, options?: LoggerOptions);
    log(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    fatal(message: string, ...args: any[]): any;
}
declare type LoggerLevel = 'fatal' | 'error' | 'warn' | 'info' | 'chat' | 'verbose' | 'debug';
interface LoggerOptions {
    level?: LoggerLevel;
    dev?: boolean;
}

export { Logger, LoggerLevel, LoggerOptions };
