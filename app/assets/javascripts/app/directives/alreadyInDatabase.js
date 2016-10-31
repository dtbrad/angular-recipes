alreadyInDatabase.$inject = ["DataService"];
function alreadyInDatabase(DataService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {

      if (element[0].getAttribute('name') === "recipeTitle")
      { element[0].setAttribute('data', scope.ctrl.recipe.title) }

      if (element[0].getAttribute('name') === "ingredientName")
      { element[0].setAttribute('data', scope.ingredient.name) }

      element[0].addEventListener('change', function(){
        value = element[0].value
        name = element[0].name

        if (name === 'recipeTitle')
        {
          DataService.getRecipes()
          .then(function(result){
            if ( (result.data.filter(function(x){return x.title.toLowerCase() === value.toLowerCase() })).length > 0   )
            { ctrl.$setValidity('alreadyInDatabase', false)}
            else
            { ctrl.$setValidity('alreadyInDatabase', true) }
          })
        }

        else
        {
          DataService.getIngredients()
          .then(function(result){
            if ( (result.data.filter(function(x){return x.name.toLowerCase() === value.toLowerCase() })).length > 0   )
            { ctrl.$setValidity('alreadyInDatabase', false)}
            else
            { ctrl.$setValidity('alreadyInDatabase', true) }
          })

        }

      });
    }
  }
}
angular
.module('app')
.directive('alreadyInDatabase', alreadyInDatabase);
