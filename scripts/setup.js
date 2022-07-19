/* eslint-disable quotes */
const cp = require("child_process");
const path = require("path");

const mainPath = path.resolve(__dirname, "../");
const functionPath = path.resolve(mainPath, "functions");

const runCmd = (cmd, params, cwd = null) => {
  const { status } = cp.spawnSync(cmd, params, {
    stdio: "inherit",
    shell: true,
    cwd,
  });
  if (status !== 0) process.exit(status);
};

(() => {
  console.log("Installing main dependencies...");
  runCmd("npm", ["ci"], mainPath);
  console.log("Installing functions dependencies...");
  runCmd("npm", ["ci"], functionPath);
  console.log("Dependencies installed.");
  console.log("Firebase login...");
  runCmd("firebase", ["login"]);
  console.log("Firebase init...");
  runCmd("firebase", ["init"]);
})();
