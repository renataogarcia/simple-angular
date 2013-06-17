'use strict';

describe('MainCtrl Spec', function () {

  beforeEach(module('simple-angular'));

  var MainCtrl, scope, location, Contact, MOCK_DATA;


  beforeEach(inject(function ($controller, $rootScope, $location) {

    MOCK_DATA = [];

    Contact = jasmine.createSpy('contactMock');
    Contact.all = function (callback) {
      callback(MOCK_DATA);
    }
    scope = $rootScope.$new();
    location = $location;

    // Initialize the controller using mocks and injected values
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location: location,
      Contact: Contact
    });

    expect(scope.contacts).toEqual(MOCK_DATA);

  }));

  it('should add a new contact', inject(function () {

    scope.add();
    expect(Contact).toHaveBeenCalled();
    expect(location.path()).toBe('/newContact');

  }));


});