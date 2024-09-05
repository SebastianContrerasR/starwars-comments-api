const common = ["--require-module ts-node/register"];

const app = [
  ...common,
  "test/features/**/*.feature",
  "--require test/features/steps/*.steps.ts",
].join(" ");

module.exports = {
  default: app,
};
