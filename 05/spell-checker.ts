import { getBloomFilter } from "./bloom-filter.ts";
import { getRandomWord } from "./libs.ts";

const checkSpell = await getBloomFilter();

let found: number = 0;
for (var i = 0; i < 10000; i++) {
  const word = getRandomWord(5, true);
  const exists = checkSpell(word);
  if (exists) {
    found++;
    console.log(`${word}`);
  }
}
console.log({ found });

const testWords = ["aahing", "Zortman"];
console.log(testWords);
console.log(testWords.filter(checkSpell));
