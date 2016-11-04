AuthController.$inject = ["$scope", "$state", "Auth", "FlashService"];

function AuthController($scope, $state, Auth, FlashService) {

  $scope.login = function() {
     Auth.login($scope.user).then(function(){
       $state.go('home.recipes');
       FlashService.flashAlert('success', 'Successfully logged in', 3000)
     }, function(error){
         FlashService.flashAlert('danger', 'Invalid email or password!', 0);
       });
     };


   $scope.register = function() {
    Auth.register($scope.user).then(function(){
      $state.go('home.recipes');
      FlashService.flashAlert('success', 'Successfully registered', 3000)
    }, function(error){
      if (error.data.errors.email && error.data.errors.email[0] == ("has already been taken"))
        { FlashService.flashAlert('danger', 'that email has already been taken', 0) }
        if (error.data.errors.username[0] == ("has already been taken"))
          { FlashService.flashAlert('danger', 'that username has already been taken', 0) }
      else FlashService.flashAlert('danger', 'invalid email or password', 0)
      }
    );
  };


}

angular
.module('app')
.controller('AuthController', AuthController)
