'use strict';

require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', '$uibModal', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService, $uibModal) {
  $log.debug('SignupController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    $uibModal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalController'
    });

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    });
  };
}
