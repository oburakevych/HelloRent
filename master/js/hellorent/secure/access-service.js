//Access service
helloRentApp.factory('accessService', ['$rootScope', '$log', 'firebaseReference', '$firebaseAuth', '$firebase',
  function($rootScope, $log, firebaseReference, $firebaseAuth, $firebase) {

    function getAuth() {
      if (!$rootScope.auth) {
        $log.debug("initializing auth");
        $rootScope.auth = $firebaseAuth(firebaseReference);

        $rootScope.auth.$onAuth(function(authData) {
          if (authData) {
            $log.debug("Logged in as:", authData.uid);
            $rootScope.authUser = $firebase(firebaseReference
                                              .child("users")
                                              .child(authData.uid)
                                              ).$asObject();
          } else {
            $log.debug("Unauthenticated");
            $rootScope.authUser = null; // clear up on logout

            if (!$rootScope.$state.includes("secure") {
              // Getting errors from the base.js on the login when using $state.go("secure.login")
              // Not sure what is wrong, seems like some data is not cleaned up correctly
              window.location.href = "/";
              //$rootScope.$state.go("secure.login", null, {reload: true});
            }
          }
        });
      }

      return $rootScope.auth;
    }

    return {
      // Authenticates current session (via cookie), 
      // Sets $rootScope.authUser, all synchronously, returns void
      authenticate: function() { 
        $log.debug("authenticate");

        var auth = getAuth().$getAuth(); // actual authentication

        if (!auth) {
          $rootScope.$state.go("secure/login");
        }

        return auth;
      },
      // Loggs in an existing user and returns a promice
      login: function(provider, credentials) {  
        $log.debug("login with " + provider);
        
        var promise;
        switch(provider) {
          case "password": 
            if (credentials.email && credentials.password) {
              promise = getAuth().$authWithPassword(credentials);
            }
            break;
          case "facebook": 
            promise = getAuth().$authWithOAuthRedirect("facebook");
            break;
          default:
            promise = getAuth().$authWithOAuthRedirect(provider);
        }
        
        return promise;
      },
      // Unauthenticates current Firebase client, returns void
      logout: function() {
        $log.debug("logout");

        getAuth().$unauth();
      },
      // Registers a new user and returns a promice
      register: function(account) { 
        $log.debug("register");

        return getAuth().$createUser(account.email, account.password);
      },
      // Sends reset password email and returns a promise
      sendResetPasswordEmail: function(email) {
        $log.debug("Send reset password email" + email);
        return getAuth().$sendPasswordResetEmail(email);
      },
      changePassword: function(email, oldPassword, newPassword) {
        $log.warn("Changing password for user " + email);
        return getAuth().$changePassword(email, oldPassword, newPassword);
      }
    }
  }
]);