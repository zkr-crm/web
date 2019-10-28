(function () {
  'use strict';

  angular.module('BlurAdmin.pages.portrayal.potentialEnterprisePortrayal')
      .controller('PotentialEnterprisePortrayalCtrl', PotentialEnterprisePortrayalCtrl);
  /** @ngInject */
  function PotentialEnterprisePortrayalCtrl($scope) {
	  $scope.tagData = [
		  '高价值客户', 
		  '高频次客户',
		  '高风险客户', 
		  '金卡VIP',
		  ];
	  $scope.loadDatas = function(query) {
		    // An arrays of strings here will also be converted into an
		    // array of objects
		    return [
		        "1级客户",
		        "2级客户",
		        "3级客户",
		        "高价值客户",
		        "高频次客户",
		        "高风险客户",
		        "VIP客户",
		    ];
		  };
	  
	  
	  
	    var timelineBlocks = $('.cd-timeline-block'),
	        offset = 0.8;

	    //hide timeline blocks which are outside the viewport
	    hideBlocks(timelineBlocks, offset);

	    //on scolling, show/animate timeline blocks when enter the viewport
	    $(window).on('scroll', function () {
	      if (!window.requestAnimationFrame) {
	        setTimeout(function () {
	          showBlocks(timelineBlocks, offset);
	        }, 100);
	      } else {
	        window.requestAnimationFrame(function () {
	          showBlocks(timelineBlocks, offset);
	        });
	      }
	    });

	    function hideBlocks(blocks, offset) {
	      blocks.each(function () {
	        ( $(this).offset().top > $(window).scrollTop() + $(window).height() * offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
	      });
	    }

	    function showBlocks(blocks, offset) {
	      blocks.each(function () {
	        ( $(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
	      });
	    }
	  
  }
  
})();
