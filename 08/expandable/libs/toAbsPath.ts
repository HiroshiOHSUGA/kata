import * as path from "https://deno.land/std@0.152.0/path/mod.ts";

export function toAbsPath(relPath: string, base: string = Deno.cwd()): string {
  return path.normalize(path.join(base, relPath));
}
