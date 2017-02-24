/**
 * Created by chiamakanwosu on 15/01/2017.
 */
(() => {
  const app = angular.module('invertedIndex', ['ngFileUpload']);
  app.filter('truncate', () => (input, length) => {
    length = length || 12;
    if (input.charAt(length) === ' ') {
      return input.substr(0, length);
    }
    const nextSpace = input.indexOf(' ', length);
    return nextSpace === -1 ? input : `${input.substr(0, nextSpace)} ...`;
  });

  app.controller('InvertedIndexController',
    ['$scope', '$timeout', ($scope, $timeout) => {
      const invertedIndex = new InvertedIndex();
      $scope.message = 'this is a message';
      $scope.filesArray = [];
      $scope.fileNamesArray = [];
      $scope.file = {};
      $scope.indicesArray = [];
      $scope.searchResult = [];
      $scope.createdIndex = [];
      $scope.currentFile = '';
      $scope.titlesIndex = [];

    /**
     * @function readJson
     * @param {Object} reader
     * @param {String} fileName
     * @param {function} cb a function call
     * @return {undefined} returns nothing
     */
      function readJson(reader, fileName, cb) {
        reader.addEventListener('load', () => {
          $timeout(() => {
            try {
              const file = angular.fromJson(reader.result);
              if (!InvertedIndex.isEmpty(file) && $scope.fileNamesArray
                  .indexOf(fileName) < 0) {
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
            cb();
          });
        });
      }

      $scope.uploadFile = (files) => {
        (function uploadSync(index) {
          if (index < files.length) {
            const reader = new FileReader();
            reader.readAsText(files[index]);
            return readJson(reader, files[index].name, () => {
              index += 1;
              uploadSync(index);
            });
          }
        }(0));
      };

      $scope.getLengthAsArray = (index, alt) => {
        if (index < 0 || typeof $scope.filesArray[index] === 'undefined') {
          return;
        }
        const fileName = alt || $scope.fileNamesArray[$scope.createdIndex[index]];
        const fileIndex = $scope.fileNamesArray.indexOf(fileName);
        const arr = [];
        const length = $scope.filesArray[fileIndex].length;
        for (let i = 0; i < length; i += 1) {
          arr.push(i);
        }
        return arr;
      };

      $scope.getTitle = (counter, index) => {
        const fileName = $scope.fileNamesArray[$scope.createdIndex[index]];
        const fileIndex = $scope.fileNamesArray.indexOf(fileName);
        const title = $scope.filesArray[fileIndex][counter].title;
        return title;
      };
      $scope.createIndex = (index) => {
        $scope.titlesIndex.push(index);
        invertedIndex.createIndex($scope.fileNamesArray[index], $scope.filesArray[index]);
        const createdIndex = invertedIndex.getIndex($scope.fileNamesArray[index]);

      // Check if the position of the index has not been saved
        if ($scope.createdIndex.indexOf(index) === -1) {
          $scope.indicesArray.push(createdIndex);
          $scope.createdIndex.push(index);
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
