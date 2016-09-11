'use strict';

describe('Service: issueDialog', function () {

  // load the service's module
  beforeEach(module('perfectteamApp'));

  // instantiate service
  var issueDialog;
  beforeEach(inject(function (_issueDialog_) {
    issueDialog = _issueDialog_;
  }));

  it('should do something', function () {
    expect(!!issueDialog).toBe(true);
  });

});
