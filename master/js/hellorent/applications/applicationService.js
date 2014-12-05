/**=========================================================
 * Module: application.js
 * Services to find applications
 =========================================================*/
 
helloRentApp.service('applicationService', ['$firebase', 'firebaseReference', '$log', function($firebase, firebaseReference, $log) {
  return {
  	get: function(propertyId) {
  		$log.debug(propertyId);
  		return $firebase(firebaseReference
  							.child("properties")
  							.child(propertyId)
  							.child("applications"))
  							.$asObject();
  	}
  }
}]);