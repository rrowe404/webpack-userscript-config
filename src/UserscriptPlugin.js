"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserscriptPlugin = void 0;
const webpack_1 = __importDefault(require("webpack"));
const userscript_metadata_generator_1 = require("userscript-metadata-generator");
const glob = require("glob");
class UserscriptPlugin {
    entry = {};
    metaData = {};
    constructor() {
        const scripts = glob.sync("./src/**/*.user.ts");
        const metaFiles = glob.sync("./src/**/*.meta.ts");
        this.entry = scripts.reduce((acc, path) => {
            const entry = path
                .replace(".user.ts", "")
                .substring(path.lastIndexOf("/") + 1);
            acc[entry] = path;
            return acc;
        }, {});
        const entryKeys = Object.keys(this.entry);
        for (const key of entryKeys) {
            try {
                const metaFile = metaFiles.find((file) => file.includes(key));
                if (metaFile) {
                    this.metaData[key] = (0, userscript_metadata_generator_1.userscriptMetadataGenerator)(require(metaFile));
                }
            }
            catch {
                console.error(`No meta file found for ${key}!`);
            }
        }
    }
    apply(compiler) {
        return new webpack_1.default.BannerPlugin({
            banner: (data) => {
                const { name } = data.chunk;
                return name && this.metaData[name] ? this.metaData[name] : "";
            },
            entryOnly: true,
            raw: true,
        }).apply(compiler);
    }
}
exports.UserscriptPlugin = UserscriptPlugin;
