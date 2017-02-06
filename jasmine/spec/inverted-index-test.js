/**
 * Created by chiamakanwosu on 06/01/2017.
 */
const books = require('../books.json');
const book2 = require('../book2.json');
const emptyBook = require('../emptyBook.json');
const invalidBook = require('../invalidBook.json');
(() => {
  describe('invertedIndex', () => {
    const index = new InvertedIndex();
    describe('Read book data', () => {
      it('should read the JSON file and assert that it is not empty', () => {
        expect(index.isValidJson(emptyJson)).toBe(false);
      });
      
      it('should assert that the JSON object is not empty, and contains title and text properties', () => {
        expect(index.isEmpty(invalidBook)).toBe(true);
      });
      
      it('Ensures the file content is actually a valid JSON', () => {
        expect(index.isValidJson(invalidString)).toBe(false);
      })
    });
    describe('Populate Index', () => {
      index.createIndex(books);
      it('should verify that the index is created', () => {
        expect(index.indices.length).toBeGreaterThan(0);
      });
      it('should verify the index maps the string keys to the correct' +
        ' objects in the JSON array', () => {
        index.searchIndex('Alice, elf');
        expect(index.tempSearch).toEqual([0, 1]);
      });
      it('Should verify that multiple index could be built', () => {
        index.createIndex(book2);
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
        expect(index.tempSearch).toEqual([0, 1]);
      });

      it('should be able to search a specific index', () => {
        index.searchIndex('pelican', 1);
        expect(index.tempSearch).toEqual([2]);
      });
    });
  });
})();
