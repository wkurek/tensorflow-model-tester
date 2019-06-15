const fs = require("fs");
const { renderFile } = require("ejs");
const { exec } = require("child_process");

function test(graphPath, labelsPath, imagesDir, outputDir) {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      throw err;
    }

    const options = { date: new Date(), images: [] };

    files.forEach(filename => {
      options.images.push({ path: filename });
    });

    renderFile("./views/report.ejs", options).then((err, str) => {
      if (!err) console.log(str);
    });
  });
}

exports.test = test;
