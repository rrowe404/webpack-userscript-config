import { Configuration } from "webpack";
import { UserscriptPlugin } from "./UserscriptPlugin";

const path = require('path');

class UserscriptConfig {
    private plugin: UserscriptPlugin;

    constructor(private cwd: string) {
        this.plugin = new UserscriptPlugin(cwd);
    }

    getConfiguration(): Configuration {
        return {
            entry: this.plugin.entry,
            mode: 'production', // we don't minify anyway, this just suppresses warnings
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
                path: path.resolve(this.cwd, 'dist')
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