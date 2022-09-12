import { WordDB, DBLoader } from "../types.d.ts";
import { loadTextbook } from "../../libs/textbook/loadTextbook.ts";
const loadWordDB: DBLoader = async (path, targetWordLength) => {
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
};

export default loadWordDB;
