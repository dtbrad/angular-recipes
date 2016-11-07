RecipeController.$inject = ["$scope", "Auth", "FlashService", "$state", "$stateParams", "DataService", "ingredients", "recipe", "display"];
function RecipeController($scope, Auth, FlashService, $state, $stateParams, DataService, ingredients, recipe, display) {

  var ctrl = this;
  ctrl.display = display
  ctrl.ingredients = ingredients.data;
  Auth.currentUser().then(function (user){
    ctrl.user = user;
  });

  if ($stateParams.id)
    {
      ctrl.recipe = recipe.data
    }
  else
    {
      ctrl.recipe = {
                      title: "",
                      directions_attributes: [{place: 1, content: ""}],
                      ingredients_attributes: [{place: 1, name: "", quantity_prep: ""}]
                    }
    };

  ctrl.setIngredient = function(selectedValue, ingredientEntry){
    if (selectedValue)
    { ingredientEntry.name = selectedValue.name }
    else
    { ingredientEntry.name = "" }
  };

  ctrl.addStep = function(){
    var index = ctrl.recipe.directions_attributes.length+1
    ctrl.recipe.directions_attributes.push({place: index, content: ""})
  };

  ctrl.addIng = function(){
    var index = ctrl.recipe.ingredients_attributes.length+1
    ctrl.recipe.ingredients_attributes.push({place: index, name: "", quantity_prep: ""})
  };

  ctrl.removeEntry = function(entry, array){
    array.splice(array.indexOf(entry), 1)
  };

  ctrl.dragControlListeners = {
    accept: function (sourceItemHandleScope, destSortableScope) {
      return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
    },
    itemMoved: function(event) {},
    orderChanged: function(event) {},
  };

  ctrl.submit = function(){
    ctrl.recipe.ingredients_attributes.forEach(function(i)
      { i.place = (ctrl.recipe.ingredients_attributes.indexOf(i)+1) });
    ctrl.recipe.directions_attributes.forEach(function(i){i.place = (ctrl.recipe.directions_attributes.indexOf(i)+1)});
    ctrl.recipe.user_id = ctrl.user.id
    if (!ctrl.recipe.id) {
        DataService.postRecipe(ctrl.recipe)
        .then(function(result){
          $state.go('home.recipe', {id: result.data.id});
          FlashService.flashAlert('success', 'Recipe created', 3000);
        });
      }
    else {
      DataService.updateRecipe(ctrl.recipe)
      .then(function(result){
        $state.go('home.recipe', {id: result.data.id});
        FlashService.flashAlert('success', 'Recipe updated', 3000);
      });
    }
  };

  ctrl.deleteRecipe = function(){
    if (confirm('Are you sure?'))
    {
      DataService.deleteRecipe(ctrl.recipe.id)
      .then(function(result){
        $state.go('home.recipes');
        FlashService.flashAlert('danger', 'Recipe deleted', 3000);
      })
    }
  };

}
angular
  .module('app')
  .controller('RecipeController', RecipeController);
