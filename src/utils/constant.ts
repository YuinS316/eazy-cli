import process from "node:process";
import { getDirname } from "./fs";
import path from "node:path";

//  point to /dist
export const dirname = getDirname(import.meta.url);

//  point to the path where you execute cli
export const CWD = process.cwd();

//  template local path
export const TEMPLATE_VUE = path.resolve(dirname, "../templates/vue");
export const TEMPLATE_NEST = path.resolve(dirname, "../templates/nest");
export const TEMPLATE_NODE = path.resolve(dirname, "../templates/node");

//  template remote path
export const TEMPLATE_UTILS = `https://github.com/YuinS316/eazy-utils`;

//  template choices
export const templateChoices = [
  //  local
  { name: "Vue 3", value: TEMPLATE_VUE },
  { name: "Nest.js", value: TEMPLATE_NEST },
  { name: "Node.js", value: TEMPLATE_NODE },
  //  remote
  { name: "Eazy Utils", value: TEMPLATE_UTILS },
];
