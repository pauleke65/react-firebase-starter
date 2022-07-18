/* eslint-disable quotes */
const cp = require("child_process");
const path = require("path");

const mainPath = path.resolve(__dirname, "../");
const functionPath = path.resolve(mainPath, "functions");

const runNpmInstall = (lib, cmd, cwd = null) => {
  const { status } = cp.spawnSync(lib, cmd, {
    stdio: "inherit",
    shell: true,
    cwd,
  });
  if (status !== 0) process.exit(status);
};

(() => {
  console.log("Installing main dependencies...");
  runNpmInstall("npm", ["ci"], mainPath);
  console.log("Installing functions dependencies...");
  runNpmInstall("npm", ["ci"], functionPath);
  console.log("Dependencies installed.");
  console.log("Firebase login...");
  runNpmInstall("firebase", ["login"]);
  console.log("Firebase init...");
  runNpmInstall("firebase", ["init"]);
})();
