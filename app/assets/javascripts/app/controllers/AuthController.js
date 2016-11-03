AuthController.$inject = ["$scope", "$state", "Auth"];

function AuthController($scope, $state, Auth) {

  $scope.login = function() {
     Auth.login($scope.user).then(function(){
       $state.go('home.recipes');
     });
   };

   $scope.register = function() {
    Auth.register($scope.user).then(function(){
      $state.go('home.recipes');
    });
  };

}

angular
.module('app')
.controller('AuthController', AuthController)
