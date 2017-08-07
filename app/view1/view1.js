(function() {

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/groups', {
    templateUrl: 'view1/groups.html',
    controller: 'View1Ctrl'
  })
  .when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'dataFactory', 'modFactory', function($scope, dataFactory, modFactory) {

  $scope.dataArray = [];
  $scope.namesArray = [];
  $scope.members = {};
  $scope.myArray = [];
  $scope.selectedPerson = {};

  $scope.setModerator = function(index, moderator){
    console.log(index, moderator);
    console.log($scope.selectedPerson);
  };

  function getModeratorAvailability(data){
    for (var i = 0; i < data.length; i++) {
      for (var p in $scope.myArray) {
          var choice = $scope.myArray[p].choice;
          if ((choice === "Sundays - 10am PT / 5pm UTC") &&
              (data[i].gsx$sundays1000am.$t === "Yes")){
                $scope.myArray[p].moderatorsPrimary.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Sundays - 10am PT / 5pm UTC") &&
              (data[i].gsx$sundays1000am.$t === "Only if need-be")){
                $scope.myArray[p].moderatorsBackup.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Sundays - 12pm PT / 7pm UTC") &&
              (data[i].gsx$sundays1200pm.$t === "Yes")){
                $scope.myArray[p].moderatorsPrimary.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Sundays - 12pm PT / 7pm UTC") &&
              (data[i].gsx$sundays1200pm.$t === "Only if need-be")){
                $scope.myArray[p].moderatorsBackup.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Sundays - 5pm PT / 12am UTC") &&
              (data[i].gsx$sundays500pm.$t === "Yes")){
                $scope.myArray[p].moderatorsPrimary.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Sundays - 5pm PT / 12am UTC") &&
              (data[i].gsx$sundays500pm.$t === "Only if need-be")){
                $scope.myArray[p].moderatorsBackup.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Sundays - 7pm PT / 2am UTC") &&
              (data[i].gsx$sundays700pm.$t === "Yes")){
                $scope.myArray[p].moderatorsPrimary.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Sundays - 7pm PT / 2am UTC") &&
              (data[i].gsx$sundays700pm.$t === "Only if need-be")){
                $scope.myArray[p].moderatorsBackup.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Mondays - 10am PT / 5pm UTC") &&
              (data[i].gsx$mondays1000am.$t === "Yes")){
                $scope.myArray[p].moderatorsPrimary.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Mondays - 10am PT / 5pm UTC") &&
              (data[i].gsx$mondays1000am.$t === "Only if need-be")){
                $scope.myArray[p].moderatorsBackup.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Mondays - 12pm PT / 7pm UTC") &&
              (data[i].gsx$mondays1200pm.$t === "Yes")){
                $scope.myArray[p].moderatorsPrimary.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Mondays - 12pm PT / 7pm UTC") &&
              (data[i].gsx$mondays1200pm.$t === "Only if need-be")){
                $scope.myArray[p].moderatorsBackup.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Mondays - 5pm PT / 12am UTC") &&
              (data[i].gsx$mondays500pm.$t === "Yes")){
                $scope.myArray[p].moderatorsPrimary.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Mondays - 5pm PT / 12am UTC") &&
              (data[i].gsx$mondays500pm.$t === "Only if need-be")){
                $scope.myArray[p].moderatorsBackup.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Mondays - 7pm PT / 2am UTC") &&
              (data[i].gsx$mondays700pm.$t === "Yes")){
                $scope.myArray[p].moderatorsPrimary.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
          if ((choice === "Mondays - 7pm PT / 2am UTC") &&
              (data[i].gsx$mondays700pm.$t === "Only if need-be")){
                $scope.myArray[p].moderatorsBackup.push(data[i].gsx$name.$t + " " + data[i].gsx$last.$t);
          }
      }
    }
  }
  function getModerators() {
      modFactory.getModerators()
          .then(function (response) {
              $scope.moderators = response.data;
              var data = $scope.moderators.feed.entry;
              getModeratorAvailability(data);
          }, function (error) {
              $scope.status = 'Unable to load moderator data: ' + error.message;
          });
    }
  getModerators();
  function getParticipants() {
      dataFactory.getParticipants()
          .then(function (response) {
              $scope.participants = response.data;
              var data = $scope.participants.feed.entry;
              getMembers(data);
          }, function (error) {
              $scope.status = 'Unable to load participant data: ' + error.message;
          });
    }
    getParticipants();

    function getMembers(data) {
      for (var i = 0; i < data.length; i++) {
        var choice = data[i].gsx$choice.$t;
        if (!$scope.members[choice]) {
          $scope.members[choice] = [];
        }
        $scope.members[choice].push(data[i].gsx$firstname.$t + " " + data[i].gsx$lastname.$t);
      }
      for (var choice in $scope.members) {
        $scope.myArray.push({choice: choice, members: $scope.members[choice], moderatorsPrimary: [], moderatorsBackup: []});
      }
    }

  }])

  .factory('dataFactory', ['$http', function($http) {

    var urlPar = 'https://spreadsheets.google.com/feeds/list/1d7G644KI9A-nz-dxmXdgru5P1feNXXyZsP1NUYygJpA/1/public/values?alt=json';

    var dataFactory = {};

    dataFactory.getParticipants = function () {
        return $http.get(urlPar);
    };
    return dataFactory;
  }])

  .factory('modFactory', ['$http', function($http) {

    var urlMod = 'https://spreadsheets.google.com/feeds/list/1_jhPWqVt_LzrOslwuFqbU8pzOvXjBQ8OfFO5SRolK30/1/public/values?alt=json';

    var modFactory = {};

    modFactory.getModerators = function(){
      return $http.get(urlMod);
    }

    return modFactory;

  }]);
})();
