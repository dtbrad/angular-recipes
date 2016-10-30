DataService.$inject = ["$http"];

function DataService($http) {

  this.getRecipes = function() {
    return $http.get('/recipes.json');
  }

}

angular
    .module('app')
    .service('DataService', DataService);
