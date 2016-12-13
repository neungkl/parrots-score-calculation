var chai = require('chai');
var app = require('./web/index.js');

describe('Test Parser', function() {

  /*
  [ -[[uses 10000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots]][[uses 1000 parrots]X[uses 3000 parrots][uses 4000 parrots]][[uses 5000 parrots][uses 10000 parrots][uses 15000 parrots]T[uses 25000 parrots][uses 30000 parrots]][[uses 3456 parrots][uses 6666 parrots][uses 3000 parrots][uses 18000 parrots][uses 5000 parrots][uses 12000 parrots][uses 7000 parrots]] ]
  */

  var sample = [
    '[ [uses 40 parrots][[uses 10 parrots][uses 20 parrots][uses 30 parrots][uses 40 parrots]][[uses 100 parrots][uses 200 parrots][uses 300 parrots][uses 400 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots][uses 7000 parrots]] ] ',
    '[ -[[uses 10 parrots][uses 20 parrots][uses 30 parrots][uses 40 parrots]][[uses 100 parrots][uses 200 parrots][uses 300 parrots][uses 400 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots][uses 7000 parrots]] ] ',
    '[ -[-X-T][TTX-][--XXTT][--XXTXX] ] ',
    ' -[-X-T][TTX-][--XXTT][--XXTXX] ',
    ' -[-x-T][TTx-][--xxTT][--xxTxx] ',
    ' [uses 222 parrots][-X-T][T[uses 123 parrots]X-][--XXTT][--[uses 10 parrots]XTX[uses 20 parrots]] ',
    ' 80pr |[-6151pr |-4318pr |][4318pr |-6151pr |-][xxx6198pr |x-][6146pr |xxxxxx] ',
    ' [ 66pr |[535pr |1283pr |1180pr |778pr |][778pr |1180pr |1283pr |535pr |][1692pr |3221pr |3072pr |1231pr |3395pr |510pr |][1226pr |3391pr |11431pr |10069pr |7171pr |11074pr |3566pr |] ] '
  ];

  var result = [
    [
      [40],
      [10, 20, 30, 40],
      [100, 200, 300, 400],
      [1000, 2000, 3000, 4000, 5000, 6000],
      [1000, 2000, 3000, 4000, 5000, 6000, 7000]
    ],
    [
      ['-'],
      [10, 20, 30, 40],
      [100, 200, 300, 400],
      [1000, 2000, 3000, 4000, 5000, 6000],
      [1000, 2000, 3000, 4000, 5000, 6000, 7000]
    ],
    [
      ['-'],
      ['-', 'X', '-', 'T'],
      ['T', 'T', 'X', '-'],
      ['-', '-', 'X', 'X', 'T', 'T'],
      ['-', '-', 'X', 'X', 'T', 'X', 'X'],
    ],
    [
      ['-'],
      ['-', 'X', '-', 'T'],
      ['T', 'T', 'X', '-'],
      ['-', '-', 'X', 'X', 'T', 'T'],
      ['-', '-', 'X', 'X', 'T', 'X', 'X'],
    ],
    [
      ['-'],
      ['-', 'x', '-', 'T'],
      ['T', 'T', 'x', '-'],
      ['-', '-', 'x', 'x', 'T', 'T'],
      ['-', '-', 'x', 'x', 'T', 'x', 'x'],
    ],
    [
      [222],
      ['-', 'X', '-', 'T'],
      ['T', 123, 'X', '-'],
      ['-', '-', 'X', 'X', 'T', 'T'],
      ['-', '-', 10, 'X', 'T', 'X', 20],
    ],
    [
      [80],
      ['-', 6151, '-', 4318],
      [4318, '-', 6151, '-'],
      ['x', 'x', 'x', 6198, 'x', '-'],
      [6146, 'x', 'x', 'x', 'x', 'x', 'x']
    ],
    [
      [66],
      [535, 1283, 1180, 778],
      [778, 1180, 1283, 535],
      [1692, 3221, 3072, 1231, 3395, 510],
      [1226, 3391, 11431, 10069, 7171, 11074, 3566]
    ]
  ];

  for (var i = 0; i < sample.length; i++) {
    (function(j) {
      it('Test Case #' + (j + 1), function() {
        chai.expect({
          pass: true,
          data: result[j]
        }).to.deep.equal(app.extractInfomation(sample[j]));
      });
    })(i);
  }
});
