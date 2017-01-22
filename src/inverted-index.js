// This program attempts to build an inverted index from a JSON file

class InvertedIndex{

    constructor(){
      
      // to save multiple inverted indexes
        
      this.indices = [];
    }
//creates an inverted index from the specified fileName or JsonObject
    
  createIndex(fileName, jsonObject) {
        const index = {};
        jsonObject.map(function(sentence, count){
            (sentence.title+' '+sentence.text)
                .replace(/[^A-Za-z0-9\s]/g,'')
                .toLowerCase().split(" ")
                .map(function(word){
                    if(index[word] && index[word].indexOf(count) === -1){
                        index[word].push(count);
                    }else{
                        index[word] = [count];
                    }

                })
            });
            this.indices.push(index);
            return index;
    }
    //Searches the recently indexed object for matches with specified parameters
  
    searchIndex (term, choice){
        const result = [];
        const terms =
            term.replace(/[^A-Za-z0-9\s]/g,'').toLocaleLowerCase().split(' ');
        const that = this;

        if (choice == 'all') {
            that.indices.map(function (index, pos) {
                result[pos] = {};
                terms.map(function(word) {

                    for(let saved_word in index){
                        if(saved_word == word){
                            result[pos][word] = index[saved_word];
                        }
                    }
                });

            });

        } else{
            terms.map(function(word){
                choice = parseInt(choice);
                let current_index = this.indices[choice];
                result[0] = {};
                for (let saved_word in current_index){
                    if(saved_word == word){
                        result[0][word] = this.indices[choice][saved_word];
                    }
                }
            });
        }
        return result;

    }

    getIndex(pos){
        if(!pos)
            return this.index[0];
        else
            return this.index[pos];
    }

    isValidJson(json){
        try {
           return JSON.parse(json);
        } catch(e){
            return false;
        }
    }

    deleteIndex(){

    }
}



let myIndex = new InvertedIndex();
    myIndex.createIndex([{title:'hello', text:'world'}, {title:'Number value', text:'Nothing you will do'}]);
    myIndex.createIndex([{title:'hello', text:'world'}, {title:'Number value', text:'Nothing you will do'}]);

let search_result = myIndex.searchIndex('number HELLO', 'all');

console.log(search_result);
 