var eachCaseToken = /^(\[uses \d+ parrots\]|\-|T|X)/;

var expectScore = [
  [80],
  [400, 800, 750, 550],
  [550, 750, 800, 400],
  [1000, 1550, 1500, 800, 1600, 400],
  [800, 1600, 3200, 3200, 2500, 3150, 1650]
];

var parseScoreInEachSubTask = function(str) {

  var score = [];

  var t = 0;

  while (true) {
    match = eachCaseToken.exec(str);
    if (t++ > 10) break;
    if (match == null) break;
    match = match[0];
    str = str.replace(eachCaseToken, '');

    if (/(\-|T|X)/.test(match)) {
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

  var pattern = /^\s*(\[\s*(\[uses \d+ parrots\]|\-|T|X)(\[(\[uses +\d+ parrots\]|\-|T|X)+\])+\s*\])\s*$/;

  var correctFormat = true;
  var result = [];

  if (pattern.exec(str) == null) {
    str = '[' + str + ']';
    if (pattern.exec(str) == null) correctFormat = false;
  }

  if (correctFormat) {

    str = str.trim();
    str = str.substring(1, str.length - 1).trim();

    var token;

    match = eachCaseToken.exec(str.trim())[0];
    result[0] = parseScoreInEachSubTask(match);

    for (var i = 1; i < 5; i++) {
      token = /\[(\[uses \d+ parrots\]|\-|T|X)+\]/;
      subtask = token.exec(str)[0];
      str = str.replace(token, '');

      subtask = subtask.substring(1, subtask.length - 1);

      result[i] = parseScoreInEachSubTask(subtask);

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
  if (ratio < 4) return 'green-black'
  if (ratio < 5) return 'green';
  if (ratio < 10) return 'yellow';
  return 'red';
}

var dataToTable = function(data) {

  var txt = '<table>';
  var sum = 0;
  var expectSum = 0;

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

        txt += '<div class="' + color + '-box" style="width:110px;">'
        txt += '<div>' + data[i][j] + ' / ' + expectScore[i][j] + '</div>';
        txt += '<div>' + Math.floor(data[i][j] / expectScore[i][j] * 100) / 100 + '</div>';
        txt += '</div>';
        sum += data[i][j];
      } else {
        txt += '<div class="red-box">' + data[i][j] + '</div>';
      }

      txt += '</td>';
      expectSum += expectScore[i][j];
    }
    txt += '</tr>';
  }
  txt += '</tbody>'

  txt += '</table>';
  return {
    html: txt,
    sum: sum,
    expectSum: expectSum
  };
}

module.exports = {
  extractInfomation: extractInfomation
};
