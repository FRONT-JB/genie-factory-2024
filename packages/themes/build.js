import run from "@genie/esbuild-config";
import pkg from "./package.json" assert { type: "json" };

run({
  pkg,
});
