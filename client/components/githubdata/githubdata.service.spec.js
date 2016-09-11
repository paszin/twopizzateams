'use strict';

describe('Service: githubdata', function () {

  // load the service's module
  beforeEach(module('perfectteamApp'));

  // instantiate service
  var githubdata;
  beforeEach(inject(function (_githubdata_) {
    githubdata = _githubdata_;
  }));

  it('should do something', function () {
    expect(!!githubdata).toBe(true);
  });

});
