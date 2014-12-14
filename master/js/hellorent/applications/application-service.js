/**=========================================================
 * Services to find applications
 =========================================================*/
 
helloRentApp.service('applicationService', ['$firebase', 'firebaseReference', '$log', function($firebase, firebaseReference, $log) {
  return {
  	getAll: function(propertyId) {
  		$log.debug(propertyId);
  		return $firebase(firebaseReference
                .child("applications")
  							.child("properties")
  							.child(propertyId)
  							.child("users"))
  						.$asObject();
  	},
  	get: function(propertyId, tenantId, applicationId) {
  		$log.debug(propertyId);
      $log.debug(tenantId);
  		$log.debug(applicationId);
  		return $firebase(firebaseReference
                .child("applications")
                .child("properties")
                .child(propertyId)
                .child("users")
                .child(tenantId)
  							.child(applicationId))
  						.$asObject();
  	},
    getAllForTenant: function(propertyId, tenantId) {
      $log.debug(propertyId);
      $log.debug(tenantId);
      return $firebase(firebaseReference
                .child("applications")
                .child("properties")
                .child(propertyId)
                .child("users")
                .child(tenantId))
              .$asObject();
    }

  }
}]);