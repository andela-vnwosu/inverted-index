/**
 * Created by chiamakanwosu on 15/01/2017.
 */
(() => {
  const app = angular.module('invertedIndex', ['ngFileUpload']);

  app.controller('InvertedIndexController', ['$scope', '$timeout', ($scope, $timeout) => {
    const invertedIndex = new InvertedIndex();
    $scope.message = 'this is a message';
    $scope.filesArray = [];
    $scope.fileNamesArray = [];
    $scope.file = {};
    $scope.indicesArray = [];
    $scope.searchResult = [];
    $scope.createdIndex = [];
    $scope.currentFile = '';

    /**
     * @function readJson
     * @param {Object} reader
     * @param {String} fileName
     * @return {undefined} returns nothing
     */
    function readJson(reader, fileName) {
      reader.addEventListener('load', () => {
        $timeout(() => {
          try {
            const file = angular.fromJson(reader.result);
            if (!InvertedIndex.isEmpty(file) && $scope.fileNamesArray.indexOf(fileName) < 0) {
              $scope.filesArray.push(file);
              $scope.fileNamesArray.push(fileName);
              sweetAlert('', 'file uploaded', 'success');
            } else if ($scope.fileNamesArray.indexOf(fileName) >= 0) {
              sweetAlert('', 'File already exists', 'error');
            } else {
              sweetAlert('', 'not a valid json', 'error');
            }
          } catch (e) {
            sweetAlert('', 'not a valid json', 'error');
          }
        });
      });
    }

    $scope.uploadFile = (files) => {
      for (let i = 0; i < files.length; i += 1) {
        const reader = new FileReader();
        readJson(reader, files[i].name);
        reader.readAsText(files[i]);
      }
    };

    $scope.getLengthAsArray = (index, alt) => {
      if (index < 0 || typeof $scope.filesArray[index] === 'undefined') {
        return;
      }
      const arr = [];
      // iterates over index of filesArray and populates filesArray
      const length = (typeof alt !== 'undefined' && $scope.currentFile !== '') ? $scope.currentFile.length :
        $scope.filesArray[index].length;

      for (let i = 0; i < length; i += 1) {
        arr.push(i);
      }
      return arr;
    };
    $scope.createIndex = (index) => {
      const createdIndex = invertedIndex.createIndex($scope.fileNamesArray[index],
        $scope.filesArray[index]);
      // Check if the position of the index has not been saved
      if ($scope.createdIndex.indexOf(index) === -1) {
        $scope.indicesArray.push(createdIndex);
        $scope.createdIndex.push(index); // if it has been created, save index position
      }
    };
    $scope.searchIndex = (terms) => {
      $scope.searchResult = invertedIndex.searchIndex('all', terms);
      $scope.currentFile = '';
    };
    $scope.searchSpecificFile = (terms, index) => {
      $scope.searchResult = invertedIndex.searchIndex($scope.fileNamesArray[index], terms);
      $scope.currentFile = $scope.filesArray[index];
    };
  }]);
})();
