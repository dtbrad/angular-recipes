FlashService.$inject = ["Flash"];

function FlashService(Flash) {

  this.flashCreate = function(){
    var message = 'Recipe created';
    var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
  }

  this.flashUpdate = function(){
    var message = 'Recipe updated';
    var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
  }

  this.flashDelete = function(){
    var message = 'Recipe deleted';
    var id = Flash.create('warning', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
  }
}

angular
    .module('app')
    .service('FlashService', FlashService);
