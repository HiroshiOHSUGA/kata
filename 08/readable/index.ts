import { loadTextbook } from "../libs/textbook/loadTextbook.ts";
const TEXTBOOK_PATH = "./data/wordlist.txt";
const textbookWords = await loadTextbook({ textbookPath: TEXTBOOK_PATH });

console.log(textbookWords);
