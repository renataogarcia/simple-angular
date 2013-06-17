// Declare a module for the app and it's dependencies. The module is referred by ng-app at index.html. We are using
// a component that allows us to access mongolab via a REST api. This component definition is included in the index.html
// as well (mongolabsHttp.js).
var app = angular.module('simple-angular', ['mongolabResourceHttp']);

// Define a constant to be used by the mongolabResourceHttp service to connect to our mongodb
app.constant('MONGOLAB_CONFIG', {API_KEY: 'pSfcjDuxXCvxB4HS3XYf09BcxNzGdRy5', DB_NAME: 'my-demo-db'});

// Allow us to inject a Contact and reuse it
app.factory('Contact', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('contacts');
});

// This is run to configure the app
app.config(function ($routeProvider) {

  // Map the urls to the view templates. The content of the template will be rendered on the ng-view tag on the index.html
  $routeProvider
    .when('/', {
      templateUrl: 'views/contacts.html'
    })
    .when('/newContact', {
      templateUrl: 'views/contactDetail.html'
    })
    .when('/contact', {
      templateUrl: 'views/contactDetail.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('MainCtrl2', function ($scope) {

  console.log( 'CREATED Main2');
  $scope.myValue = "test";
});

// Declare our main controller, this is referred by the ng-controller at index.html. For simplicity all
// the views share the same controller, but we could declare one controller per view and use them by adding
// a ng-controller on the templates (there are other ways of defining which controller to use e.g. at routing).
app.controller('MainCtrl', function ($scope, $location, Contact) {

  // Read all the contacts
  Contact.all(function (contacts) {
    // This is Promise, so when we get the results back we assign them to the contacts.
    $scope.contacts = contacts;
  });


  $scope.add = function () {
    $scope.contact = new Contact();

    //Navigate using the paths defined at the routing above
    $location.path('/newContact');
  }

  $scope.save = function () {

    $scope.contact.$saveOrUpdate(function (savedContact) {

      // Once saved, push the savedContact to the contacts array. The savedContact will have the ID set on it.
      $scope.contacts.push(savedContact);
    });

    $location.path('/');
  };

  $scope.edit = function (contact) {

    // We pass the selected contact from the list when we call the edit method. The contactDetails view
    // binds to the "contact" property, so we set the selected contact in order to display it in the view.
    $scope.contact = contact;

    $location.path('/contact');
  };

  $scope.remove = function (index) {

    // This time we pass the index as a parameter so it is easy to remove from the array. As an alternative approach
    // instead of updating the contacts property we could just refresh the data from DB with Contact.all()
    var contactToRemove = $scope.contacts.splice(index, 1)[0];

    // This is a Contact object which
    contactToRemove.$remove();
  };

});

