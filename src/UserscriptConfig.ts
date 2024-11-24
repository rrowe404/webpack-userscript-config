import { Configuration, EntryObject, webpack } from "webpack";
import { UserscriptPlugin } from "./UserscriptPlugin";

const path = require('path');

class UserscriptConfig {
    private plugin: UserscriptPlugin;

    constructor(cwd: string) {
        this.plugin = new UserscriptPlugin(cwd);
    }

    getConfiguration(): Configuration {
        return {
            entry: this.plugin.entry,
            module: {
                rules: [
                    { test: /\.ts$/, use: ['ts-loader'] }
                ]
            },
            optimization: {
                minimize: false,
                usedExports: true
            },
            output: {
                clean: true,
                filename: '[name].user.js',
                path: path.resolve(__dirname, 'dist')
            },
            plugins: [
                this.plugin
            ],
            resolve: {
                extensions: ['.ts', '.js']
            }
        }
    }
}

export { UserscriptConfig }