import { loadWordDB } from "./libs/loadWordDB.ts";
import type { WordDB, FindAnswers } from "./types.d.ts";
import * as flags from "https://deno.land/std@0.154.0/flags/mod.ts";
const {
  file = "./data/wordlist.txt",
  length = 6,
  finderPath = "./libs/findAnswers.ts",
} = flags.parse(Deno.args);
const TEXTBOOK_PATH = file;
const TARGET_WORD_LENGTH = length;
const finder: { findAnswers: FindAnswers } = await import(finderPath);

console.time("loadWordDB");
const wordDB: WordDB = await loadWordDB(TEXTBOOK_PATH, TARGET_WORD_LENGTH);
console.timeEnd("loadWordDB");

console.time("findAnswers");
finder
  .findAnswers(wordDB, TARGET_WORD_LENGTH)
  .forEach(([answer, left, right]) =>
    console.log([left, "+", right, "=", answer].join(" "))
  );
console.timeEnd("findAnswers");
