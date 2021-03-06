#!/usr/bin/env node

if (process.env.NODE_ENV !== "test") {
  // tslint:disable-next-line:no-console
  console.log(`clover Copyright (C) 2017-2018 coderfox\n
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it
under certain conditions.
For more information, see "${__dirname}/../LICENSE.md".
`);
}

import "dotenv/config";

import log from "../lib/log";

if (process.env.NODE_ENV === "test") {
  log.level = "silent";
} else if (process.env.NODE_ENV === "dev") {
  log.level = "debug";
} else {
  log.level = "info";
}

import "../lib/email";
import server from "../server";
import { writeServerConfig } from "../lib/vmess";
import { port, dbPath } from "../lib/config";
import db from "../lib/db";

const PORT = port || 3000;

db()
  .then(() => writeServerConfig())
  .then(() => {
    log.info(`database connected to ${dbPath}`);
    server.listen(PORT);
    log.info(`server listening on port ${PORT}`);
  })
  .catch((err: any) => log.error(err));
