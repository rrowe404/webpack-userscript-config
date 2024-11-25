# Webpack Userscript Config

This is an opinionated configuration for Webpack for building userscripts.
May require tsconfig tweaks to work properly...

Usage: (webpack.config.ts)

    import { UserscriptConfig } from 'webpack-userscript-config';
    module.exports = new UserscriptConfig(__dirname).getConfiguration();