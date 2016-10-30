RecipeController.$inject = ["$state", "$stateParams", "DataService", "ingredients", "recipe"];
function RecipeController($state, $stateParams, DataService, ingredients, recipe) {

  ctrl = this
  ctrl.ingredients = ingredients.data

  if ($stateParams.id)
    {
      ctrl.recipe = recipe.data
    }
  else
    {
      ctrl.recipe = {
                    title: "",
                    directions: [{place: 1, content: ""}],
                    recipe_ingredients: [{place: 1, ingredient_name: "", quantity_prep: ""}]
                  }
    }

  ctrl.addStep = function(){
    var index = ctrl.recipe.directions.length+1
    ctrl.recipe.directions.push({place: index, content: ""})
  }

  ctrl.addIng = function(){
    var index = ctrl.recipe.recipe_ingredients.length+1
    ctrl.recipe.recipe_ingredients.push({place: index, ingredient_name: "", quantity_prep: ""})
  }

  ctrl.submit = function(){
  }

}
angular
  .module('app')
  .controller('RecipeController', RecipeController);
