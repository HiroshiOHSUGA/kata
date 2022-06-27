import { getBloomFilter } from "./bloom-filter.ts";
import { getDictionary } from "./simple-dictionary.ts";
import { getRandomWord } from "./libs.ts";
import { getWordsFromTextbook } from "./get-word-from-textbook.ts";

const RANDOM_WORD_AMOUNT = 10000;
const HASH_COUNT = 6;
const BITMAP_SCALE = 10;

const checkSpell = await getBloomFilter({
  bitmapScale: BITMAP_SCALE,
  hashCount: HASH_COUNT,
});
const lookUp = await getDictionary();

let missCountRandom = 0;
for (var i = 0; i < RANDOM_WORD_AMOUNT; i++) {
  const word = getRandomWord(5, true);
  const spell = checkSpell(word);
  const found = lookUp(word);

  console.log(`Random:\t${word}\tspel:${spell}\tfound:${found}`);
  if (spell !== found) {
    missCountRandom++;
  }
}

let missCountTextbook = 0;
const textbookWords = await getWordsFromTextbook();
for (var i = 0; i < textbookWords.length; i++) {
  const word = textbookWords[i];
  const spell = checkSpell(word);
  const found = lookUp(word);

  console.log(`Text:\t${word}\tspel:${spell}\tfound:${found}`);
  if (spell !== found) {
    missCountTextbook++;
  }
}

console.log(`BitmapScale: ${BITMAP_SCALE}`);
console.log(`HashCount: ${HASH_COUNT}`);
console.log(
  `Miss rate Rand: ${String((missCountRandom / RANDOM_WORD_AMOUNT) * 100).slice(
    0,
    3
  )}%`
);

console.log(
  `Miss rate Text: ${String(
    (missCountTextbook / textbookWords.length) * 100
  ).slice(0, 3)}%`
);
