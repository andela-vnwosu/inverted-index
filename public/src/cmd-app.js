const InvertedIndex = require ('./inverted-index.js');
const invertedIndexApp = new InvertedIndex();

invertedIndexApp.resolveSearchTerms(['jane', ['ifeoma', 'chioma',['lynda', ['precious', ['obiangelli']]]]]);
console.log(invertedIndexApp.searchTerms);