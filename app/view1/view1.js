'use strict';

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

.controller('View1Ctrl', ['$scope', 'dataFactory', function($scope, dataFactory) {

  $scope.dataArray = [];
  $scope.counter = {};
  $scope.namesArray = [];

  function getParticipants() {
      dataFactory.getParticipants()
          .then(function (response) {
              $scope.participants = response.data;
              var data = $scope.participants.feed.entry;
              getCount(data);
              getNames(data);
          }, function (error) {
              $scope.status = 'Unable to load participant data: ' + error.message;
          });
    }
    getParticipants();

    function getCount(data) {
      $scope.count = 0;
      for (var i = 0; i < data.length; i++) {
          $scope.dataArray.push(data[i].gsx$choice.$t);
      }
      $scope.dataArray.forEach(function(x) {
          $scope.counter[x] = ($scope.counter[x] || 0) + 1
      });
      return $scope.counter;
    }

    $scope.members = {};
    function getNames(data) {

      for (var i = 0; i < data.length; i++) {
        var choice = data[i].gsx$choice.$t;
        if (!$scope.members[choice]) {
          $scope.members[choice] = [];
        }
        $scope.members[choice].push(data[i].gsx$firstname.$t + " " + data[i].gsx$lastname.$t);
      }
      $scope.myArray = [];
      for (var choice in $scope.members) {
        $scope.myArray.push({choice: choice, members: $scope.members[choice]});
      }
      console.log($scope.myArray);
    }
  }])

  .factory('dataFactory', ['$http', function($http) {
    var urlBase = 'https://spreadsheets.google.com/feeds/list/1d7G644KI9A-nz-dxmXdgru5P1feNXXyZsP1NUYygJpA/1/public/values?alt=json';

    var dataFactory = {};

    dataFactory.getParticipants = function () {
        return $http.get(urlBase);
    };
    return dataFactory;
  }]);
