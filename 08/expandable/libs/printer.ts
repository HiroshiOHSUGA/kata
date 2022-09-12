import type { Printer } from "../types.d.ts";
const print: Printer = (answer, left, right) => {
  console.log([left, "+", right, "=", answer].join(" "));
};

export default print;
