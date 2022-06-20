import { Md5 } from "https://deno.land/std@0.140.0/hash/md5.ts";
export function hash(text: string): string {
  const md5 = new Md5();
  const hash = md5.update(text).toString();
  return hash;
}

export function slice(text: string, chunk: number): string[] {
  const result = [];
  const unit = Math.ceil(text.length / chunk);
  let currentStartIndex = unit * 0;
  while (text.length > currentStartIndex) {
    result.push(text.slice(currentStartIndex, currentStartIndex + unit));
    currentStartIndex += unit;
  }

  return result;
}

export function toInt(text: string): number {
  return parseInt(text, 16);
}

export function mod(size: number): (num: number) => number {
  return (num: number): number => {
    return num % size;
  };
}

const ALPHABETS =
  "abcdefghijklmnopqrstuvwwxyz" + "abcdefghijklmnopqrstuvwwxyz".toUpperCase();
const getRandomAlphabet = (): string => {
  const index = Math.floor(ALPHABETS.length * Math.random());
  return ALPHABETS.charAt(index);
};

export const getRandomWord = (
  maxChar: number = 5,
  exact: boolean = false
): string => {
  return new Array(exact ? maxChar : Math.ceil(maxChar * Math.random()))
    .fill(0)
    .map(getRandomAlphabet)
    .join("");
};
