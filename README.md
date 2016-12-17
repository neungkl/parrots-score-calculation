Parrots Score Calculation
===

[![Build Status](https://travis-ci.org/neungkl/parrots-score-calculation.svg?branch=master)](https://travis-ci.org/neungkl/parrots-score-calculation)

:rocket: This project associated with 2110327 Algorithm Design class.
Aiming of this project is convert the long text score result from grader into an easily visually version,
and leaderboards ranking system is also implemented by fetching plain HTML text from juding site
and extract information, then visualize to a graph.

:point_right: Try demo [https://neungkl.github.io/parrots-score-calculation/](https://neungkl.github.io/parrots-score-calculation/)

<img src=".github/preview.png" width="600">

## Introduction

Parrots is IOI 2011 task that use for final project of algorithm study class. The detail of the task is not implicate to this project.

But if you would like to read the task. You can read more detail here [https://github.com/neungkl/parrots-ioi-solution](https://github.com/neungkl/parrots-ioi-solution)<br>
or googling with "Parrots IOI" keywords.

You must write a C or C++ for solve the task and submitted to local judge website. (created by doctoral lecturer in my university)
Then, the website will grading your code and sent the result to you.

But the result is rather hard for examine. Here are an example of result.

```
[-[-X-T][TTX-][--XXTT][--XXTXX]]
```

Or maybe like,

```
[[uses 222 parrots][-X-T][T[uses 123 parrots]X-][--XXTT][--[uses 10 parrots]XTX[uses 20 parrots]]]
```

Or like,

```
[ [uses 40 parrots][[uses 10 parrots][uses 20 parrots][uses 30 parrots][uses 40 parrots]][[uses 100 parrots][uses 200 parrots][uses 300 parrots][uses 400 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots][uses 7000 parrots]] ]
```

Maybe like this,

```
[ 9pr |[530pr |1282pr |1180pr |778pr |][778pr |1180pr |1282pr |530pr |][1682pr |3221pr |3073pr |1230pr |3400pr |503pr |][1229pr |3388pr |11446pr |10066pr |7168pr |11074pr |3566pr |] ]
```

So, I end up with creating a website that analyze the score and visualize it for easily to read and good visual,
not hard for reading, and also some basic calculation stuff provided.

## Features

- Convert long pattern text to readable table

<img src=".github/preview.png" width="400">

- The size of original input data set provided
- Ratio calculation supported
- Reporting for scoring in each subtask
- Overall summarize of the scores
- Leaderboards provided

<img src=".github/leaderboards.png" width="600">

## Usage

### Run

Just clone this project and open `index.html`

### Testing

For testing my code. Run following command below ([Node.JS](https://nodejs.org/en/) require).

```
npm install
npm run-script test
```

### Leaderboards Fetching

For fetching the leaderboards. You must already have user and password for [https://www.nattee.net/grader/](https://www.nattee.net/grader/). The way I implemented is run the script for fetching every submission in judging website.

Then, convert the HTML plain text to a graph by extracting DOM elements.

**How to Use**

1. Configuration file `private.tmp.json` in `leaderboards_fecher` folder, where `startSubmission` is number to fetching the score.
2. Change `private.tmp.json` to `private.json`
3. Run `node fetch.js <USER> <PASSWORD>`. Replace `<USER>` and `<PASSWORD>` by your user and password.
3. Waiting for fetching. (there are several log shown in command)
4. After fetching complete. Run `node clean.js` for update the score.
5. Open `index.html`

## Author

* Kosate Limpongsa (Me)

## License

The MIT License (MIT)
Copyright (c) 2016 Kosate Limpongsa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
