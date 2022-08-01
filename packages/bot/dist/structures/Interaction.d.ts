import { AutocompleteInteraction, ButtonInteraction, ContextMenuCommandInteraction, Interaction, ModalSubmitInteraction, RESTPostAPIApplicationCommandsJSONBody, SelectMenuInteraction } from 'discord.js';
import { BotClient } from './BotClient';
export declare class Button {
    name: string;
    execute: BaseInteractionFunction<ButtonInteraction<'cached'>>;
    type: InteractionType.Button;
    constructor(name: string, execute: BaseInteractionFunction<ButtonInteraction<'cached'>>);
}
export declare class SelectMenu {
    name: string;
    execute: BaseInteractionFunction<SelectMenuInteraction<'cached'>>;
    type: InteractionType.Select;
    constructor(name: string, execute: BaseInteractionFunction<SelectMenuInteraction<'cached'>>);
}
export declare class ContextMenu {
    name: string;
    data: InteractionData;
    execute: BaseInteractionFunction<ContextMenuCommandInteraction<'cached'>>;
    type: InteractionType.ContextMenu;
    constructor(name: string, data: InteractionData, execute: BaseInteractionFunction<ContextMenuCommandInteraction<'cached'>>);
}
export declare class Modal {
    name: string;
    execute: BaseInteractionFunction<ModalSubmitInteraction<'cached'>>;
    type: InteractionType.Modal;
    constructor(name: string, execute: BaseInteractionFunction<ModalSubmitInteraction<'cached'>>);
}
export declare class AutoComplete {
    name: string;
    execute: BaseInteractionFunction<AutocompleteInteraction<'cached'>>;
    type: InteractionType.AutoComplete;
    constructor(name: string, execute: BaseInteractionFunction<AutocompleteInteraction<'cached'>>);
}
export declare const enum InteractionType {
    SlashCommand = 0,
    Button = 1,
    Select = 2,
    ContextMenu = 3,
    Modal = 4,
    AutoComplete = 5
}
export declare type InteractionData = RESTPostAPIApplicationCommandsJSONBody;
export declare type BaseInteractionFunction<T = Interaction> = (client: BotClient, interaction: T) => Promise<any>;
export declare type BaseInteraction = Button | SelectMenu | ContextMenu | Modal | AutoComplete;
