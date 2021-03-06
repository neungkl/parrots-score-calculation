var eachCaseToken = /^(\[uses \d+ parrots\]|\-|T|X|x)/;
var eachCaseToken2 = /^(\d+pr \||\-|T|X|x)/;

var expectScore = [
  [80],
  [400, 800, 750, 550],
  [550, 750, 800, 400],
  [1000, 1550, 1500, 800, 1600, 400],
  [800, 1600, 3200, 3000, 2500, 3150, 1650]
];

var parseScoreInEachSubTask = function(str, patternType) {

  var score = [];
  var token = (patternType == 1 ? eachCaseToken : eachCaseToken2);

  while (true) {

    match = token.exec(str);
    if (match == null) break;
    match = match[0];
    str = str.replace(token, '');

    if (/(\-|T|X|x)/.test(match)) {
      score.push(match);
    } else {
      match = /\d+/.exec(match)[0];
      score.push(parseInt(match));
    }
  }

  return score;
}

var extractInfomation = function(str) {

  str = str.trim();

  if (str.length == 0) {
    return {
      pass: false,
      msg: 'Please enter the score'
    };
  }

  var pattern = /^\s*(\[\s*(\[uses \d+ parrots\]|\-|T|X|x)(\[(\[uses +\d+ parrots\]|\-|T|X|x)+\])+\s*\])\s*$/;
  var pattern2 = /^\s*(\[\s*(\d+pr \||\-|T|X|x)(\[(\d+pr \||\-|T|X|x)+\])+\s*\])\s*$/;

  var correctFormat = true;
  var result = [];
  var patternType = 1;

  if(pattern.exec(str) == null && pattern2.exec(str) == null) {
    str = '[' + str + ']';
    if (pattern.exec(str) == null && pattern2.exec(str) == null) correctFormat = false;
  }

  if (correctFormat) {

    if(pattern.exec(str) == null) patternType = 2;

    str = str.trim();
    str = str.substring(1, str.length - 1).trim();

    var token;

    if(patternType == 1) {
      match = eachCaseToken.exec(str.trim())[0];
    } else {
      match = eachCaseToken2.exec(str.trim())[0];
    }

    result[0] = parseScoreInEachSubTask(match, patternType);

    for (var i = 1; i < 5; i++) {
      if(patternType == 1) {
        token = /\[(\[uses \d+ parrots\]|\-|T|X|x)+\]/;
      } else {
        token = /\[(\d+pr \||\-|T|X|x)+\]/;
      }
      subtask = token.exec(str)[0];
      str = str.replace(token, '');

      subtask = subtask.substring(1, subtask.length - 1);

      result[i] = parseScoreInEachSubTask(subtask, patternType);

    }

    return {
      pass: true,
      data: result
    }
  } else {
    return {
      pass: false,
      msg: 'Incorrect Format'
    }
  }
};

var ratioToColor = function(ratio) {
  if (ratio < 3) return 'purple';
  if (ratio < 5) return 'cyan'
  if (ratio < 7) return 'green';
  if (ratio < 10) return 'yellow';
  return 'orange';
}

var dataToTable = function(data) {

  var txt = '<table>';
  var sum = 0;
  var expectSum = 0;

  var pass = 5;
  var C = data[data.length - 1].length;;

  txt += '<thead><tr>';
  txt += '<th width="200"></th>';
  for (var i = 1; i <= C; i++) {
    txt += '<th>' + i + '</th>';
  }
  txt += '</tr></thead>';

  txt += '<tbody>';
  for (var i = 0; i < data.length; i++) {
    txt += '<tr>';
    txt += '<td>Subtask ' + (i + 1) + '</td>';
    for (var j = 0; j < C; j++) {
      txt += '<td>';

      if (j >= data[i].length) {
        txt += '</td>';
        continue;
      }

      if (typeof data[i][j] === 'number') {

        var ratio = data[i][j] / expectScore[i][j];
        var color = ratioToColor(ratio);

        txt += '<div class="' + color + '-box result-box">'
        txt += '<div>' + data[i][j] + ' / ' + expectScore[i][j] + '</div>';
        txt += '<div>' + Math.round(data[i][j] / expectScore[i][j] * 100) / 100 + '</div>';
        txt += '</div>';
        sum += data[i][j];
        } else {
          if(pass === 5) pass = i;
        txt += '<div class="red-box error-case-box result-box">' + data[i][j] + '</div>';
      }

      txt += '</td>';
      expectSum += expectScore[i][j];
    }
    txt += '</tr>';
  }
  txt += '</tbody>'

  txt += '</table>';

  return {
    pass: pass,
    html: txt,
    sum: sum,
    expectSum: expectSum
  };
}

if(typeof module !== "undefined") {
  module.exports = {
    extractInfomation: extractInfomation,
    expectScore: expectScore
  };
}
