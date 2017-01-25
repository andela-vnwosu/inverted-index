/**
 * Created by chiamakanwosu on 06/01/2017.
 */
(() => {
  "use strict";
  describe('invertedIndex', ()=> {
    let bookPath = [{
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },
      {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      }
    ];
    let documentJson = [
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
    ];
    let index = new InvertedIndex();
    let emptyJson = [];
    describe('Read book data', ()=> {
      it('should read the JSON file and assert that it is not empty', () => {
        expect(index.isValidJson(emptyJson)).toBe(false);
      });
    });
    describe('Populate Index', () => {
      index.createIndex('book.json', bookPath);
      it('should verify that the index is created', () => {
        expect(index.indices.length).toBeGreaterThan(0);
      });
      it('should verify the index maps the string keys to the correct' +
        ' objects in the JSON array', ()=> {
        index.searchIndex('Alice, elf');
        expect(index.temp_search).toEqual([0, 1]);
      });
      it('Should verify that multiple index could be built', () => {
        index.createIndex('document.json', documentJson);
        expect(index.indices.length).toEqual(2);
      });
    });
    describe('Search index', () => {
      it('should ensure search does not take too long to execute', ()=> {
        let runtimeThreshold = 1000;
        let currentMillisecond =  new Date().getMilliseconds();
        index.searchIndex('Alice', ['Fellowship', ['dwarf'], 'in']);
        let finalMilliseconds =  new Date().getMilliseconds();
        let timeDifference = finalMilliseconds - currentMillisecond;
        expect(timeDifference).toBeLessThan(runtimeThreshold);
      });
      it('should ensure searchIndex can handle a varied number of search terms as ' +
        'arguments', () => {
        expect(index.searchIndex('Alice', 'Amaka', 'Lord')).toEqual(['0', '', '1']);
      });
      it('should ensure searchIndex can handle an array of search terms', () => {
        expect(index.searchIndex('Alice', ['Fellowship', ['dwarf']])).toEqual(
          ['0', '1', '1']);
      });
      it('should be able to search a specific index', () => {
        index.searchIndex('pelican', 1);
        expect(index.temp_search).toEqual([2]);
      });
    });
  });
})();
