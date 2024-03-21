import chalk from "chalk";

export const logger = {
  success(str: string, useIcon = true) {
    console.log(`${useIcon ? "✅ " : ""}${chalk.green(str)}`);
  },
  info(str: string, useIcon = true) {
    console.log(`${useIcon ? "❕ " : ""}${chalk.blue(str)}`);
  },
  error(str: string, useIcon = true) {
    console.log(`${useIcon ? "❌ " : ""}${chalk.red(str)}`);
  },
};
