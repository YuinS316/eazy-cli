import PackageJson from "../../package.json";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, CWD } from "./constant";
import fse from "fs-extra";

// tips: because fs-extra is a commonjs module
// it can't use like esm export
const {
  existsSync,
  copySync,
  ensureDirSync,
  moveSync,
  renameSync,
  removeSync,
} = fse;

// #region =====> fse function

export function isExists(path: string) {
  return existsSync(path);
}

export function copy(source: string, dest: string) {
  return catchWrapper(copySync, source, dest);
}

export function ensureDir(path: string) {
  return ensureDirSync(path);
}

export function move(src: string, dest: string) {
  return moveSync(src, dest);
}

export function rename(oldPath: string, newPath: string) {
  return renameSync(oldPath, newPath);
}

export function remove(path: string) {
  return removeSync(path);
}
// #endregion

function catchWrapper<T>(
  fn: (...args: any[]) => T,
  ...args: any[]
): [null, T] | [Error, null] {
  try {
    return [null, fn(...args)];
  } catch (e) {
    return [e as Error, null];
  }
}

export function getDirname(url: string) {
  return fileURLToPath(new URL(".", url));
}

export function getDestPath(...paths: string[]) {
  return path.resolve(CWD, ...paths);
}

export function getVersion() {
  return PackageJson.version;
}

export function isLocalTemplate(path: string) {
  return !path.startsWith("http");
}
