import { readLine } from "./readLine.ts";
import { hash, slice, toInt, mod } from "./libs.ts";

const HASH_COUNT = 3;
const BITMAP_SCALE = 10;

const reader = await readLine("./wordlist.txt");
const indexList: number[][] = [];
for await (let line of reader) {
  const h = hash(line);
  const separated = slice(h, HASH_COUNT);
  indexList.push(separated.map(toInt));
}

const BITMAP_SIZE = indexList.length * BITMAP_SCALE;

const bloomMap = indexList.reduce((result, indexes) => {
  indexes.forEach((index) => {
    result[mod(result.length)(index)] = true;
  });
  return result;
}, new Array(BITMAP_SIZE));
console.log({
  words: indexList.length,
  hashPerWord: HASH_COUNT,
  BITMAP_SCALE,
  BITMAP_SIZE,
  usedBit: bloomMap.filter(() => true).length,
});
