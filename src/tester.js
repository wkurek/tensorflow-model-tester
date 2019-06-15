const fs = require("fs");
const path = require("path");

function test(graphPath, labelsPath, imagesDir, outputDir) {
  fs.readdir(imagesDir, function(err, files) {
    if (err) {
      throw err;
    }

    files.forEach(function(filename) {
      console.log(filename);
    });
  });
}

exports.test = test;
