RecipeController.$inject = ["$state", "$stateParams", "DataService", "ingredients", "recipe"];
function RecipeController($state, $stateParams, DataService, ingredients, recipe) {

  var ctrl = this
  ctrl.ingredients = ingredients.data

  if ($stateParams.id)
    {
      ctrl.recipe = recipe.data
    }
  else
    {
      ctrl.recipe = {
                    title: "",
                    directions: [{content: ""}],
                    recipe_ingredients: [{ingredient_name: "", quantity_prep: ""}]
                  }
      ctrl.dan = "new recipe!"
    }

}
angular
  .module('app')
  .controller('RecipeController', RecipeController);
