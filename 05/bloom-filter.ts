import { Md5 } from "https://deno.land/std@0.140.0/hash/md5.ts";
const HASH_COUNT = 3;
const BITMAP_SCALE = 10;

const text = (await Deno.readTextFile("./wordlist.txt")).split("\n");
const BITMAP_SIZE = text.length * BITMAP_SCALE


function hash(text: string): string {
  const md5 = new Md5();
  const hash = md5.update(text).toString();
  return hash;
}

function slice(text: string, chunk: number): string[] {
  const result = [];
  const unit = Math.ceil(text.length / chunk);
  let currentStartIndex = unit * 0;
  while (text.length > currentStartIndex) {
    result.push(text.slice(currentStartIndex, currentStartIndex + unit));
    currentStartIndex += unit;
  }

  return result;
}

function toInt(text: string): number {
  return parseInt(text, 16);
}
function mod(num: number): number {
  return num % BITMAP_SIZE;
}
console.log(
  text.reduce((result, line) => {
      const indexList = slice(hash(line), HASH_COUNT).map(toInt).map(mod);
      indexList.forEach(index => {
          result[index] = true;
      });
      return result;
  }, new Array(BITMAP_SIZE))
);
