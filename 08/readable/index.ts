import { findAnswers } from "./libs/findAnswers.ts";
import { loadWordDB } from "./libs/loadWordDB.ts";
import type { WordDB } from "./types.d.ts";
const TEXTBOOK_PATH = "./data/wordlist-small.txt";
const TARGET_WORD_LENGTH = 6;

const wordDB: WordDB = await loadWordDB(TEXTBOOK_PATH, TARGET_WORD_LENGTH);

findAnswers(wordDB, TARGET_WORD_LENGTH).forEach(([answer, left, right]) =>
  console.log([left, "+", right, "=", answer].join(" "))
);
