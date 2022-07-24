import { Message } from 'discord.js';
export declare class PageManager {
    pages: string[];
    count: number;
    message: Message<boolean>;
    constructor(pages: string[], message: Message);
    nextPage(): string;
    resolvePage(...pages: string[]): string[];
    previousPage(): string;
    setPage(pageNumber: number): string;
    getPage(page: number): string;
    addLastContent(content: string): string[];
    listen(message: Message): Promise<void>;
    getPageCount(): number;
    setPageContent(page: number, content: string): string[];
    getPageNumber(page: string): number;
    addPage(page: string): string[];
    addPages(...pages: string[]): string[];
    removePages(...pages: string[]): string[];
    removePage(page: string): string[];
    getLastPage(): string;
    get pageList(): string[];
}
