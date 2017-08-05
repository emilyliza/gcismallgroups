'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {

}])

.factory('dataFactory', ['$http', function($http) {
  var urlBase = 'https://spreadsheets.google.com/feeds/list/1d7G644KI9A-nz-dxmXdgru5P1feNXXyZsP1NUYygJpA/1/public/values?alt=json';

  var dataFactory = {};

  dataFactory.getParticipants = function () {
      return $http.get(urlBase);
  };

  return dataFactory;

}]);
