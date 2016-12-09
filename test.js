var chai = require('chai');
var app = require('./index.js');

describe('Test Parser', function() {

  var sample = [
    '[ [uses 40 parrots][[uses 10 parrots][uses 20 parrots][uses 30 parrots][uses 40 parrots]][[uses 100 parrots][uses 200 parrots][uses 300 parrots][uses 400 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots][uses 7000 parrots]] ] ',
    '[ -[[uses 10 parrots][uses 20 parrots][uses 30 parrots][uses 40 parrots]][[uses 100 parrots][uses 200 parrots][uses 300 parrots][uses 400 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots]][[uses 1000 parrots][uses 2000 parrots][uses 3000 parrots][uses 4000 parrots][uses 5000 parrots][uses 6000 parrots][uses 7000 parrots]] ] ',
    '[ -[-X-T][TTX-][--XXTT][--XXTXX] ] ',
    ' -[-X-T][TTX-][--XXTT][--XXTXX] ',
    ' -[-x-T][TTx-][--xxTT][--xxTxx] ',
    ' [uses 222 parrots][-X-T][T[uses 123 parrots]X-][--XXTT][--[uses 10 parrots]XTX[uses 20 parrots]] '
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
