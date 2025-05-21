# Webpack Userscript Config

This is an opinionated configuration for Webpack for building userscripts. It supports building multiple userscripts from the same repository.

Requires folder structure:

    - src
      - <name>
          - <name>.meta.ts
          - <name>.user.ts

Meta files should `modules.exports` an object fitting the `Metadata` interface from `userscript-metadata-generator`

Usage: (webpack.config.ts)

    import { UserscriptConfig } from 'webpack-userscript-config';
    module.exports = new UserscriptConfig(__dirname).getConfiguration();

Usage: (tsconfig.json)

    {
      "extends": "./node_modules/webpack-userscript-config/tsconfig.json"
    }

Usage: (src/tsconfig.json)

    {
    "extends" : "../node_modules/webpack-userscript-config/tsconfig-src.json",
    }

The outer configuration allows webpack to use __dirname, while the inner configuration outputs the code in a human-readable form with tree-shaken dependencies.
