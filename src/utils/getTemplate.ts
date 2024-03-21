import {
  simpleGit,
  SimpleGit,
  CleanOptions,
  SimpleGitOptions,
} from "simple-git";
import process from "node:process";
import { logger } from "./logger";
import { copy, ensureDir, getDestPath, move, remove, rename } from "./fs";
import { resolve } from "node:path";

export async function fetchRemoteTemplate(gitUrl: string, destPath: string) {
  const options: Partial<SimpleGitOptions> = {
    baseDir: destPath,
    binary: "git",
    maxConcurrentProcesses: 6,
    trimmed: false,
  };

  //  ensure destination is exist otherwise simpleGit init will failed
  ensureDir(destPath);

  const git: SimpleGit = simpleGit(options);

  try {
    //  init .git
    await git.init();

    //  fetch git repo
    await git.clone(gitUrl);

    //  clean git history
    await git.clean(CleanOptions.FORCE);
  } catch (e) {
    logger.error("Sorry, fetch git repo failed!");
    console.log(e);
    process.exit(1);
  }

  //  tips: when finish git clone, the directory structure is incorrect and should move manually
  //  example: project name is foo, git repo is eazy-utils
  //  output: /foo/eazy-utils
  //  expected: move eazy-utils -> foo
  const repoName = getRepoName(gitUrl)!;
  const incorrectPath = resolve(destPath, repoName);
  const tempDestPath = getDestPath("__temp");

  //  copy repo to temp directory
  move(incorrectPath, tempDestPath);

  //  delete the dest directory (the directory is empty)
  remove(destPath);

  //  rename temp to be the real project name
  rename(tempDestPath, destPath);

  logger.success("Fetch template sucess!");
  console.log("\n");
}

//  copy file
export function copyLocalTemplate(sourcePath: string, destPath: string) {
  const [err] = copy(sourcePath, destPath);

  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    logger.success("Copy template success!");
    console.log("\n");
  }
}

export function getRepoName(gitUrl: string) {
  return gitUrl.split("/").at(-1);
}
