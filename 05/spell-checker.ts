import { getBloomFilter } from "./bloom-filter.ts";
import { getDictionary } from "./simple-dictionary.ts";
import { getRandomWord } from "./libs.ts";

const checkSpell = await getBloomFilter();
const lookUp = await getDictionary();

for (var i = 0; i < 10000; i++) {
  const word = getRandomWord(5, true);
  const spell = checkSpell(word);
  const found = lookUp(word);

  console.log(`${word}\tspel:${spell}\tfound:${found}`);
}
