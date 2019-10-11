(function() {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.tagMgr')
    .directive('tagWizard', tagWizard);

  /** @ngInject */
  function tagWizard() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/pages/mgrcenter/tagmgr/tagWizard/tagWizard.html',
      controllerAs: '$tagWizardController',
      controller: 'tagWizardCtrl'
    }
  }
})();
