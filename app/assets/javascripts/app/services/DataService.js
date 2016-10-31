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

  this.postRecipe = function(recipe) {
    return $http.post('/recipes', {recipe: recipe})
  }

  this.updateRecipe = function(recipe) {
    return $http.patch('/recipes/' + recipe.id, {recipe: recipe} )
  }

  this.deleteRecipe = function(id) {
    return $http.delete('/recipes/' + id);
  }

}

angular
    .module('app')
    .service('DataService', DataService);
