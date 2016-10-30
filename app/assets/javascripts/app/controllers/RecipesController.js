RecipesController.$inject = ["recipes", "$state", "$stateParams"];

function RecipesController(recipes, $state, $stateParams) {
  this.recipes = recipes.data
}

angular
  .module('app')
  .controller('RecipesController', RecipesController);
