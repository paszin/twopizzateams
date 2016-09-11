'use strict';

describe('Controller: AssessmentCtrl', function () {

  // load the controller's module
  beforeEach(module('perfectteamApp'));

  var AssessmentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssessmentCtrl = $controller('AssessmentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
