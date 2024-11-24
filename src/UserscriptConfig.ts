import { UserscriptPlugin } from "./UserscriptPlugin";

const path = require('path');

const userscriptPlugin = new UserscriptPlugin(__dirname);

const UserscriptConfig = {
    entry: userscriptPlugin.entry,
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
        userscriptPlugin
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}

export { UserscriptConfig }