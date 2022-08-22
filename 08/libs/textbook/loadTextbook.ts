import { readLine } from "./readLine.ts";

export const loadTextbook = async (
  options: Partial<{
    textbookPath: string;
  }> = {}
) => {
  const { textbookPath = "./wordlist.txt" } = options;
  const reader = await readLine(textbookPath);
  const indexList: string[] = [];
  for await (const line of reader) {
    indexList.push(line);
  }

  return indexList;
};
