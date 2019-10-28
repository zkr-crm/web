
(function () {
  'use strict';

  angular.module('BlurAdmin.common')
    .run(commonRun);


  /** @ngInject */
  function commonRun(DTDefaultOptions) {

    /** Datatable 设置 **/
    DTDefaultOptions.setLanguageSource('app/services/datatables/i18n/Chinese.json')
    				.setDOM('tip')
    			    .setOption('paginationType','simple_numbers');
  }

})();