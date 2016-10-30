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
                    recipe_ingredients: [{place: 1, name: "", quantity_prep: ""}]
                  }
    }

  ctrl.addStep = function(){
    var index = ctrl.recipe.directions.length+1
    ctrl.recipe.directions.push({place: index, content: ""})
  }

  ctrl.addIng = function(){
    var index = ctrl.recipe.recipe_ingredients.length+1
    ctrl.recipe.recipe_ingredients.push({place: index, name: "", quantity_prep: ""})
  }

  ctrl.removeEntry = function(entry, array){
    array.splice(array.indexOf(entry), 1)
  }

  ctrl.dragControlListeners = {
    accept: function (sourceItemHandleScope, destSortableScope) {
      return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
    },
    itemMoved: function(event) {},
    orderChanged: function(event) {},
  };

  ctrl.submit = function(){
    ctrl.recipe.recipe_ingredients.forEach(function(i){i.place = (ctrl.recipe.recipe_ingredients.indexOf(i)+1)});
    ctrl.recipe.directions.forEach(function(i){i.place = (ctrl.recipe.directions.indexOf(i)+1)});
  }

}
angular
  .module('app')
  .controller('RecipeController', RecipeController);
