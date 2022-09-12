export type WordDB = Record<number, string[]>;
export type AnswerPair = [string, string, string];
export type FindAnswers = (db: WordDB, targetLength: number) => AnswerPair[];
export type Printer = (answer: string, left: string, right: string) => void;
