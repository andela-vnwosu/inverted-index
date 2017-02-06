// This program attempts to build an inverted index from a JSON file
/**
 * @class Inverted Index
 */
class InvertedIndex {
  /**
  * @method constructor
  */
  constructor() {
    // to save multiple inverted indexes
    this.indices = [];
    this.tempSearch = [];
    this.searchTerms = [];
  }
  /**
   * Create index
   * creates an inverted index from the specified fileName or JsonObject
   * @param {Object} bookDocument the json data to build
   * @return {Object} index that was built
   */
  createIndex(bookDocument) {
    const index = {};
    bookDocument.map((sentence, count) => {
      this.filterText((`${sentence.title} ${sentence.text}`))
      .split(' ')
      .map((word) => {
        if (index[word] && !index[word][count]) {
          index[word].push(count);
        } else {
          index[word] = [count];
        }
      });
    });
    this.indices.push(index);
    return index;
  }

  filterText(str) {
    return str.replace(/[^A-Za-z0-9\s]/g, '')
        .toLowerCase();
  }

  /**
   * Searches the recently indexed object for matches with specified parameters
   * @method searchIndex
   * @param {String} term terms to search for
   * @param {String} selectedFile the specific file to search in
   * @return {Array} result 
   */
  searchIndex(term, selectedFile) {
    this.tempSearch = [];
    const result = [];
    this.resolveSearchTerms(term);
    term = this.searchTerms.toString().replace(',', ' ');
    this.searchTerms = [];
    const terms = this.filterText(term).split(' ');
    if (typeof selectedFile === 'undefined') {
      selectedFile = 'all';
    }
    if (selectedFile === 'all') {
      this.indices.map((index, pos) => {
        result[pos] = {};
        let savedWord;
        terms.map((word) => {
          for (savedWord in index) {
            if (savedWord === word) {
              result[pos][word] = index[savedWord];
              // save position of word occurrence in the document
              this.tempSearch.push(index[savedWord][0]);
            }
          }
        });
      });
    } else {
      selectedFile = parseInt(selectedFile);
      const currentIndex = this.indices[selectedFile];
      result[0] = {};
      let savedWord;
      terms.map((word) => {
        for (savedWord in currentIndex) {
          if (savedWord === word) {
            result[0][word] = this.indices[selectedFile][savedWord];
            this.tempSearch.push(this.indices[selectedFile][savedWord][0]);
          }
        }
      });
    }
    return result;
  }

  /**
   * @method getIndex
   * @param {Number} pos position in array
   * @return {Object} the index
   */
  getIndex(pos) {
    if (!pos) {
      return this.index[0];
    }
    return this.index[pos];
    
  }

  /**
   * isValidJson checks if json is valid
   * @method isValidJson
   * @param {Object} json
   * @return {Boolean} returns true if valid json
   */
  isValidJson(json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return false;
    }
  }

  /**
   * Asserts if an object is not empty and if it contains the property text
   * and title
   * @method isEmpty
   * @param {Object} arrayObject
   * @return {Boolean} Returns true if empty
   * */
  isEmpty(arrayObject) {
    if (typeof arrayObject === 'object') {
      // it's an object
      if ((Object.keys(arrayObject).length > 0)) {
        //it has some contents
        for (let key in arrayObject) {
          if (arrayObject[key].hasOwnProperty('title') &&
              arrayObject[key].hasOwnProperty('text')) {
            //the content is an array of object with property text and title
            return false;
          }
        }
      }
    }

    return true;
  }
  resolveSearchTerms() {
    for (let arg of arguments) {
      if (arg instanceof Object && typeof arg !== 'string') {
        for (let item in arg) {
          if (arg.hasOwnProperty(item)) {
            this.resolveSearchTerms(arg[item]);
          }
        }
      } else {
        this.searchTerms.push(arg);
      }
    }
  }
}
