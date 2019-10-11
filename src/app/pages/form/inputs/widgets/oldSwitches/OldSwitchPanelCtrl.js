(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .controller('OldSwitchPanelCtrl', OldSwitchPanelCtrl);

  /** @ngInject */
  function OldSwitchPanelCtrl() {
    var vm = this;

    vm.switcherValues = {
      primary: true,
      warning: true,
      danger: true,
      info: true,
      success: true
    };
  }

})();
