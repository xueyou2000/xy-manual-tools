const fs = require("fs");
const path = require("path");

const projectDirectory = process.env.project || fs.realpathSync(process.cwd());
// const projectDirectory = path.resolve("E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button");

const codeboxDirectory = path.resolve(__dirname, "../manual");
const resolveProject = (relativePath) => path.resolve(projectDirectory, relativePath);
const resolveCodebox = (relativePath) => path.resolve(codeboxDirectory, relativePath);

module.exports = {
    projectDirectory,
    resolveProject,
    codeboxDirectory,
    resolveCodebox
};
