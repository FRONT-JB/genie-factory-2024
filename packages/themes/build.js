import esbuild from "esbuild";
import pkg from "./package.json" assert { type: "json" };

const isDevelopment = process.argv.includes("--dev");

const minify = !isDevelopment;

const isWatch = process.argv.includes("--watch");

const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify,
  sourcemap: true,
  outdir: "dist",
  watch: isWatch,
  external,
};

Promise.all([
  esbuild.build({
    ...baseConfig,
    format: "esm",
    target: "es2019",
  }),

  esbuild.build({
    ...baseConfig,
    format: "cjs",
    outExtension: {
      ".js": ".cjs",
    },
  }),
]).catch(() => {
  console.error("Build Failed");
  process.exit(1);
});
