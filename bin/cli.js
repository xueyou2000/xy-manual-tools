#!/usr/bin/env node
const commander = require("commander");
const chalk = require("chalk").default;
const package = require("../package.json");
const build = require("../scripts/build");
const start = require("../scripts/start");
const buildPages = require("../scripts/buildPages");

const program = new commander.Command(package.name).version(package.version).usage(`${chalk.cyan(package.description)}`);

// build
program
    .command("build")
    .option("-s, --separation", "将每个例子打包为独立html页面")
    .action(build);

// start
program
    .command("start")
    .option("-p, --prot [value]", "端口", "8080")
    .option("-s, --separation", "将每个例子打包为独立html页面")
    .action(start);

// run
program.parse(process.argv);
