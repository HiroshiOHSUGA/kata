import { WordDB, AnswerPair } from "../types.d.ts";

export function findAnswers(
  db: WordDB,
  targetWordLength: number
): AnswerPair[] {
  let result: AnswerPair[] = [];
  for (let i = 1; i < targetWordLength; i++) {
    const answers: AnswerPair[] = findWordPairs(db, i, targetWordLength - i);

    result = [...result, ...answers];
  }

  return result;
}

const findWordPairs = (
  db: WordDB,
  leftLength: number,
  rightLength: number
): AnswerPair[] => {
  const left = db[leftLength];
  const right = db[rightLength];
  const answer = db[leftLength + rightLength];

  return answer
    .filter((ans) => {
      return left.some((l) => {
        return right.some((r) => {
          return l + r === ans;
        });
      });
    })
    .map((word) => {
      return [word, word.slice(0, leftLength), word.slice(leftLength)];
    });
};

