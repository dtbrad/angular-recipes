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
    $urlRouterProvider.otherwise('welcome');
}])
