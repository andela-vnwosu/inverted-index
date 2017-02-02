(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "The cyprus love affair",
    "text": "A book by Dennis Robins. I lay my love beneath your feet, thread softly, because you thread upon my dreams"
  },

  {
    "title": "the runaway jury",
    "text": "This is a fictional book by John Grisham, an award winning novelist"
  },

  {
    "title" : "the pelican brief",
    "text" : "this is also a book by John Grisham, talking about the law and law practice. He hardly writes about love and dreams and emotions."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]
},{}],3:[function(require,module,exports){
module.exports={}
},{}],4:[function(require,module,exports){
module.exports='I AM A GIRL, BAYO IS A BOY'
},{}],5:[function(require,module,exports){
/**
 * Created by chiamakanwosu on 06/01/2017.
 */
const books = require('../books.json');
const book2 = require('../book2.json');
const emptyBook = require('../emptyBook.json');
const invalidBook = require('../invalidBook.json');
(() => {
  describe('invertedIndex', ()=> {
    const index = new InvertedIndex();
    const emptyJson = [];
    const invalidString = 'I am a girl';
    describe('Read book data', ()=> {
      it('should read the JSON file and assert that it is not empty', () => {
        expect(index.isValidJson(emptyJson)).toBe(false);
      });
      
      it('Ensures the file content is actually a valid JSON Array', ()=>{
        expect(index.isValidJson(invalidString)).toBe(false);
      })
      
    });
    describe('Populate Index', () => {
      index.createIndex('book.json', books);
      it('should verify that the index is created', () => {
        expect(index.indices.length).toBeGreaterThan(0);
      });
      it('should verify the index maps the string keys to the correct' +
        ' objects in the JSON array', () => {
        index.searchIndex('Alice, elf');
        expect(index.temp_search).toEqual([0, 1]);
      });
      it('Should verify that multiple index could be built', () => {
        index.createIndex('book2.json', book2);
        expect(index.indices.length).toEqual(2);
      });
    });
    describe('Search index', () => {
      it('should ensure search does not take too long to execute', () => {
        const runtimeThreshold = 1000;
        const currentMillisecond =  new Date().getMilliseconds();
        index.searchIndex('Alice', ['Fellowship', ['dwarf'], 'in']);
        const finalMilliseconds =  new Date().getMilliseconds();
        const timeDifference = finalMilliseconds - currentMillisecond;
        expect(timeDifference).toBeLessThan(runtimeThreshold);
      });

      it('should ensure searchIndex can handle an array of search terms', () => {
        const searchTerms = ['Alice', 'ring'];
        index.searchIndex(searchTerms);
        expect(index.temp_search).toEqual([0, 1]);
      });

      it('should be able to search a specific index', () => {
        index.searchIndex('pelican', 1);
        expect(index.temp_search).toEqual([2]);
      });
    });
  });
})();

},{"../book2.json":1,"../books.json":2,"../emptyBook.json":3,"../invalidBook.json":4}]},{},[5]);
