helloRentApp.factory('countryService', ['$resource', function($resource) {
	return $resource('app/data/country-codes.json');
}]);