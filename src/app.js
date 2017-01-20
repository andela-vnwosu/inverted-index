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

    $scope.uploadFile =  function(files){
        for(let i = 0; i < files.length; i++){
            let reader = new FileReader();
            (
                function(reader, $scope, fileName){
                    reader.addEventListener('load', function(){
                        $timeout(function(){
                            let file = angular.fromJson(reader.result);
                            $scope.filesArray.push(file);
                            $scope.fileNamesArray.push(fileName);
                            
                            
                        });
                    });
                }
            )(reader, $scope, files[i].name);

            reader.readAsText(files[i]);
        }
    };

    $scope.getLengthAsArray = function(index){
        console.log(index);
        const arr = [];
        for(let i = 0; i < $scope.filesArray[index].length; i++){
            arr.push(i);
        }
        return arr;
    };

    $scope.createIndex= function(index){
        $scope.indicesArray.push(invertedIndex.createIndex($scope.filesArray[index]));
    };
    
    $scope.searchIndex = function (terms) {
        $scope.searchResult = invertedIndex.searchIndex(terms, 'all');
        console.log($scope.searchResult);
    }
}]);