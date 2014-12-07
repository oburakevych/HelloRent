/**=========================================================
 * Module: application.js
 * Services to find applications
 =========================================================*/
 
helloRentApp.service('applicationService', ['$firebase', 'firebaseReference', '$log', function($firebase, firebaseReference, $log) {
  return {
  	getAll: function(propertyId) {
  		$log.debug(propertyId);
  		return $firebase(firebaseReference
  							.child("properties")
  							.child(propertyId)
  							.child("applications"))
  						.$asObject();
  	},
  	get: function(propertyId, tenantId, applicationId) {
  		$log.debug(propertyId);
  		$log.debug(applicationId);
  		return $firebase(firebaseReference
  							.child("properties")
  							.child(propertyId)
  							.child("applications")
  							.child(tenantId)
  							.child(applicationId))
  						.$asObject();
  	}

  }
}]);