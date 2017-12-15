var fs = require('fs');
var ejs = require('ejs');


exports.TranslationMain_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/TranslationMain_OneItem.ejs', "utf8"));
exports.TranslationMainA_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/TranslationMainA_OneItem.ejs', "utf8"));

exports.TranslationList_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/TranslationList_OneItem.ejs', "utf8"));
