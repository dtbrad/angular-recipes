RecipeController.$inject = ["$state", "$stateParams", "DataService", "recipe"];
function RecipeController($state, $stateParams, DataService, recipe) {

  var ctrl = this
  ctrl.recipe = recipe.data

}
angular
  .module('app')
  .controller('RecipeController', RecipeController);
