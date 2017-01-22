/**
 * Created by chiamakanwosu on 15/01/2017.
 */

const app = angular.module('invertedIndex', ['ngFileUpload']);



app.controller('InvertedIndexController', ['$scope', '$timeout', function($scope, $timeout){
    
    let invertedIndex = new InvertedIndex();
    $scope.message = "this is a message";
    $scope.filesArray = [];
    $scope.fileNamesArray = [];
    $scope.file = {};
    $scope.indicesArray = [];
    $scope.searchResult = [];
    $scope.createdIndex = [];

    $scope.uploadFile =  function(files){
        for(let i = 0; i < files.length; i++){
            let reader = new FileReader();
            (
                function(reader, $scope, fileName){
                    reader.addEventListener('load', function(){
                        $timeout(function(){

                            try{
                                let file = angular.fromJson(reader.result);
                                $scope.filesArray.push(file);
                                $scope.fileNamesArray.push(fileName);
                            }catch (e){
                                alert("not a valid json")

                            }

                        });
                    });
                }
            )(reader, $scope, files[i].name);

            reader.readAsText(files[i]);
        }
    };

    $scope.getLengthAsArray = function(index){
        if(index < 0 || typeof $scope.filesArray[index] == 'undefined')
            return;
        const arr = [];
        
        // iterates over index of filesArray and populates filesArray
        
      for(let i = 0; i < $scope.filesArray[index].length; i++){
            arr.push(i);
        }
        return arr;
    };
    $scope.createIndex= function(index){
        let createdIndex= invertedIndex.createIndex("book.json",$scope.filesArray[index]);
        
        // Check if the position of the index has not been saved
        
      if($scope.createdIndex.indexOf(index) == -1){
            $scope.indicesArray.push(createdIndex);
            
            //if it has been created, save index position
            
        $scope.createdIndex.push(index);
        }
    };
    
    $scope.searchIndex = function (terms) {
        $scope.searchResult = invertedIndex.searchIndex(terms, 'all');
        console.log($scope.searchResult);
    }
}]);