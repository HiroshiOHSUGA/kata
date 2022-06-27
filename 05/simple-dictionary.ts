import { readLine } from "./readLine.ts";

export const getDictionary = async (
  options: Partial<{
    textBookPath: string;
  }> = {}
) => {
  const { textBookPath = "./wordlist.txt" } = options;
  const reader = await readLine(textBookPath);
  const indexList: Record<string, boolean | undefined> = {};
  for await (let line of reader) {
    indexList[line] = true;
  }

  return (word: string): boolean => {
    return indexList[word] === true;
  };
};
