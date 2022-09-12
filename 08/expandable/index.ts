import { loadWordDB } from "./libs/loadWordDB.ts";
import type { WordDB, FindAnswers } from "./types.d.ts";
import * as flags from "https://deno.land/std@0.154.0/flags/mod.ts";
import { toAbsPath } from "./libs/toAbsPath.ts";

const {
  file = "./data/wordlist.txt",
  length = 6,
  finderPath,
  dbLoaderPath,
} = flags.parse(Deno.args);
const TEXTBOOK_PATH = file;
const TARGET_WORD_LENGTH = length;
const FINDER_IMPORT_PATH =
  finderPath === undefined ? "./libs/findAnswers.ts" : toAbsPath(finderPath);
const DB_LOADER_PATH =
  dbLoaderPath === undefined ? "./libs/loadWordDB.ts" : toAbsPath(dbLoaderPath);

const finder: { findAnswers: FindAnswers } = await import(FINDER_IMPORT_PATH);
const dbLoader: {
  loadWordDB: (textPath: string, targetLength: number) => WordDB;
} = await import(DB_LOADER_PATH);

console.time("loadWordDB");
const wordDB: WordDB = await dbLoader.loadWordDB(
  TEXTBOOK_PATH,
  TARGET_WORD_LENGTH
);
console.timeEnd("loadWordDB");

console.time("findAnswers");
finder
  .findAnswers(wordDB, TARGET_WORD_LENGTH)
  .forEach(([answer, left, right]) =>
    console.log([left, "+", right, "=", answer].join(" "))
  );
console.timeEnd("findAnswers");
