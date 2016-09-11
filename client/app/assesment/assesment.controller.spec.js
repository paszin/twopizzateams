'use strict';

describe('Controller: AssesmentCtrl', function () {

  // load the controller's module
  beforeEach(module('perfectteamApp'));

  var AssesmentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssesmentCtrl = $controller('AssesmentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
