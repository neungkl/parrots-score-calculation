var fs = require('fs');
var request = require('request');
var asyncs = require('async')
var cheerio = require('cheerio');

var privateDataPath = __dirname + '/private.json';

var baseURL = 'https://www.nattee.net/grader/';
var submittionURL = baseURL + 'submissions/';
var loginURL = baseURL + 'login/login';

var jar = request.jar();

var loginInfo = {
  user: process.argv[2],
  pass: process.argv[3],
  token: ''
};

var config = {};
var res;

var oldData = [];
var dataCollect = [];

if (!fs.existsSync(privateDataPath)) {
  console.log('Error : You should not initialize private.json before using fetcher.');
  process.exit(1);
} else {
  var content = fs.readFileSync(privateDataPath, 'utf8');
  content = JSON.parse(content);
  oldData = content.data || [];
  config.startSubmission = content.startSubmission;
  config.currentSubmission = (content.currentSubmission == -1 ? config.startSubmission : content.currentSubmission);
}

asyncs.series([
  function(done) {

    request({
      url: baseURL,
      jar: jar
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        loginInfo.token = (cheerio.load(body))('form input[name="authenticity_token"]').val();
        return done();
      } else {
        return done('Error with fetching login page.');
      }
    });
  },
  function(done) {
    request.post({
      url: loginURL,
      form: {
        login: loginInfo.user,
        password: loginInfo.pass,
        authenticity_token: loginInfo.token
      },
      jar: jar
    }, function(error, response, body) {
      if (!error && response.statusCode === 302) {
        done();
      } else {
        done('Errror with login authentication');
      }
    });
  },
  function(done) {
    var curID = parseInt(config.currentSubmission) - 1;
    var isFinish = false;

    console.log("Start from : " + config.currentSubmission);

    asyncs.whilst(
      function() {
        return !isFinish;
      },
      function(fetchDone) {

        curID++;

        console.log('Fetching : ' + curID);

        request({
            url: submittionURL + curID,
            jar: jar
          },
          function(error, response, body) {
            if (!error) {

              var $ = cheerio.load(body);

              if($('.table').length === 0) {
                config.currentSubmission = curID;
                if(body.indexOf("Stay calm, keep coding") !== -1) {
                  fetchDone('User and Password is incorrect.');
                  done('Error !!');
                } else {
                  fetchDone('No data in submittion : ' + curID);
                  done();
                }
                return ;
              }

              if ($('.dialog').length !== 0) {
                isFinish = true;
              } else {
                var data = {
                  author: $('.table tr').eq(0).find('td').eq(1).text().replace(/(\n| )/g, ' ').trim(),
                  anthor_url: baseURL + $('.table tr').eq(0).find('td a').attr('href').substring(8),
                  submittion_url: submittionURL + curID,
                  project: $('.table tr').eq(1).find('td a').text(),
                  score: $('.table tr').eq(7).find('td').eq(1).text()
                };
                dataCollect.push(data);
              }

              return fetchDone();
            } else {
              return fetchDone('Error fetching submittion : ' + curID);
            }
          }
        );
      },
      function(err) {
        if(err) console.log(err);
      }
    );

  },
  function(done) {

    var dataToWrite = {
      startSubmission: config.startSubmission,
      currentSubmission: config.currentSubmission,
      timestamp: Date.now(),
      data: oldData.concat(dataCollect)
    };

    fs.writeFileSync(privateDataPath, JSON.stringify(dataToWrite, null, '  '));

    console.log('DONE !!');

    done();
  }
], function(err) {
  if(err) console.log(err);
});
