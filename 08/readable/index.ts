import { loadTextbook } from "../libs/textbook/loadTextbook.ts";
const TEXTBOOK_PATH = "./data/wordlist-small.txt";
const TARGET_WORD_LENGTH = 6;
const textbookWords = await loadTextbook({ textbookPath: TEXTBOOK_PATH });

type WordDB = Record<number, string[]>;
const wordDB: WordDB = textbookWords
  .filter((word) => word.length <= TARGET_WORD_LENGTH)
  .reduce((result, word) => {
    const length = word.length;

    return {
      ...result,
      [length]: [...(result[length] ?? []), word],
    };
  }, {} as WordDB);

const findWords = (
  db: WordDB,
  a: number,
  b: number
): [string, string, string][] => {
  const left = db[a];
  const right = db[b];
  const answer = db[a + b];

  return answer
    .filter((ans) => {
      return left.some((l) => {
        return right.some((r) => {
          return l + r === ans;
        });
      });
    })
    .map((word) => {
      return [word, word.slice(0, a), word.slice(a)];
    });
};

for (let i = 1; i < TARGET_WORD_LENGTH; i++) {
  const answers = findWords(wordDB, i, TARGET_WORD_LENGTH - i);

  answers.forEach(([answer, left, right]) =>
    console.log([left, "+", right, "=", answer].join(" "))
  );
}
