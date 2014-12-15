/**=========================================================
 * Services to find properties
 =========================================================*/
 
helloRentApp.service('propertiesService', ['$firebase', 'firebaseReference', '$log', '$q',
				function($firebase, firebaseReference, $log, $q) {
	return {
		get: function(propertyId) {
			$log.debug(propertyId);
			return $firebase(firebaseReference
								.child("properties")
								.child(propertyId))
							.$asObject();
		},
		add: function(propertyId, property) {
			return $firebase(firebaseReference.child("properties"))
								.$set(propertyId, property);
		},
		// Generates next ID, inc the counter and returns a promise which resolves to the generated ID
		getNextId: function() {
			var deferred = $q.defer(); // Promise

			var counterRef = firebaseReference
							.child('counter')
							.child("currentCount");

			// increment the counter
			counterRef.transaction(
				function(currentValue) {
	        		return (currentValue || 0) + 1;
	    		}, function(error, committed, result) {
					if (error) {
						$log.warn("Cannot increment Property ID: " + error);
						deferred.reject(error);
					} else {
						// if counter update succeeds, then update the record
						$log.debug("Setting new value: " + result.val());
						deferred.resolve(result.val()); // Success	
					}
	    		}
	    	);

	    	return deferred.promise;
		}
  	}
}]);