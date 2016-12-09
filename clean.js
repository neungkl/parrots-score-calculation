var fs = require('fs');

var privateDataPath = 'private.json';
var publicDataPath = 'public.json';
var app = require('./index.js');

var mapScore = {};

fs.readFile(privateDataPath, 'utf8', function(content) {
  console.log(content);
});
