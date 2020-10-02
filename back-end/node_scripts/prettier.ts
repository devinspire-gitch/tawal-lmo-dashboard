import * as path from "path";
import os from "os";
import { spawn } from "child_process";

const { log } = console;

const prettierPath = path.join(
  __dirname,
  "..",
  "node_modules",
  ".bin",
  os.platform() === "win32" ? "prettier.cmd" : "prettier"
);

const prettierArguments = [
  "--ignore-path",
  ".gitignore",
  "--write",
  "**/*.{ts,tsx,js,jsx,json,html,vue,css,md,mdx,yml,yaml}"
];

const directoryToRun = path.join(__dirname, "..");

log(`Formatting files with ${prettierPath}${os.EOL}`);

const prettierInstance = spawn(prettierPath, prettierArguments, {
  cwd: directoryToRun
});

prettierInstance.stdout.on("data", (data): void => log(`[OK] ${data}`));
