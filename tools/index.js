const fs = require("fs-extra");
const spawn = require("cross-spawn");
const PATHS = require("../config/path");
const glob = require("glob");
const path = require("path");
const os = require("os");

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
module.exports.spawnAsync = function spawnAsync(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const opt = options;
        if (opt && opt.env) {
            opt.env = Object.assign(process.env, opt.env);
        }

        const child = spawn(command, args, opt);
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

    return configs;
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

/**
 * 更新tsconfig
 */
module.exports.updateTsconfig = function updateTsconfig() {
    const packageJson = module.exports.getPackageConfig();
    const tsconfigFile = path.resolve(__dirname, "../tsconfig.json");
    const nowTsConfig = require(tsconfigFile);
    nowTsConfig.paths = {
        [packageJson.name]: ["src/index.tsx"],
        [`${packageJson.name}/*`]: ["src/*"],
    };

    return tsconfigFile;
};

/**
 * 创建独立页面菜单和配置
 */
module.exports.createMenus = function createMenus() {
    const configs = module.exports.createManualConfig();

    let links = "";
    let imports = "";
    let routesCfg = "";
    configs.forEach((c) => {
        const pathName = c.name[0].toLowerCase() + c.name.slice(1);
        const componentName = c.name[0].toUpperCase() + c.name.slice(1);
        links += `<li><Link to="/${pathName}">${c.title}</Link></li>\n`;
        imports += `import ${componentName} from '${path
            .normalize(c.filePath)
            .replace(/\\/g, "\\\\")
            .replace(path.extname(c.filePath), "")}'\n`;
        routesCfg += `{ path: "/${pathName}", component: ${componentName} },\n`;
    });

    let routesCode = `
    import { RouteConfig } from "react-router-config";
    import Menus from '../menus';
    ${imports}
    
    const routes: RouteConfig[] = [
        {
            path: "/",
            exact: true,
            component: Menus,
        },
        ${routesCfg}
    ];
    
    export default routes;
    `;
    fs.writeFileSync(PATHS.resolveCodebox("Config/routes.tsx"), routesCode);

    let code = `
    import React from "react";
    import { Link } from "react-router-dom";
    
    export default function Menus() {
        return (
            <ul className="manual-menus">${links}</ul>
        );
    }
    `;
    fs.writeFileSync(PATHS.resolveCodebox("menus.tsx"), code);
};

/**
 * 获取内网ip
 */
module.exports.findHost = function findHost() {
    var ifaces = os.networkInterfaces();
    var host = null;

    for (var dev in ifaces) {
        ifaces[dev].forEach(function(details, alias) {
            if (details.family == "IPv4" && details.address.indexOf("127") === -1) {
                host = details.address;
            }
        });
    }

    return host;
};
