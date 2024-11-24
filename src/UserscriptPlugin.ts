import webpack from "webpack";
import { userscriptMetadataGenerator } from "userscript-metadata-generator";
const glob = require("glob");

class UserscriptPlugin {
    public entry: Record<string, string> = {};
    private metaData: Record<string, string> = {};

  constructor() {
    const scripts = glob.sync("./src/**/*.user.ts");
    const metaFiles: string[] = glob.sync("./src/**/*.meta.ts");

    this.entry = scripts.reduce(
      (acc: Record<string, string>, path: string) => {
        const entry = path
          .replace(".user.ts", "")
          .substring(path.lastIndexOf("/") + 1);
        acc[entry] = path;
        return acc;
      },
      {}
    );

    const entryKeys = Object.keys(this.entry);

    for (const key of entryKeys) {
      try {
        const metaFile = metaFiles.find((file) => file.includes(key));

        if (metaFile) {
          this.metaData[key] = userscriptMetadataGenerator(require(metaFile));
        }
      } catch {
        console.error(`No meta file found for ${key}!`);
      }
    }
  }

  apply(compiler: webpack.Compiler) {
    return new webpack.BannerPlugin({
      banner: (data) => {
        const { name } = data.chunk;

        return name && this.metaData[name] ? this.metaData[name] : "";
      },
      entryOnly: true,
      raw: true,
    }).apply(compiler);
  }
}

export { UserscriptPlugin };