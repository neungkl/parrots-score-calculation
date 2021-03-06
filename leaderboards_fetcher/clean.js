var fs = require('fs');

var privateDataPath = __dirname + '/private.json';
var publicDataPath = __dirname + '/public.json';
var app = require('../web/index.js');

var mapScore = {};
var INFINITY = 100;

fs.readFile(privateDataPath, 'utf8', function(err, content) {
  if(err) {
    console.log(err);
  } else {
    content = JSON.parse(content);
    data = content.data;

    for(var i=0; i<data.length; i++) {

      var eachData = data[i];

      if(eachData.project !== "[a59_proj]") continue;

      var userID = eachData.author.split(' ')[0];
      var score = app.extractInfomation(eachData.score);

      if(!score.pass) continue;

      score = score.data;

      var check = true;
      var sum = 0;
      var sumExpect = 0;

      for(var j=0; j<score.length; j++) {
        if(!check) break;
        for(var k=0; k<score[j].length; k++) {
          if(typeof score[j][k] !== 'number') {
            check = false;
            break;
          }

          sum += score[j][k];
          sumExpect += app.expectScore[j][k];
        }
      }

      var ratio = sum / sumExpect;

      if(check) {

        if(ratio <= 1) {
          console.log("There are submission ratio < 1 :", ratio);
          continue;
        }

        if(mapScore.hasOwnProperty(userID)) {
          if(ratio < mapScore[userID].score) {
            mapScore[userID] = {
              score: ratio,
              submission: eachData.submittion_url
            }
          }
        } else {
          mapScore[userID] = {
            score: ratio,
            submission: eachData.submittion_url
          }
        }
      } else {
        if(!mapScore.hasOwnProperty(userID)) {
          mapScore[userID] = {
            score: INFINITY
          };
        }
      }
    }

    var result = {
      timestamp: content.timestamp,
      score: []
    };

    // console.log(mapScore);

    for(var k in mapScore) {
      result.score.push(mapScore[k].score);
    }

    fs.writeFile(publicDataPath, JSON.stringify(result, null, '  '));
    console.log('DONE !!');
  }
});
