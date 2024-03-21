#!/usr/bin/env node
import { Command } from "commander";
import process from "node:process";
import { getVersion, logger } from "./utils";

const p = new Command();

p.option("-v, --version", "get eazy-cli version").action(() => {
  logger.info(`v${getVersion()}`);
});

p.command("create")
  .description("create template")
  .action(async () => {
    const { create } = await import("./commander/create");
    return create();
  });

p.parse(process.argv);
