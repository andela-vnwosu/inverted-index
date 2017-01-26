// This program attempts to build an inverted index from a JSON file
/**
* @class InvertedIndex
*
*/
class InvertedIndex {
  /**
  * @method constructor
  */
  constructor() {
    // to save multiple inverted indexes
    this.indices = [];
    this.temp_search = [];
    this.search_terms = [];
  }
  /**
   * creates an inverted index from the specified fileName or JsonObject
   * @method createIndex
   * @param {String} fileName
   * @param {Object} jsonObject
   * @return {Object} index that was built
   */
  createIndex(fileName, jsonObject) {
    const index = {};
    jsonObject.map((sentence, count) => {
      (`${sentence.title} ${sentence.text}`)
        .replace(/[^A-Za-z0-9\s]/g, '')
        .toLowerCase().split(' ')
        .map((word) => {
          if (index[word] && index[word].indexOf(count) === -1) {
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
   * Searches the recently indexed object for matches with specified parameters
   * @method searchIndex
   * @param {String} term
   * @param {String} choice
   * @return {Array} result
   */
  searchIndex(term, choice) {
    this.temp_search = [];
    const result = [];
    this.resolveSearchTerms(term);
    term = this.search_terms.toString().replace(',', ' ');
    this.search_terms = [];
    const terms = term.replace(/[^A-Za-z0-9\s]/g, '').toLocaleLowerCase().split(' ');
    console.log(term);
    if (typeof choice === 'undefined') {
      choice = 'all';
    }
    if (choice === 'all') {
      this.indices.map((index, pos) => {
        result[pos] = {};
        let savedWord;
        terms.map((word) => {
          for (savedWord in index) {
            if (savedWord === word) {
              result[pos][word] = index[savedWord];
              // save position of word occurrence in the document
              this.temp_search.push(index[savedWord][0]);
            }
          }
        });
      });
    } else {
      choice = parseInt(choice);
      const currentIndex = this.indices[choice];
      // console.log("Current index",current_index);
      result[0] = {};
      let savedWord;
      terms.map((word) => {
        for (savedWord in currentIndex) {
          if (savedWord === word) {
            result[0][word] = this.indices[choice][savedWord];
            this.temp_search.push(this.indices[choice][savedWord][0]);
          }
        }
      });
    }
    return result;
  }

  /**
   * @method getIndex
   * @param {Number} pos
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
  resolveSearchTerms() {
    for (let arg of arguments) {
      if (arg instanceof Object && typeof arg !== 'string') {
        for (let item in arg) {
          if (arg.hasOwnProperty(item)) {
            this.resolveSearchTerms(arg[item]);
          }
        }
      } else {
        this.search_terms.push(arg);
      }
    }
  }
}
