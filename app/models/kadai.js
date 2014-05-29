// The contents of individual model .js files will be concatenated into dist/models.js

(function() {

// Protects views where AngularJS is not loaded from errors
if ( typeof angular == 'undefined' ) {
	return;
};

var baseUrl = 'http://192.168.2.10:1234'

var module = angular.module('KadaiModel', ['restangular']);

module.factory('KadaiRestangular', function(Restangular) {

  return Restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl(baseUrl + '/api');
    // RestangularConfigurer.setRequestSuffix('.json');
    RestangularConfigurer.setRestangularFields({
      id: "pk"
    });
    // delete $httpProvider.defaults.headers.common['X-Requested-With']

  });

});


})();
