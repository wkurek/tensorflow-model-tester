# Tensorflow model tester
Program which generates HTML report from the process of testing Tensorflow frozen model with images. Test images are specified by passing directory as a launching argument.

![Adnotacja 2019-06-16 110522](https://user-images.githubusercontent.com/22559135/59562010-54107600-9027-11e9-958f-bd227d930e81.png)

## Building
Program requires Node.js (v10.15.1) and NPM (6.8.0) to run.
```sh
$ npm install
```

## Execution
Program allows to specyfiy optional launching arguments:
  - `graph` Path of model to be tested.
  - `labels` Path of model's lables to be tested.
  - `images` Directory containing images to be tested.
  - `output_dir` Output directory for testing report.
  - `help`
  
```sh
$ node ./index.js --output_dir=./reports
```