/**=========================================================
 * Module: firebaseReference.js
 * Factory that establishes connection to Firebase and returns firebase reference for the services
 =========================================================*/
 
helloRentApp.factory('firebaseReference', ['FIREBASE_URL', function(FIREBASE_URL) {
	return new Firebase(FIREBASE_URL);
}]);