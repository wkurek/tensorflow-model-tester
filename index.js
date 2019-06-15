const yargs = require("yargs");
const { test } = require("./src/tester");

const argv = yargs
  .option("graph", {
    alias: "g",
    default: "/mnt/d/FlagaNarodowa/workspace/output_graph.pb",
    describe: "Path of model to be tested.",
    type: "string"
  })
  .option("labels", {
    alias: "l",
    default: "/mnt/d/FlagaNarodowa/workspace/output_labels.txt",
    describe: "Path of model's lables to be tested.",
    type: "string"
  })
  .option("images", {
    alias: "i",
    default: "/mnt/d/FlagaNarodowa/test",
    describe: "Directory containing images to be tested.",
    type: "string"
  })
  .option("output_dir", {
    alias: "o",
    default: "/mnt/d/FlagaNarodowa/workspace",
    describe: "Output directory for testing report.",
    type: "string"
  })
  .help()
  .alias("help", "h").argv;

test(argv.graph, argv.labels, argv.images, argv.output_dir);
