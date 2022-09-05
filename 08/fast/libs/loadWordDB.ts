import { WordDB } from "../types.d.ts";
import { loadTextbook } from "../../libs/textbook/loadTextbook.ts";
export async function loadWordDB(
  path: string,
  targetWordLength: number
): Promise<WordDB> {
  const textbookWords = await loadTextbook({ textbookPath: path });
  return textbookWords
    .filter((word) => word.length <= targetWordLength)
    .reduce((result, word) => {
      const length = word.length;

      return {
        ...result,
        [length]: [...(result[length] ?? []), word],
      };
    }, {} as WordDB);
}
