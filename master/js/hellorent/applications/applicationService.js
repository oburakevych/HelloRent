/**=========================================================
 * Module: application.js
 * Services to find applications
 =========================================================*/
 
helloRentApp.service('applicationService', ['$firebase', 'firebaseReference', function($firebase, firebaseReference) {
  var applications = $firebase(firebaseReference.child("applications"));
  
  return applications;
}]);