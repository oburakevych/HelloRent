/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'APP_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, appRequires) {
  'use strict';

  App.controller = $controllerProvider.register;
  App.directive  = $compileProvider.directive;
  App.filter     = $filterProvider.register;
  App.factory    = $provide.factory;
  App.service    = $provide.service;
  App.constant   = $provide.constant;
  App.value      = $provide.value;

  function authenticate() {
    return {
      authenticate: ['accessService', function(accessService) {
          return accessService.authenticate();
      }]
    }
  }

  // defaults to applications
  $urlRouterProvider.otherwise('/secure/login');

  $stateProvider
    // 
    // Secure/Auth Page Routes
    // ----------------------------------- 
    .state('secure', {
        url: '/secure',
        templateUrl: 'app/secure/secure.html'
    })
    .state('secure.login', {
        url: '/login',
        title: "Login",
        templateUrl: 'app/secure/login.html'
    })
    .state('secure.logout', {
        url: '/logout',
        title: "Logout",
        controller: 'LogoutController'
    })
    .state('secure.register', {
        url: '/register',
        title: "Register",
        templateUrl: 'app/secure/register.html'
    })
    .state('secure.reset', {
        url: '/reset',
        title: "Reset",
        templateUrl: 'app/secure/reset.html'
    })
    .state('secure.changePassword', {
        url: '/change-password',
        title: "Change Password",
        templateUrl: 'app/secure/change-password.html'
    })

    // 
    // Application Routes
    // -----------------------------------   
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: basepath('app.html'),
        controller: 'AppController',
        resolve: authenticate()
    })
    .state('app.properties', {
        url: '/properties',
        title: 'Properties',
        templateUrl: basepath('properties.html'),
        controller: 'PropertiesController'
    })
    .state('app.newproperty', {
        url: '/new',
        title: 'Add a Property',
        templateUrl: basepath('new-property.html'),
        controller: 'NewPropertyController'
    })
    .state('app.applications', {
        url: '/applications',
        title: 'Applications',
        templateUrl: basepath('applications.html'),
        controller: 'ApplicationsController'
    })
    .state('app.myapplications', {
        url: '/myapplications',
        title: 'My Applications',
        templateUrl: basepath('myapplications.html'),
        controller: 'MyApplicationsController'
    })
    .state('app.view-application', {
        url: '/tenants/:tenantId/applications/:applicationId',
        title: 'Application',
        templateUrl: basepath('application.html'),
        controller: 'ApplicationController'
    })
    .state('app.settings', {
        url: '/settings',
        title: 'Settings',
        templateUrl: basepath('settings.html'),
        controller: 'SettingsController'
    })
    ;

    // Set here the base of the relative path
    // for all app views
    function basepath(uri) {
      return 'app/views/' + uri;
    }

}]).config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
  }])
.controller('NullController', function() {});
