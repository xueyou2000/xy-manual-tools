const fs = require("fs-extra");
const spawn = require("cross-spawn");
const PATHS = require("./path");
const glob = require("glob");
const path = require("path");

/**
 * 寻找package配置
 */
module.exports.getPackageConfig = function getPackageConfig() {
    const packageFile = PATHS.resolveProject("package.json");
    if (fs.existsSync(packageFile)) {
        return fs.readJSONSync(packageFile);
    } else {
        throw new Error(`项目不是合法的npm包, ${packageFile}`);
    }
};

/**
 * 运行
 */
module.exports.spawnAsync = function spawnAsync(command, args, options) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, options);
        child.on("close", (code) => {
            console.log("code", code);
            if (code !== 0) {
                reject(new Error(`command: ${command} ${args.toString()}`));
            } else {
                resolve();
            }
        });
        child.on("error", (err) => {
            reject(err);
        });
    });
};

/**
 * 生成demo入口
 */
module.exports.createLoadExamplesEntry = function createLoadExamplesEntry() {
    const demoInfos = module.exports.createExamplesConfig();
    fs.writeFileSync(PATHS.resolveCodebox("demoContentMap.json"), JSON.stringify(demoInfos, null, 4));
    let entryCode = `
import { DemoInfo } from "./interface";
import demoContentMap from "./demoContentMap.json";
const demoInfos: DemoInfo[] = [];
    `;
    for (let name in demoInfos) {
        const info = demoInfos[name];
        const componentName = name[0].toUpperCase() + name.slice(1);
        entryCode += `import ${componentName} from '${info.filePath.replace(path.extname(info.filePath), "")}'\n`;
        entryCode += `demoInfos.push({ component: ${componentName}, ...demoContentMap['${name}'] });\n`;
    }
    entryCode += `export default demoInfos;`;
    fs.writeFileSync(PATHS.resolveCodebox("demoInfos.tsx"), entryCode);
};

/**
 * 获取demo配置
 */
module.exports.createExamplesConfig = function createExamplesConfig() {
    const demoConfig = require(PATHS.resolveProject("demos.json"));
    const files = glob.sync(PATHS.resolveProject("examples/*.tsx"));
    const demoInfos = {};
    files.forEach((filePath) => {
        const fileName = path.basename(filePath, path.extname(filePath));
        const code = fs.readFileSync(filePath, { encoding: "utf-8" });
        const config = fileName in demoConfig ? demoConfig[fileName] : {};
        demoInfos[fileName] = { fileName, code, filePath, title: config.title, desc: config.desc };
    });

    return demoInfos;
};
