import { findAnswers } from "./libs/findAnswers.ts";
import { loadWordDB } from "./libs/loadWordDB.ts";
import type { WordDB } from "./types.d.ts";
import { parse } from "https://deno.land/std@0.154.0/flags/mod.ts";
const cliParams = parse(Deno.args);
const TEXTBOOK_PATH = cliParams.file ?? "./data/wordlist.txt";
const TARGET_WORD_LENGTH = cliParams.length ?? 6;

console.time("loadWordDB");
const wordDB: WordDB = await loadWordDB(TEXTBOOK_PATH, TARGET_WORD_LENGTH);
console.timeEnd("loadWordDB");

console.time("findAnswers");
findAnswers(wordDB, TARGET_WORD_LENGTH).forEach(([answer, left, right]) =>
  console.log([left, "+", right, "=", answer].join(" "))
);
console.timeEnd("findAnswers");
