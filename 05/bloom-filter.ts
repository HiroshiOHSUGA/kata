import { readLine } from "./readLine.ts";
import { hash, slice, toInt, mod } from "./libs.ts";

const HASH_COUNT = 3;
const BITMAP_SCALE = 10;

export const getBloomFilter = async (
  hashCount: number = HASH_COUNT,
  bitmapScale: number = BITMAP_SCALE,
  textBookPath: string = "./wordlist.txt"
) => {
  const reader = await readLine(textBookPath);
  const indexList: number[][] = [];
  for await (let line of reader) {
    const h = hash(line);
    const separated = slice(h, hashCount);
    indexList.push(separated.map(toInt));
  }

  const bitmapSize = indexList.length * bitmapScale;

  const bloomMap = indexList.reduce((result, indexes) => {
    indexes.forEach((index) => {
      result[mod(result.length)(index)] = true;
    });
    return result;
  }, new Array(bitmapSize));
  console.log({
    words: indexList.length,
    hashPerWord: hashCount,
    bitmapScale,
    bitmapSize,
    usedBit: bloomMap.filter(() => true).length,
  });
  return (word: string): boolean => {
    const hashes = slice(hash(word), hashCount).map(toInt);
    return hashes.every((h) => bloomMap[h] === true);
  };
};
