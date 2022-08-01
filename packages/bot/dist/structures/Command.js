"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = exports.MessageCommand = exports.SlashCommand = void 0;
class SlashCommand {
    data;
    execute;
    options;
    slash;
    constructor(data, execute, options, slash) {
        this.data = data;
        this.execute = execute;
        this.options = options;
        this.slash = slash;
    }
}
exports.SlashCommand = SlashCommand;
class MessageCommand {
    data;
    execute;
    constructor(data, execute) {
        this.data = data;
        this.execute = execute;
    }
}
exports.MessageCommand = MessageCommand;
class BaseCommand extends MessageCommand {
    data;
    execute;
    slash;
    constructor(data, execute, slash) {
        super(data, execute);
        this.data = data;
        this.execute = execute;
        this.slash = slash;
    }
}
exports.BaseCommand = BaseCommand;
//# sourceMappingURL=Command.js.map