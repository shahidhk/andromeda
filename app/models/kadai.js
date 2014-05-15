// The contents of individual model .js files will be concatenated into dist/models.js

(function() {

// Protects views where AngularJS is not loaded from errors
if ( typeof angular == 'undefined' ) {
	return;
};


var module = angular.module('KadaiModel', ['restangular']);

module.factory('KadaiRestangular', function(Restangular) {

  return Restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl('http://192.168.2.6:1234/api');
    // RestangularConfigurer.setRequestSuffix('.json');
    RestangularConfigurer.setRestangularFields({
      id: "pk"
    });
    // delete $httpProvider.defaults.headers.common['X-Requested-With']

  });

});


})();
