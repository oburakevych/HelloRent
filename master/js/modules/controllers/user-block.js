App.controller('UserBlockController', ['$scope', '$timeout', function($scope, $timeout) {
	$timeout(function() {
		$scope.userBlockVisible = true; // show user block with 1 second delay to allow loading the user
	}, 1000);
  
	$scope.$on('toggleUserBlock', function(event, args) {
    	$scope.userBlockVisible = ! $scope.userBlockVisible;
	});
}]);