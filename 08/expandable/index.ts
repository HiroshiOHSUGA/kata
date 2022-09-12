import type { DBLoader, PairFinder, Printer } from "./types.d.ts";
import * as flags from "https://deno.land/std@0.154.0/flags/mod.ts";
import { toAbsPath } from "./libs/toAbsPath.ts";

const {
  file = "./data/wordlist.txt",
  length = 6,
  finderPath,
  dbLoaderPath,
  printerPath,
} = flags.parse(Deno.args);
const TEXTBOOK_PATH = file;
const TARGET_WORD_LENGTH = length;

const FINDER_IMPORT_PATH =
  finderPath === undefined ? "./libs/findAnswers.ts" : toAbsPath(finderPath);
const DB_LOADER_PATH =
  dbLoaderPath === undefined ? "./libs/loadWordDB.ts" : toAbsPath(dbLoaderPath);
const PRINTER_PATH =
  dbLoaderPath === undefined ? "./libs/printer.ts" : toAbsPath(printerPath);

const { default: finder }: { default: PairFinder } = await import(
  FINDER_IMPORT_PATH
);
const {
  default: dbLoader,
}: {
  default: DBLoader;
} = await import(DB_LOADER_PATH);
const { default: printer }: { default: Printer } = await import(PRINTER_PATH);

console.time("loadWordDB");
const wordDB = await dbLoader(TEXTBOOK_PATH, TARGET_WORD_LENGTH);
console.timeEnd("loadWordDB");

console.time("findAnswers");
finder(wordDB, TARGET_WORD_LENGTH).forEach(([answer, left, right]) =>
  printer(answer, left, right)
);
console.timeEnd("findAnswers");
