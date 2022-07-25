import { readLine } from "./readLine.ts";

export const getWordsFromTextbook = async (
  options: Partial<{
    textBookPath: string;
  }> = {}
) => {
  const { textBookPath = "./wordlist.txt" } = options;
  const reader = await readLine(textBookPath);
  const indexList: string[] = [];
  for await (let line of reader) {
    indexList.push(line);
  }

  return indexList;
};
