"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionType = exports.AutoComplete = exports.Modal = exports.ContextMenu = exports.SelectMenu = exports.Button = void 0;
class Button {
    name;
    execute;
    type = 1 /* InteractionType.Button */;
    constructor(name, execute) {
        this.name = name;
        this.execute = execute;
    }
}
exports.Button = Button;
class SelectMenu {
    name;
    execute;
    type = 2 /* InteractionType.Select */;
    constructor(name, execute) {
        this.name = name;
        this.execute = execute;
    }
}
exports.SelectMenu = SelectMenu;
class ContextMenu {
    name;
    data;
    execute;
    type = 3 /* InteractionType.ContextMenu */;
    constructor(name, data, execute) {
        this.name = name;
        this.data = data;
        this.execute = execute;
    }
}
exports.ContextMenu = ContextMenu;
class Modal {
    name;
    execute;
    type = 4 /* InteractionType.Modal */;
    constructor(name, execute) {
        this.name = name;
        this.execute = execute;
    }
}
exports.Modal = Modal;
class AutoComplete {
    name;
    execute;
    type = 5 /* InteractionType.AutoComplete */;
    constructor(name, execute) {
        this.name = name;
        this.execute = execute;
    }
}
exports.AutoComplete = AutoComplete;
var InteractionType;
(function (InteractionType) {
    InteractionType[InteractionType["SlashCommand"] = 0] = "SlashCommand";
    InteractionType[InteractionType["Button"] = 1] = "Button";
    InteractionType[InteractionType["Select"] = 2] = "Select";
    InteractionType[InteractionType["ContextMenu"] = 3] = "ContextMenu";
    InteractionType[InteractionType["Modal"] = 4] = "Modal";
    InteractionType[InteractionType["AutoComplete"] = 5] = "AutoComplete";
})(InteractionType = exports.InteractionType || (exports.InteractionType = {}));
//# sourceMappingURL=Interaction.js.map