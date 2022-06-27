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
    if (Math.random() < 0.0001) {
      indexList.push(line);
    }
  }

  return indexList;
};
