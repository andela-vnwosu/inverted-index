/**
 * class Inverted Index
 */
class InvertedIndex {
  /**
  * @method constructor
  */
  constructor() {
    // to save multiple inverted indexes
    this.indices = {};
    this.docTitles = {};
    this.searchTerms = [];
  }
  /**
   * Create index
   * creates an inverted index from the specified fileName or JsonObject
   * @param {Object} fileName the json data to build
   *@param {object} fileContent the content of the json document
   * @return {Object} index that was built
   */
  createIndex(fileName, fileContent) {
    const index = {};
    let docTitle = '';
    fileContent.forEach((doc, docId) => {
      doc = doc.text;
      docTitle = doc.title;
      InvertedIndex.filterText(doc)
      .split(' ')
      .forEach((word) => {
        if (index[word]) {
          if (!index[word][docId]) {
            index[word].push(docId);
          }
        } else {
          index[word] = [docId];
        }
      });
    });
    this.indices[fileName] = index;
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
   * @param {String} selectedFile the specific index of file to search in
   * @param {String} terms to search for
   * @return {Array} result
   */
  searchIndex(selectedFile, ...terms) {
    const searchSpace = selectedFile === 'all' ?
      this.indices : { [selectedFile]: this.indices[selectedFile] };
    const searchTerms = this.resolveSearchTerms(terms)
    .map(term => InvertedIndex.filterText(term));
    const searchResults = {};

    searchTerms.forEach((term) => {
      Object.keys(searchSpace).forEach((fileName) => {
        const index = this.indices[fileName];
        if (searchResults[fileName]) {
          if (index[term]) {
            searchResults[fileName][term] = index[term];
          }
        } else if (index[term]) {
          searchResults[fileName] = { [term]: index[term] };
        }
      });
    });
    return searchResults;
  }

  /**
   * @method getIndex
   * @param {object} fileName position in array
   * @return {Object} the index
   */
  getIndex(fileName) {
    return this.indices[fileName];
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
   * @method resolveSearchTerms
   * @return {array} the resolved terms
   */
  resolveSearchTerms(...allTerms) {
    this.searchTerms = [];
    this.resolveSearchTermsHelper(allTerms);
    return this.searchTerms;
  }

  /**
   * Helper method to resolve array of search terms
   * @method resolveSearchTermsHelper
   * @param {Array} allTerms the terms
   * @return {undefined} returns nothing
   */
  resolveSearchTermsHelper(allTerms) {
    allTerms.forEach((term) => {
      this.testTerm(term);
    });
  }

  /**
   * process string search terms
   * @method testTerm
   * @param {String} term
   * @return {Array} the search terms in an array
   */
  testTerm(term) {
    if (typeof term === 'string') {
      term = term.trim().split(' ');
      if (term.length === 1) {
        return this.searchTerms.push(term[0]);
      }
      return this.resolveSearchTermsHelper(term);
    }
    return this.resolveSearchTermsHelper(term);
  }
}
