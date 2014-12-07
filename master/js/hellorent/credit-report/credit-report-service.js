helloRentApp.factory('CreditReportService', ['$resource', function($resource) {
	return $resource('app/data/credit-report.json');
}]);