/// <reference types="node" />
export declare function platfromReslove(platform: NodeJS.Platform): string;
export declare class System {
    static getMemoryUsage(): string;
    static processStartTime(): Date;
}
export declare function pingStatus(ping: number): string;
export declare function isInstance(target: unknown, theClass: any): boolean;
export declare function isGenerator(target: any): any;
export declare function splitMessage(text: string, { maxLength, char, prepend, append }?: {
    maxLength?: number | undefined;
    char?: (string | RegExp)[] | undefined;
    prepend?: string | undefined;
    append?: string | undefined;
}): string[];
export declare function resolveString(data: any): string;
