import type { Printer } from "../types.d.ts";
export const print: Printer = (answer, left, right) => {
  console.log([left, "+", right, "=", answer].join(" "));
};
