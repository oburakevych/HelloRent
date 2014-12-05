//Access service
helloRentApp.factory('accessService', ['$rootScope', '$state', '$log', 'firebaseReference', '$firebaseAuth', '$firebase',
  function($rootScope, $state, $log, firebaseReference, $firebaseAuth, $firebase) {
    console.log("accessService");

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

            if (!$rootScope.$state.is("secure.login") && !$rootScope.$state.is("secure.register")) {
              $rootScope.$state.go("secure.login");
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
      }
    }
  }
]);