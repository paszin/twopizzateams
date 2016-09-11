'use strict';

angular.module('perfectteamApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('assessment', {
        url: '/assessment?demo',
        templateUrl: 'app/assessment/assessment.html',
        controller: 'AssessmentCtrl'
      });
  });
