#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/utils/logger.ts
import chalk from "chalk";
var logger;
var init_logger = __esm({
  "src/utils/logger.ts"() {
    "use strict";
    logger = {
      success(str, useIcon = true) {
        console.log(`${useIcon ? "\u2705 " : ""}${chalk.green(str)}`);
      },
      info(str, useIcon = true) {
        console.log(`${useIcon ? "\u2755 " : ""}${chalk.blue(str)}`);
      },
      error(str, useIcon = true) {
        console.log(`${useIcon ? "\u274C " : ""}${chalk.red(str)}`);
      }
    };
  }
});

// package.json
var package_default;
var init_package = __esm({
  "package.json"() {
    package_default = {
      name: "eazy-cli",
      version: "0.0.1",
      description: "An easy cli for fetch specified template.",
      type: "module",
      main: "./dist/index.js",
      module: "./dist/index.js",
      bin: {
        "eazy-cli": "./dist/index.js"
      },
      scripts: {
        dev: "tsup --watch",
        build: "tsup"
      },
      keywords: [
        "cli"
      ],
      author: "YuinS316",
      license: "MIT",
      files: [
        "bin",
        "templates"
      ],
      repository: {
        type: "git",
        url: "https://github.com/YuinS316/eazy-cli.git"
      },
      engines: {
        node: ">=18.16.0",
        pnpm: ">=8.0"
      },
      dependencies: {
        chalk: "^5.3.0",
        commander: "^12.0.0",
        "fast-glob": "^3.3.2",
        "fs-extra": "^11.2.0",
        inquirer: "^9.2.16",
        "simple-git": "^3.23.0",
        typescript: "^5.4.2"
      },
      devDependencies: {
        "@types/fs-extra": "^11.0.4",
        "@types/inquirer": "^9.0.7",
        "@types/node": "18.16.0",
        tsup: "^8.0.2"
      }
    };
  }
});

// src/utils/fs.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import fse from "fs-extra";
function isExists(path3) {
  return existsSync(path3);
}
function copy(source, dest) {
  return catchWrapper(copySync, source, dest);
}
function ensureDir(path3) {
  return ensureDirSync(path3);
}
function move(src, dest) {
  return moveSync(src, dest);
}
function rename(oldPath, newPath) {
  return renameSync(oldPath, newPath);
}
function remove(path3) {
  return removeSync(path3);
}
function catchWrapper(fn, ...args) {
  try {
    return [null, fn(...args)];
  } catch (e) {
    return [e, null];
  }
}
function getDirname(url) {
  return fileURLToPath(new URL(".", url));
}
function getDestPath(...paths) {
  return path.resolve(CWD, ...paths);
}
function getVersion() {
  return package_default.version;
}
function isLocalTemplate(path3) {
  return !path3.startsWith("http");
}
var existsSync, copySync, ensureDirSync, moveSync, renameSync, removeSync;
var init_fs = __esm({
  "src/utils/fs.ts"() {
    "use strict";
    init_package();
    init_constant();
    ({
      existsSync,
      copySync,
      ensureDirSync,
      moveSync,
      renameSync,
      removeSync
    } = fse);
  }
});

// src/utils/constant.ts
import process from "node:process";
import path2 from "node:path";
var dirname2, CWD, TEMPLATE_VUE, TEMPLATE_NEST, TEMPLATE_NODE, TEMPLATE_UTILS, templateChoices;
var init_constant = __esm({
  "src/utils/constant.ts"() {
    "use strict";
    init_fs();
    dirname2 = getDirname(import.meta.url);
    CWD = process.cwd();
    TEMPLATE_VUE = path2.resolve(dirname2, "../templates/vue");
    TEMPLATE_NEST = path2.resolve(dirname2, "../templates/nest");
    TEMPLATE_NODE = path2.resolve(dirname2, "../templates/node");
    TEMPLATE_UTILS = `https://github.com/YuinS316/eazy-utils`;
    templateChoices = [
      //  local
      { name: "Vue 3", value: TEMPLATE_VUE },
      { name: "Nest.js", value: TEMPLATE_NEST },
      { name: "Node.js", value: TEMPLATE_NODE },
      //  remote
      { name: "Eazy Utils", value: TEMPLATE_UTILS }
    ];
  }
});

// src/utils/getTemplate.ts
import {
  simpleGit,
  CleanOptions
} from "simple-git";
import process2 from "node:process";
import { resolve } from "node:path";
async function fetchRemoteTemplate(gitUrl, destPath) {
  const options = {
    baseDir: destPath,
    binary: "git",
    maxConcurrentProcesses: 6,
    trimmed: false
  };
  ensureDir(destPath);
  const git = simpleGit(options);
  try {
    await git.init();
    await git.clone(gitUrl);
    await git.clean(CleanOptions.FORCE);
  } catch (e) {
    logger.error("Sorry, fetch git repo failed!");
    console.log(e);
    process2.exit(1);
  }
  const repoName = getRepoName(gitUrl);
  const incorrectPath = resolve(destPath, repoName);
  const tempDestPath = getDestPath("__temp");
  move(incorrectPath, tempDestPath);
  remove(destPath);
  rename(tempDestPath, destPath);
  logger.success("Fetch template sucess!");
  console.log("\n");
}
function copyLocalTemplate(sourcePath, destPath) {
  const [err] = copy(sourcePath, destPath);
  if (err) {
    console.log(err);
    process2.exit(1);
  } else {
    logger.success("Copy template success!");
    console.log("\n");
  }
}
function getRepoName(gitUrl) {
  return gitUrl.split("/").at(-1);
}
var init_getTemplate = __esm({
  "src/utils/getTemplate.ts"() {
    "use strict";
    init_logger();
    init_fs();
  }
});

// src/utils/index.ts
var init_utils = __esm({
  "src/utils/index.ts"() {
    "use strict";
    init_logger();
    init_constant();
    init_fs();
    init_getTemplate();
  }
});

// src/commander/create.ts
var create_exports = {};
__export(create_exports, {
  create: () => create
});
import inquirer from "inquirer";
async function create() {
  const { projectName } = await inquirer.prompt({
    type: "input",
    name: "projectName",
    message: "Please input your project name:",
    validate(input) {
      if (!input) {
        return "Project cannot be empty.";
      }
      return true;
    }
  });
  const destPath = getDestPath(projectName);
  if (isExists(destPath)) {
    logger.error(`${projectName} has already existed and cannot be recreated.`);
    return;
  }
  const { template: sourcePath } = await inquirer.prompt({
    type: "list",
    name: "template",
    message: "Which template do you want to use?",
    choices: templateChoices,
    validate(input) {
      if (!input) {
        return "Please select one or exit.";
      }
      return true;
    }
  });
  const isLocal = isLocalTemplate(sourcePath);
  if (isLocal) {
    copyLocalTemplate(sourcePath, destPath);
  } else {
    await fetchRemoteTemplate(sourcePath, destPath);
  }
  logger.info(`cd ${projectName}`, false);
  logger.info(`pnpm i`, false);
  logger.info(`pnpm dev`, false);
}
var init_create = __esm({
  "src/commander/create.ts"() {
    "use strict";
    init_utils();
  }
});

// src/index.ts
init_utils();
import { Command } from "commander";
import process3 from "node:process";
var p = new Command();
p.option("-v, --version", "get eazy-cli version").action(() => {
  logger.info(`v${getVersion()}`);
});
p.command("create").description("create template").action(async () => {
  const { create: create2 } = await Promise.resolve().then(() => (init_create(), create_exports));
  return create2();
});
p.parse(process3.argv);
