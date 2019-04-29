const fs = require("fs-extra");
const spawn = require("cross-spawn");
const PATHS = require("../config/path");
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
 * 生成例子入口
 */
module.exports.createLoadExamplesEntry = function createLoadExamplesEntry() {
    const configs = module.exports.createManualConfig();
    fs.writeFileSync(PATHS.resolveCodebox("Config/Demos.json"), JSON.stringify(configs, null, 4));
    let entryCode = `
import React from 'react';
export interface DemoConfig {
    fileName?: string;
    code?: string;
    title?: string;
    desc?: string;
    component?: React.ReactNode;
}

import ConfigJson from "./Demos.json";
const configs: DemoConfig[] = [];
    `;

    configs.forEach((config, i) => {
        const componentName = config.name[0].toUpperCase() + config.name.slice(1);
        entryCode += `import ${componentName} from '${path
            .normalize(config.filePath)
            .replace(/\\/g, "\\\\")
            .replace(path.extname(config.filePath), "")}'\n`;
        entryCode += `configs.push({ component: <${componentName} />, ...(ConfigJson[${i}]) });\n`;
    });
    entryCode += `export default configs;`;
    fs.writeFileSync(PATHS.resolveCodebox("Config/index.tsx"), entryCode);
};

/**
 * 获取手册配置
 */
module.exports.createManualConfig = function createManualConfig() {
    const manualConfigs = require(PATHS.resolveProject("xy-manual-tools.json"));
    return manualConfigs.map((config) => {
        const filePath = PATHS.resolveProject(`examples/${config.name}.tsx`);
        const fileName = path.basename(filePath, path.extname(filePath));
        const code = fs.readFileSync(filePath, { encoding: "utf-8" });
        return { fileName, code, filePath, ...config };
    });
};

/**
 * 获取说明
 */
module.exports.getManualSummary = function getManualSummary() {
    const markdown = fs.readFileSync(PATHS.resolveProject("README.md"), { encoding: "utf-8" });
    const imgIndex = markdown.indexOf("# ");

    const apiStartFlag = "## API";
    const apiIndex = markdown.indexOf(apiStartFlag);
    const apiEndIndex = markdown.slice(apiIndex + apiStartFlag.length).search(/[^#]##\s/) + apiIndex + apiStartFlag.length;

    const end = apiEndIndex === -1 ? undefined : apiEndIndex;
    const apiContent = markdown.slice(apiIndex + apiStartFlag.length, end);

    return [markdown.slice(0, imgIndex), markdown.slice(imgIndex, apiIndex), apiContent, markdown.slice(end)];
};
