import inquirer from "inquirer";
import process from "node:process";
import {
  logger,
  getDestPath,
  isExists,
  fetchRemoteTemplate,
  isLocalTemplate,
  copyLocalTemplate,
  templateChoices,
} from "../utils";

export async function create() {
  const { projectName } = await inquirer.prompt({
    type: "input",
    name: "projectName",
    message: "Please input your project name:",
    validate(input) {
      if (!input) {
        return "Project cannot be empty.";
      }
      return true;
    },
  });

  const destPath = getDestPath(projectName);

  //  check project if has been created
  if (isExists(destPath)) {
    logger.error(`${projectName} has already existed and cannot be recreated.`);
    return;
  }

  //  select template
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
    },
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
