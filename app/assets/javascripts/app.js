angular
.module('app', ['ui.router', 'templates'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url:'/',
      templateUrl: 'app/views/home.html'
    })
    .state('home.welcome', {
      url:'welcome',
      templateUrl: 'app/views/welcome.html'
    })
    .state('home.recipes', {
      url:'recipes',
      controller: 'RecipesController as ctrl',
      templateUrl: 'app/views/recipes.html',
      resolve: {
        recipes: ["DataService", function (DataService) {
          return DataService.getRecipes();
        }]
      }
    })
    .state('home.recipe', {
      url:'recipes/:id',
      controller: 'RecipeController as ctrl',
      templateUrl: 'app/views/recipe.html',
      resolve: {
        recipe: ["$stateParams", "DataService", function ($stateParams, DataService) {
          return DataService.getRecipe($stateParams.id);
        }]
      }
    })
    $urlRouterProvider.otherwise('welcome');
}])
