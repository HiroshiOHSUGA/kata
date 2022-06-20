import { readLine } from "./readLine.ts";
import { hash, slice, toInt, mod } from "./libs.ts";

const HASH_COUNT = 3;
const BITMAP_SCALE = 10;
const wordToHash = (word: string, hashCount: number): number[] => {
  const h = hash(word.trim());
  const separated = slice(h, hashCount);
  const hashes = separated.map(toInt);
  // console.log(`${word}\t${hashes.join()}`);
  return hashes;
};
export const getBloomFilter = async (
  options: Partial<{
    hashCount: number;
    bitmapScale: number;
    textBookPath: string;
  }> = {}
) => {
  const {
    hashCount = HASH_COUNT,
    bitmapScale = BITMAP_SCALE,
    textBookPath = "./wordlist.txt",
  } = options;
  const reader = await readLine(textBookPath);
  const indexList: number[][] = [];
  for await (let line of reader) {
    indexList.push(wordToHash(line, hashCount));
  }

  const bitmapSize = indexList.length * bitmapScale;
  const roundIndex = (index: number): number => mod(bitmapSize)(index);

  const bloomMap = indexList.reduce((result, indexes) => {
    indexes.forEach((index) => {
      result[roundIndex(index)] = true;
    });
    return result;
  }, new Array(bitmapSize));
  //console.log({
  //  words: indexList.length,
  //  hashPerWord: hashCount,
  //  bitmapScale,
  //  bitmapSize,
  //  usedBit: bloomMap.filter(() => true).length,
  //});
  return (word: string): boolean => {
    return wordToHash(word, hashCount).every(
      (h) => bloomMap[roundIndex(h)] === true
    );
  };
};
