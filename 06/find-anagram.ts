import { getWordsFromTextbook } from "./get-word-from-textbook.ts";

const getHash = (word: string): string => {
  //const chars = word.toLocaleLowerCase().replace("'", "").split("");
  //const chars = word.replace("'", "").split("");
  const chars = word.split("");
  chars.sort();

  return chars.join("");
};

const results: Record<string, string[]> = {};
const textbookWords = await getWordsFromTextbook();
for (let i = 0; i < textbookWords.length; i++) {
  const word = textbookWords[i];
  const hash = getHash(word);
  results[hash] = [...(results[hash] ?? []), word];
}
const validKeys = Object.keys(results).filter((key) => results[key].length > 1);

const longestKey: string = validKeys.reduce((result, key) => {
  return result.length > key.length ? result : key;
}, validKeys[0]);

const mostContainingKey: string = validKeys.reduce((result, key) => {
  return results[result].length > results[key].length ? result : key;
}, validKeys[0]);

validKeys.forEach((key) => console.log(`${key} => ${results[key].join(" ")}`));
console.log("--------");
console.log(`Find ${validKeys.length} anagrams`);
console.log(`Longest => ${results[longestKey].join(" ")}`);
console.log(`Containing => ${results[mostContainingKey].join(" ")}`);
