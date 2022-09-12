export type WordDB = Record<number, string[]>;
export type AnswerPair = [string, string, string];

export type Printer = (answer: string, left: string, right: string) => void;
export type DBLoader = (
  textPath: string,
  targetLength: number
) => Promise<WordDB>;
export type PairFinder = (db: WordDB, targetLength: number) => AnswerPair[];
