angular.module("simple-angular").run(["$templateCache", function($templateCache) {

  $templateCache.put("app/views/contactDetail.html",
    "<div class=\"hero-unit\">\n" +
    "\n" +
    "    <h2>Contact details:</h2>\n" +
    "\n" +
    "    <form class=\"form-inline\" name=\"contactForm\" novalidate>\n" +
    "        <input type=\"text\" class=\"input-medium\" placeholder=\"Name\" ng-model=\"contact.name\" autofocus>\n" +
    "        <div class=\"input-prepend\">\n" +
    "            <span class=\"add-on\"><i class=\"icon-envelope\"></i></span>\n" +
    "            <input class=\"span2\" type=\"email\" ng-model=\"contact.email\" placeholder=\"Email\">\n" +
    "        </div>\n" +
    "        <button id=\"saveBtn\" class=\"btn btn-primary\" ng-disabled=\"!contactForm.$valid || !contact.name\" ng-click=\"save()\">Save</button>\n" +
    "    </form>\n" +
    "</div>\n"
  );

  $templateCache.put("app/views/contacts.html",
    "<div class=\"hero-unit\">\n" +
    "    <h2>Contacts</h2>\n" +
    "\n" +
    "    <div ng-switch=\"(contacts | filter:contactSearch).length == 0\">\n" +
    "        <div ng-switch-when=\"true\">\n" +
    "            <p>No contacts found.</p>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <table class=\"table table-striped\" ng-switch-default>\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Name</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr ng-repeat=\"contact in contacts | filter:contactSearch\"\n" +
    "                    ng-animate=\"{ leave: 'fade-out' }\">\n" +
    "                    <td>\n" +
    "                        <a href=\"\" ng-click=\"edit(contact)\">{{contact.name}}</a>\n" +
    "                        <a href=\"\" ng-click=\"remove($index)\" name=\"remove\"><i class=\"icon-remove\"></i></a>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <input type=\"text\" ng-model=\"contactSearch\" placeholder=\"Filter\"/>\n" +
    "    <button id=\"newBtn\" class=\"btn btn-primary\" ng-click=\"add()\"><i class=\"icon-plus icon-white\"></i> New</button>\n" +
    "</div>"
  );

}]);
