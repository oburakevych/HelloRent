//Access service
helloRentApp.factory('accessService', ['$rootScope', '$state', '$log', 'firebaseReference', '$firebaseAuth', '$firebase',
  function($rootScope, $state, $log, firebaseReference, $firebaseAuth, $firebase) {
    console.log("accessService");
    return {
      // Authenticates current session (via cookie), 
      // Sets $rootScope.authUser, all synchronously, returns void
      authenticate: function() { 
        $log.debug("authenticate");
        if (!$rootScope.auth) {
          $rootScope.auth = $firebaseAuth(firebaseReference);
        }

        $rootScope.auth.$onAuth(function(authData) {
          if (authData) {
            $log.debug("Logged in as:", authData.uid);
            $rootScope.authUser = $firebase(firebaseReference
                                              .child("users")
                                              .child(authData.uid)
                                              ).$asObject();
          } else {
            $log.debug("Unauthenticated");
            $rootScope.authUser = {}; // clear up on logout
          }
        });

        var authUserObj = $rootScope.auth.$getAuth(); // actual authentication
        // redirect to the login page if unsuccessfull
        if (!authUserObj) {
          $state.go('secure/login');
        }
      },
      // Loggs in an existing user and returns a promice
      login: function(credentials) {  
        $log.debug("login");

        if (!$rootScope.auth) {
          $rootScope.auth = $firebaseAuth(firebaseReference);
        }

        if (credentials.email && credentials.password) {
          return $rootScope.auth.$authWithPassword(credentials);
        }
      },
      // Unauthenticates current Firebase client, returns void
      logout: function() {
        $log.debug("logout");
          if (!$rootScope.auth) {
            $rootScope.auth = $firebaseAuth(firebaseReference);
          }

          $rootScope.auth.$unauth();
      },
      // Registers a new user and returns a promice
      register: function(account) { 
        $log.debug("register");
        if (!$rootScope.auth) {
          $rootScope.auth = $firebaseAuth(firebaseReference);
        }

        return $rootScope.auth.$createUser(account.email, account.password);
      }
    }
  }
]);