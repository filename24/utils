"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageManager = void 0;
const discord_js_1 = require("discord.js");
const DebugProcess_1 = require("../structures/DebugProcess");
const Utils_1 = require("../utils/Utils");
class PageManager {
    pages;
    count;
    message;
    constructor(pages, message) {
        this.pages = pages;
        this.count = 0;
        this.message = message;
    }
    nextPage() {
        this.count++;
        if (this.count >= this.pages.length) {
            this.count = 0;
        }
        if (this.pages[this.count].length > 1900) {
            return this.resolveContent(this.pages[this.count]);
        }
        return this.pages[this.count];
    }
    resolvePage(...pages) {
        const resolvedPages = [];
        pages.forEach((page) => {
            if (page.length > 1900) {
                resolvedPages.push(...(0, Utils_1.splitMessage)(page));
            }
        });
        this.pages = !resolvedPages.length ? pages : resolvedPages;
        return resolvedPages;
    }
    resolveContent(content) {
        return (0, Utils_1.splitMessage)(content)[0];
    }
    previousPage() {
        this.count--;
        if (this.count < 0) {
            this.count = this.pages.length - 1;
        }
        this.resolvePage(...this.pages);
        return this.pages[this.count];
    }
    setPage(pageNumber) {
        this.count = pageNumber;
        this.resolvePage(...this.pages);
        return this.pages[pageNumber];
    }
    getPage(page) {
        this.count = page;
        return this.pages[page];
    }
    addLastContent(content) {
        this.setPageContent(this.getPageCount() - 1, this.getLastPage() + '\n' + content);
        return this.pages;
    }
    async listen(message) {
        const button = message.createMessageComponentCollector({
            componentType: discord_js_1.ComponentType.Button,
            filter: (component) => component.user.id === this.message.author.id,
            idle: 1000 * 60 * 3,
        });
        button.on('collect', (component) => {
            component.deferUpdate();
            if (component.customId === 'debug.next') {
                message.edit({ content: (0, discord_js_1.codeBlock)('js', this.nextPage()), components: [DebugProcess_1.DebugProcess.buttons] });
            }
            else if (component.customId === 'debug.previous') {
                message.edit({ content: (0, discord_js_1.codeBlock)('js', this.previousPage()), components: [DebugProcess_1.DebugProcess.buttons] });
            }
            else if (component.customId === 'debug.stop') {
                message.edit({ content: (0, discord_js_1.codeBlock)('js', this.getPage(this.count)), components: [] });
            }
        });
        button.on('end', () => {
            message.edit({ content: (0, discord_js_1.codeBlock)('js', this.getPage(this.count)), components: [] });
            message.reply('Debug process stopped. Reason: Time out');
        });
        button.on('ignore', async (component) => {
            await component.deferReply({
                ephemeral: true,
            });
            await component.editReply('❌ You are not allowed to use this button.');
        });
    }
    getPageCount() {
        return this.pages.length;
    }
    setPageContent(page, content) {
        this.pages[page] = content;
        return this.pages;
    }
    getPageNumber(page) {
        return this.pages.indexOf(page);
    }
    addPage(page) {
        this.pages.push(page);
        return this.pages;
    }
    addPages(...pages) {
        this.pages.push(...pages);
        return this.pages;
    }
    removePages(...pages) {
        for (const page of pages) {
            this.pages.splice(this.pages.indexOf(page), 1);
        }
        return this.pages;
    }
    removePage(page) {
        this.pages.splice(this.pages.indexOf(page), 1);
        return this.pages;
    }
    getLastPage() {
        return this.pages[this.pages.length - 1];
    }
    get pageList() {
        return this.pages;
    }
}
exports.PageManager = PageManager;
//# sourceMappingURL=PageManager.js.map