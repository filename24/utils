import { codeBlock, ComponentType, Message } from 'discord.js';
import { DebugProcess } from '../structures/DebugProcess';
import { splitMessage } from '../utils/Utils';

export class PageManager {
  public pages: string[];
  public count: number;
  public message: Message<boolean>;

  constructor(pages: string[], message: Message) {
    this.pages = pages;
    this.count = 0;
    this.message = message;
  }

  public nextPage(): string {
    this.count++;
    if (this.count >= this.pages.length) {
      this.count = 0;
    }

    if (this.pages[this.count].length > 1900) {
      return this.resolveContent(this.pages[this.count]);
    }
    return this.pages[this.count];
  }

  public resolvePage(...pages: string[]): string[] {
    const resolvedPages: string[] = [];

    pages.forEach((page) => {
      if (page.length > 1900) {
        resolvedPages.push(...splitMessage(page));
      }
    });

    this.pages = !resolvedPages.length ? pages : resolvedPages;
    return resolvedPages;
  }

  public resolveContent(content: string): string {
    return splitMessage(content)[0];
  }

  public previousPage(): string {
    this.count--;
    if (this.count < 0) {
      this.count = this.pages.length - 1;
    }

    this.resolvePage(...this.pages);
    return this.pages[this.count];
  }

  public setPage(pageNumber: number): string {
    this.count = pageNumber;

    this.resolvePage(...this.pages);
    return this.pages[pageNumber];
  }

  public getPage(page: number): string {
    this.count = page;

    return this.pages[page];
  }

  public addLastContent(content: string): string[] {
    this.setPageContent(this.getPageCount() - 1, this.getLastPage() + '\n' + content);

    return this.pages;
  }

  public async listen(message: Message) {
    const button = message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter: (component) => component.user.id === this.message.author.id,
      idle: 1000 * 60 * 3,
    });

    button.on('collect', (component) => {
      component.deferUpdate();
      if (component.customId === 'debug.next') {
        message.edit({ content: codeBlock('js', this.nextPage()), components: [DebugProcess.buttons] });
      } else if (component.customId === 'debug.previous') {
        message.edit({ content: codeBlock('js', this.previousPage()), components: [DebugProcess.buttons] });
      } else if (component.customId === 'debug.stop') {
        message.edit({ content: codeBlock('js', this.getPage(this.count)), components: [] });
      }
    });

    button.on('end', () => {
      message.edit({ content: codeBlock('js', this.getPage(this.count)), components: [] });

      message.reply('Debug process stopped. Reason: Time out');
    });

    button.on('ignore', async (component) => {
      await component.deferReply({
        ephemeral: true,
      });

      await component.editReply('❌ You are not allowed to use this button.');
    });
  }

  public getPageCount(): number {
    return this.pages.length;
  }

  public setPageContent(page: number, content: string): string[] {
    this.pages[page] = content;

    return this.pages;
  }
  public getPageNumber(page: string): number {
    return this.pages.indexOf(page);
  }

  public addPage(page: string): string[] {
    this.pages.push(page);

    return this.pages;
  }

  public addPages(...pages: string[]): string[] {
    this.pages.push(...pages);
    return this.pages;
  }

  public removePages(...pages: string[]): string[] {
    for (const page of pages) {
      this.pages.splice(this.pages.indexOf(page), 1);
    }
    return this.pages;
  }

  public removePage(page: string): string[] {
    this.pages.splice(this.pages.indexOf(page), 1);

    return this.pages;
  }

  public getLastPage(): string {
    return this.pages[this.pages.length - 1];
  }

  public get pageList(): string[] {
    return this.pages;
  }
}
