/*!
 * 
 * HelloRent - Platform for Self Managing Landlords
 * 
 * Based on template from website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }


// APP START
// ----------------------------------- 

var App = angular.module('angle', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'cfp.loadingBar'])
          .run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
              // Set reference to access them from any scope
              $rootScope.$state = $state;
              $rootScope.$stateParams = $stateParams;
              $rootScope.$storage = $window.localStorage;

              // Uncomment this to disables template cache
              /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                  if (typeof(toState) !== 'undefined'){
                    $templateCache.remove(toState.templateUrl);
                  }
              });*/

              $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
                // Catch the error thrown when the $requireAuth promise is rejected
                // and redirect the user back to the login page
                if (error === "AUTH_REQUIRED") {
                  $rootScope.$state.go("secure.login");
                }
              });

              // Scope Globals
              // ----------------------------------- 
              $rootScope.app = {
                name: 'HelloRent',
                description: 'Platform for Self Managing Landlords',
                year: ((new Date()).getFullYear()),
                layout: {
                  isFixed: true,
                  isCollapsed: false,
                  isBoxed: false,
                  isRTL: false
                },
                viewAnimation: 'ng-fadeInUp'
              };
            }
          ]);
