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
        expect(InvertedIndex.isValidJson(emptyBook)).toBe(false);
      });
      it('should assert that the JSON object is not empty,' +
        'and contains title and text properties', () => {
        expect(InvertedIndex.isEmpty(invalidBook)).toBe(true);
      });
      it('Ensures the file content is actually a valid JSON', () => {
        expect(InvertedIndex.isValidJson(invalidBook)).toBe(false);
      });
      it('should verify the index maps the string keys to the correct' +
        ' objects in the JSON array', () => {
        const builtIndex = index.createIndex('books.json', books);
        expect(builtIndex.alice).toEqual([0]);
        expect(builtIndex.wonderland).toEqual([0]);
        expect(builtIndex.wizard).toEqual([1]);
        expect(builtIndex.elf).toEqual([1]);
      });
      it('should check that Index class has a getIndex method', () => {
        expect(typeof index.getIndex).toBe('function');
      });
      it('should check that Index class has a searchIndex method', () => {
        expect(typeof index.searchIndex).toBe('function');
      });
    });
    describe('Populate Index', () => {
      index.createIndex('book2.json', book2);
      it('should verify that the index is created', () => {
        expect(Object.keys(index.indices).length).toBeGreaterThan(0);
      });
      it('Should verify that multiple index could be built', () => {
        expect(Object.keys(index.indices).length).toEqual(2);
      });
    });
    describe('Search index', () => {
      it('should ensure search does not take too long to execute', () => {
        const runtimeThreshold = 1000;
        const currentMillisecond = new Date().getMilliseconds();
        index.searchIndex('books.json', 'alice');
        const finalMilliseconds = new Date().getMilliseconds();
        const timeDifference = finalMilliseconds - currentMillisecond;
        expect(timeDifference).toBeLessThan(runtimeThreshold);
      });

      it('should ensure searchIndex can handle an' +
        'array of search terms', () => {
        const searchTerms = ['alice', 'ring'];
        const searchResult = index.searchIndex('books.json', searchTerms);
        expect(searchResult).toEqual({ 'books.json': ({ alice: [0], ring: [1, 1] }) });
      });

      it('should be able to search a specific index', () => {
        expect(index.searchIndex('book2.json', 'pelican')).toEqual({ 'book2.json': ({ pelican: [2] }) });
      });
    });
  });
})();
