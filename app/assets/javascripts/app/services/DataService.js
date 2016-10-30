DataService.$inject = ["$http"];

function DataService($http) {

  this.getIngredients = function() {
    return $http.get('/ingredients.json');
  }

  this.getRecipes = function() {
    return $http.get('/recipes.json');
  }

  this.getRecipe = function(id) {
    return $http.get('/recipes/' + id +'.json');
  }

}

angular
    .module('app')
    .service('DataService', DataService);
