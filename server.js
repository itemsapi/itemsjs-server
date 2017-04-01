var express = require('express')
var app = express()

var itemsjs;

const request = require('request');
const data_url = process.env.DATA_URL || 'https://raw.githubusercontent.com/itemsapi/itemsapi-example-data/master/items/movies-processed.json';
var PORT = process.env.PORT || 3000;

console.log('Importing JSON data..');
request(data_url, {json: true}, (err, res) => {
  console.log('Imported data.');
  itemsjs = require('itemsjs')(res.body);
})

app.get('/search', function (req, res) {
  let filters = req.query.filters ? JSON.parse(req.query.filters) : undefined;

  var result = itemsjs.search({
    per_page: req.query.per_page || 10,
    page: req.query.page || 1,
    filters: filters
  });
  res.json(result);
})

app.listen(PORT, function () {
  console.log('Example app listening on port %s!', PORT);
})
