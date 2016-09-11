'use strict';

angular.module('perfectteamApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('assessment', {
        url: '/assessment?demo',
        templateUrl: 'app/assesment/assesment.html',
        controller: 'AssesmentCtrl'
      });
  });
