angular
.module('app', ['ngFlash', 'as.sortable', 'ui.router', 'templates', 'ngMessages', 'Devise'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url:'/',
      controller: 'HomeController as ctrl',
      templateUrl: 'app/views/home.html'
    })
    .state('home.welcome', {
      url:'welcome',
      templateUrl: 'app/views/welcome.html'
    })
    .state('home.login', {
      url: 'login',
      controller: 'AuthController',
      templateUrl: 'app/views/auth/_login.html'
    })
    .state('home.register', {
      url: 'register',
      templateUrl: 'app/views/auth/_register.html',
      controller: 'AuthController'
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
    .state('home.newRecipe', {
      url:'recipes/new',
      controller: 'RecipeController as ctrl',
      authenticate: true,
      templateUrl: 'app/views/recipe.html',
      resolve: {
        display: function(){
          return false
        },
        ingredients: ["DataService", function (DataService) {
          return DataService.getIngredients();
        }],
        recipe: ["$stateParams", "DataService", function ($stateParams, DataService) {
          return ""
        }]
      }
    })
    .state('home.recipe', {
      url:'recipes/:id',
      controller: 'RecipeController as ctrl',
      templateUrl: 'app/views/recipe.html',
      resolve: {
        display: function(){
          return true
        },
        ingredients: ["DataService", function (DataService) {
          return DataService.getIngredients();
        }],
        recipe: ["$stateParams", "DataService", function ($stateParams, DataService) {
          return DataService.getRecipe($stateParams.id);
        }]
      }
    })
    .state('home.editRecipe', {
      url:'recipes/:id/edit',
      controller: 'RecipeController as ctrl',
      authenticate: true,
      templateUrl: 'app/views/recipe.html',
      resolve: {
        display: ["$state", "$stateParams", "$http", "DataService", "Auth", "FlashService", function ($state, $stateParams, $http, DataService, Auth, FlashService) {
          return DataService.getRecipe($stateParams.id).then(function(result) { return result.data.user.id })
          .then(function(result){
            if (result != Auth._currentUser.id)
            {
              $state.go('home.recipes');
              FlashService.flashAlert('danger', 'Sent you back to the index because that was not your recipe to edit!'); return true;
            }
          });
        }],
        ingredients: ["DataService", function (DataService) {
          return DataService.getIngredients();
        }],
        recipe: ["$stateParams", "DataService", function ($stateParams, DataService) {
          return DataService.getRecipe($stateParams.id)
        }]
      }
    })

    $urlRouterProvider.otherwise('welcome');
}])
.run(['$rootScope', '$state', 'Auth', 'FlashService', 'DataService', function($rootScope, $state, Auth, FlashService, DataService){
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams, options){
     if ( toState.authenticate && !Auth.isAuthenticated()){
       $state.go('home.login');
       FlashService.flashAlert('danger', 'You must be logged in to create and edit recipes');
       event.preventDefault();
     }
   });
 }]);
