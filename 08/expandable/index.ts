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

function getFlagPathValue(
  path: string | undefined,
  defaultPath: string
): string {
  return path === undefined ? defaultPath : toAbsPath(path);
}
async function importDefaultModule<T extends unknown>(
  path: string
): Promise<T> {
  const { default: defaultModule }: { default: T } = await import(path);
  return defaultModule;
}
const FINDER_PATH = getFlagPathValue(finderPath, "./libs/findAnswers.ts");
const DB_LOADER_PATH = getFlagPathValue(dbLoaderPath, "./libs/loadWordDB.ts");
const PRINTER_PATH = getFlagPathValue(printerPath, "./libs/printer.ts");

const finder = await importDefaultModule<PairFinder>(FINDER_PATH);
const dbLoader = await importDefaultModule<DBLoader>(DB_LOADER_PATH);
const printer = await importDefaultModule<Printer>(PRINTER_PATH);

console.time("loadWordDB");
const wordDB = await dbLoader(TEXTBOOK_PATH, TARGET_WORD_LENGTH);
console.timeEnd("loadWordDB");

console.time("findAnswers");
finder(wordDB, TARGET_WORD_LENGTH).forEach(([answer, left, right]) =>
  printer(answer, left, right)
);
console.timeEnd("findAnswers");
