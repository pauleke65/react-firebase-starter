/* eslint-disable quotes */
const cp = require("child_process");
const path = require("path");

const mainPath = path.resolve(__dirname, "../");
const functionPath = path.resolve(mainPath, "functions");

const runNpmInstall = (cwd) => {
  const { status } = cp.spawnSync("npm", ["ci"], {
    stdio: "inherit",
    shell: true,
    cwd,
  });
  if (status !== 0) process.exit(status);
};

(() => {
  console.log("Installing main dependencies...");
  runNpmInstall(mainPath);
  console.log("Installing functions dependencies...");
  runNpmInstall(functionPath);
  console.log("Dependencies installed.");
})();
