#!/usr/bin/env node
const commander = require("commander");
const chalk = require("chalk").default;
const package = require("../package.json");
const build = require("../scripts/build");
const start = require("../scripts/start");

const program = new commander.Command(package.name).version(package.version).usage(`${chalk.cyan(package.description)}`);

// build
program.command("build").action(build);

// start
program.command("start").action(start);

// run
program.parse(process.argv);
