FlashService.$inject = ["Flash"];

function FlashService(Flash) {
  this.flashAlert = function(type, message, duration){
    var message = message;
    var id = Flash.create(type, message, duration, {class: 'custom-class', id: 'custom-id'}, true);
  }
}

angular
    .module('app')
    .service('FlashService', FlashService);
