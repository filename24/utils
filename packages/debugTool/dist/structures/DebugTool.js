"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var DebugTool = /** @class */ (function () {
    function DebugTool(client, options) {
        var _this = this;
        this.options = options;
        if (!(client instanceof discord_js_1.Client))
            throw new TypeError('Invalid `client`. `client` parameter is required.');
        this.client = client;
        if (options.noPermission && typeof options.noPermission !== 'function')
            throw new TypeError('`noPermission` must allow a function.');
        this.owners = options.owners;
        client.once('ready', function () {
            if (!_this.owners) {
                console.warn('[ debugTool ] Owners not given. Fetching from Application.');
                client.application.fetch().then(function (data) {
                    var _a;
                    // @ts-ignore
                    _this.owners = ((_a = data.owner.members) === null || _a === void 0 ? void 0 : _a.map(function (el) { return el.id; })) || [data.owner.id] || [];
                    console.info("[ debugTool ] Fetched ".concat(_this.owners.length, " owner(s): ").concat(_this.owners.length > 3
                        ? _this.owners.slice(0, 3).join(', ') + " and ".concat(_this.owners.length - 3, " more owners")
                        : _this.owners.join(', ')));
                });
            }
        });
        if (!options.aliases || !options.aliases.length)
            options.aliases = ['debug', 'debugtool'];
    }
    return DebugTool;
}());
exports.default = DebugTool;
