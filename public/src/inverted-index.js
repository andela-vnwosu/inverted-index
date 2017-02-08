/**
 * class Inverted Index
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
    bookDocument.forEach((sentence, count) => {
      InvertedIndex.filterText((`${sentence.title} ${sentence.text}`))
      .split(' ')
      .forEach((word) => {
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
  /**
   * @method filterText
   * @param {String} str the string to perform the regex
   * @return{String} returns the striped string
   */
  static filterText(str) {
    return str.replace(/[^A-Za-z0-9\s]/g, '')
        .toLowerCase();
  }

  /**
   * Searches the recently indexed object for matches with specified parameters
   * @method searchIndex
   * @param {String} term terms to search for
   * @param {String} selectedFile the specific index of file to search in
   * @return {Array} result
   */
  searchIndex(term, selectedFile) {
    this.tempSearch = [];
    const result = [];
    this.resolveSearchTerms(term);
    term = this.searchTerms.toString().replace(',', ' ');
    this.searchTerms = [];
    const terms = InvertedIndex.filterText(term).split(' ');
    if (selectedFile === undefined || selectedFile === 'all') {
      this.indices.forEach((index, pos) => {
        result[pos] = {};
        terms.forEach((word) => {
          Object.keys(index).forEach((savedWord) => {
            if (savedWord === word) {
              result[pos][word] = index[savedWord];
              // save position of word occurrence in the document
              this.tempSearch.push(index[savedWord][0]);
            }
          });
        });
      });
    } else {
      selectedFile = parseInt(selectedFile, 10);
      const currentIndex = this.indices[selectedFile];
      result[0] = {};
      terms.forEach((word) => {
        Object.keys(currentIndex).forEach((savedWord) => {
          if (savedWord === word) {
            result[0][word] = this.indices[selectedFile][savedWord];
            this.tempSearch.push(this.indices[selectedFile][savedWord][0]);
          }
        });
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
  static isValidJson(json) {
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
  static isEmpty(arrayObject) {
    let isEmpty = true;
    if (typeof arrayObject === 'object') {
      // it's an object
      if ((Object.keys(arrayObject).length > 0)) {
        // it has some contents
        Object.keys(arrayObject).forEach((key) => {
          const item = arrayObject[key];
          if ((item.title) && (item.text)) {
            // the content is an array of object with property text and title
            isEmpty = false;
            return false;
          }
        });
      }
    }
    return isEmpty;
  }

  /**
   * Resolves complex search terms into linear array and saves
   * to the searchTerm property
   *
   * @method resolveSearchTerms
   * @return {undefined}
   */
  resolveSearchTerms(...allTerms) {
    Object.keys(allTerms).forEach((key) => {
      const term = allTerms[key];
      if (term instanceof Object && typeof term !== 'string') {
        Object.keys(term).forEach((item) => {
          if ((item in term)) {
            this.resolveSearchTerms(term[item]);
          }
        });
      } else {
        this.searchTerms.push(term);
      }
    });
  }
}
