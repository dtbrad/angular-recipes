RecipesController.$inject = ["recipes", "$state", "$stateParams"];

function RecipesController(recipes, $state, $stateParams) {
  this.recipes = recipes.data

  this.recipes.forEach(function(r){
    r.ingredients = ""
    r.ingredients_attributes.forEach(function(x){
      r.ingredients = r.ingredients + " " + x.name;
    })
  });
}

angular
  .module('app')
  .controller('RecipesController', RecipesController);
