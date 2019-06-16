const fs = require("fs");
const { join } = require("path");
const { renderFile } = require("ejs");
const { execSync } = require("child_process");

function testModel(graphPath, labelsPath, imagesDir, outputDir) {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      throw err;
    }

    const data = { date: new Date(), images: [] };

    files.forEach(filename => {
      const imagePath = join(imagesDir, filename);
      const timestamp = new Date().getTime();

      const stdout = executeLabelImage(graphPath, labelsPath, imagePath);

      const executionTime = (new Date().getTime() - timestamp) / 1000;
      const classProbabilities = getClassProbabilities(stdout);

      const image = {
        classProbabilities: classProbabilities,
        path: transformPathToWin(imagePath),
        filename: filename,
        time: executionTime
      };

      data.images.push(image);
    });

    generateReport(data, outputDir);
  });
}

function executeLabelImage(graphPath, labelsPath, imagePath) {
  const stdout = execSync(
    `python /mnt/d/FlagaNarodowa/workspace/label_image.py --graph=${graphPath} --labels=${labelsPath} --input_layer=Mul --output_layer=final_result --image=${imagePath}`,
    { encoding: "utf8" }
  );

  return stdout;
}

function getClassProbabilities(output) {
  output = output.slice(0, -2);
  const classesProbabilities = output.split("\n");

  const classProbabilities = [];

  classesProbabilities.forEach(classProbability => {
    const className = extractClassName(classProbability);
    const probability = extractProbability(classProbability);

    classProbabilities.push({ className: className, probability: probability });
  });

  return classProbabilities;
}

function extractClassName(classProbability) {
  const classNameRegex = /[a-z ]*[a-z]/;

  let className = classProbability.match(classNameRegex);
  className = className[0].replace(" ", "-");

  return className;
}

function extractProbability(classProbability) {
  const probabilityRegex = /\d*\.\d*/;

  let probability = classProbability.match(probabilityRegex);
  probability = probability[0];

  return probability * 100;
}

function transformPathToWin(path) {
  const mnt = path.slice(0, 7);
  const discLetter = mnt.charAt(5).toUpperCase();

  let dirPath = path.slice(7);
  dirPath = dirPath.replace("/", "\\");

  const winPath = `${discLetter}:\\${dirPath}`;
  return winPath;
}

function generateReportPath(outputDir) {
  const date = new Date();
  const datePrefix = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const filename = `${datePrefix}-model-test-report.html`;

  return join(outputDir, filename);
}

function writeReportFile(data, path) {
  fs.writeFile(path, data, { encoding: "utf8" }, err => {
    if (err) throw err;
    console.log(`Successfully generated model test report:\t${path}`);
  });
}

function generateReport(data, outputDir) {
  const viewpath = "./views/report.ejs";

  renderFile(viewpath, data, {}, (err, str) => {
    if (err) throw err;

    const reportPath = generateReportPath(outputDir);
    writeReportFile(str, reportPath);
  });
}

exports.testModel = testModel;
