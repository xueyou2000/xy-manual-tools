const fs = require("fs");
const path = require("path");
// const projectDirectory = fs.realpathSync(process.cwd());
const projectDirectory = path.resolve("E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button");

const codeboxDirectory = path.resolve(__dirname, "../codeBox");
const resolveProject = (relativePath) => path.resolve(projectDirectory, relativePath);
const resolveCodebox = (relativePath) => path.resolve(codeboxDirectory, relativePath);

module.exports = {
    projectDirectory,
    resolveProject,
    codeboxDirectory,
    resolveCodebox
};
