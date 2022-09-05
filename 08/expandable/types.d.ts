export type WordDB = Record<number, string[]>;
export type AnswerPair = [string, string, string];
export type FindAnswers = (db: WordDB, targetLength: number) => AnswerPair[];
