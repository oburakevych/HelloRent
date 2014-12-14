/**=========================================================
 * Services to find properties
 =========================================================*/
 
helloRentApp.service('propertiesService', ['$firebase', 'firebaseReference', '$log', function($firebase, firebaseReference, $log) {
  return {
  	get: function(propertyId) {
  		$log.debug(propertyId);
  		return $firebase(firebaseReference
  							.child("properties")
  							.child(propertyId))
  						.$asObject();
  	}
  }
}]);