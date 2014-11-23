/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'APP_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, appRequires) {
  'use strict';

  App.controller = $controllerProvider.register;
  App.directive  = $compileProvider.directive;
  App.filter     = $filterProvider.register;
  App.factory    = $provide.factory;
  App.service    = $provide.service;
  App.constant   = $provide.constant;
  App.value      = $provide.value;

  // LAZY MODULES
  // ----------------------------------- 

  $ocLazyLoadProvider.config({
    debug: false,
    events: true,
    modules: appRequires.modules
  });



  App.applications = {
      "657890860" : {
        "DOB" : "10/02/82",
        "age": 32,
        "addresses" : [ {
          "line1" : "121/256 Flinders St",
          "postCode" : 3000,
          "type" : "current"
        } ],
        "criminalOffences" : {
          "criminalOffence" : "yes",
          "details" : "Parking ticket"
        },
        "email" : "oburakevych@gmail.com",
        "employmentDetails" : {
          "isEmployed" : "Yes",
          "position": "Junior developer"
        },
        "bankruptcy" : {
          "hasFiledBankruptcy": false
        },
        "firstName" : "Jane",
        "gender" : "f",
        "identity" : {
          "passportNumber" : 4456789
        },
        "lastName" : "Brown",
        "image": "app/img/user/09.jpg",
        "pets" : "no",
        "phone" : "098765431",
        "references" : [ {
          "name" : "Mr Smith",
          "relationship" : "manager"
        } ],
        "refusedRent" : "no",
        "smoker" : "yes",
        "social": {
          "facebook" : "facebook_username"
        },
        "creditScore": 587,
        "income": {
            "amount": 2000,
            "type": "week",
            "currency": "AUD" 
        }
      },
      "757890860" : {
        "DOB" : "11/11/78",
        "age": 36,
        "addresses" : [ {
          "line1" : "16 Ovens St",
          "postCode" : 3039,
          "type" : "current"
        } ],
        "criminalOffences" : {
          "criminalOffence" : "no",
          "details" : ""
        },
        "email" : "silvia@oxford.com",
        "employmentDetails" : {
          "isEmployed" : "Yes"
        },
        "bankruptcy" : {
          "hasFiledBankruptcy": false
        },
        "firstName" : "Silvia",
        "image": "app/img/user/08.jpg",
        "gender" : "f",
        "identity" : {
          "passportNumber" : 856781
        },
        "lastName" : "Crown",
        "pets" : "no",
        "phone" : "048715105",
        "references" : [ {
          "name" : "Mr Arnold Clone",
          "relationship" : "manager"
        } ],
        "refusedRent" : "no",
        "smoker" : "no",
        "social": {
          "facebook" : "facebook_username"
        },
        "creditScore": 882,
        "income": {
            "amount": 6900,
            "type": "month",
            "currency": "AUD" 
        }
      },
      "857892860" : {
        "DOB" : "14/08/82",
        "age": 32,
        "addresses" : [ {
          "line1" : "24 Hunters St",
          "postCode" : 3020,
          "type" : "current"
        } ],
        "criminalOffences" : {
          "criminalOffence" : "no",
          "details" : ""
        },
        "email" : "lindon.grey@gmail.com",
        "employmentDetails" : {
          "isEmployed" : "Yes",
          "position": "Student"
        },
        "bankruptcy" : {
          "hasFiledBankruptcy": false
        },
        "firstName" : "Lindon",
        "gender" : "m",
        "identity" : {
          "passportNumber" : 2653719
        },
        "lastName" : "Grey",
        "image": "app/img/user/10.jpg",
        "pets" : "no",
        "phone" : "046665431",
        "references" : [ {
          "name" : "Mr Alex Lee",
          "relationship" : "manager"
        } ],
        "refusedRent" : "no",
        "smoker" : "yes",
        "social": {
          "facebook" : "facebook_username"
        },
        "creditScore": 764,
        "income": {
            "amount": 5880,
            "type": "month",
            "currency": "AUD" 
        }
      },
    };

    App.creditReport = {
        BELOW_AVERAGE : {
            title: "Below Average",
            min: 0,
            max: 509,
            cssClass: "panel-danger",
            description: "Below Average credit score means this tenant is in the bottom 20% of credit-active population, suggesting it's MORE LIKELY that he/she will incur an adverse event such as a default, bankruptcy or court judgment in the next 12 months."
        },        
        AVERAGE : {
            title: "Average",
            min: 510,
            max: 621,
            cssClass: "panel-warning",
            description: "Average credit score suggests it's LIKELY thit tenant will incur an adverse event such as a default, bankruptcy or court judgment in the next 12 months."
        },
        GOOD : {
            title: "Good",
            min: 622,
            max: 725,
            cssClass: "panel-success",
            description: "Good credit score suggests it's LESS LIKELY this tenant will incur an adverse event that could harm his/her credit report in the next 12 months. Tenant's odds of keeping a clean credit report over this period are better than average credit-active population."
        },
        VERY_GOOD : {
            title: "Very good",
            min: 726,
            max: 832,
            cssClass: "panel-success",
            description: "Very good credit score suggests it's UNLIKELY that this tenant will incur an adverse event in the next 12 months that could harm his/her credit report. Tenant's odds of keeping a clean credit report are 2 times better than average credit-active population."
        },
        EXCELLENT : {
            title: "Excellent",
            min: 833,
            max: 100000,
            cssClass: "panel-primary",
            description: "Excellent credit score means this tenant is in the top 20% of credit-active population, suggesting it’s HIGHLY UNLIKELY that an adverse event could harm his/her credit report in the next 12 months. Tenant's odds of keeping a clean file are 5 times better than average population."
        },
    }

  // defaults to dashboard
  $urlRouterProvider.otherwise('/app/applications');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: basepath('app.html'),
        controller: 'AppController',
        resolve: resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'csspiner', 'firebase')
    })
    .state('app.dashboard', {
        url: '/applications',
        title: 'Applications',
        templateUrl: basepath('applications.html'),
        resolve: resolveFor('flot-chart','flot-chart-plugins', 'firebase'),
        controller: 'ApplicationsController'
    })
    .state('app.view-application', {
        url: '/applications/:id',
        title: 'Application',
        templateUrl: basepath('application.html'),
        resolve: resolveFor('flot-chart','flot-chart-plugins'),
        controller: 'ApplicationController'
    })
    .state('app.widgets', {
        url: '/widgets',
        title: 'Widgets',
        templateUrl: basepath('widgets.html'),
        controller: 'NullController',
        resolve: resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'google-map')
    })
    .state('app.buttons', {
        url: '/buttons',
        title: 'Buttons',
        templateUrl: basepath('buttons.html'),
        controller: 'NullController'
    })
    .state('app.colors', {
        url: '/colors',
        title: 'Colors',
        templateUrl: basepath('colors.html'),
        controller: 'NullController'
    })
    .state('app.notifications', {
        url: '/notifications',
        title: 'Notifications',
        templateUrl: basepath('notifications.html'),
        controller: 'NotificationController'
    })
    .state('app.interaction', {
        url: '/interaction',
        title: 'Interaction',
        templateUrl: basepath('interaction.html'),
        controller: 'NullController'
    })
    .state('app.spinners', {
        url: '/spinners',
        title: 'Spinners',
        templateUrl: basepath('spinners.html'),
        controller: 'NullController'
    })
    .state('app.animations', {
        url: '/animations',
        title: 'Animations',
        templateUrl: basepath('animations.html'),
        controller: 'NullController'
    })
    .state('app.dropdown-animations', {
        url: '/dropdown-animations',
        title: 'Dropdown Animations',
        templateUrl: basepath('dropdown-animations.html'),
        controller: 'NullController'
    })
    .state('app.panels', {
        url: '/panels',
        title: 'Panels',
        templateUrl: basepath('panels.html'),
        controller: 'NullController'
    })
    .state('app.portlets', {
        url: '/portlets',
        title: 'Portlets',
        templateUrl: basepath('portlets.html'),
        controller: 'NullController',
        resolve: resolveFor('jquery-ui')
    })
    .state('app.maps-google', {
        url: '/maps-google',
        title: 'Maps Google',
        templateUrl: basepath('maps-google.html'),
        controller: 'NullController',
        resolve: resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'google-map')
    })
    .state('app.maps-vector', {
        url: '/maps-vector',
        title: 'Maps Vector',
        templateUrl: basepath('maps-vector.html'),
        controller: 'VectorMapController',
        resolve: resolveFor('vector-map')
    })
    .state('app.grid', {
        url: '/grid',
        title: 'Grid',
        templateUrl: basepath('grid.html'),
        controller: 'NullController'
    })
    .state('app.grid-masonry', {
        url: '/grid-masonry',
        title: 'Grid Masonry',
        templateUrl: basepath('grid-masonry.html'),
        controller: 'NullController'
    })
    .state('app.typo', {
        url: '/typo',
        title: 'Typo',
        templateUrl: basepath('typo.html'),
        controller: 'NullController'
    })
    .state('app.icons-font', {
        url: '/icons-font',
        title: 'Icons Font',
        templateUrl: basepath('icons-font.html'),
        controller: 'NullController'
    })
    .state('app.icons-weather', {
        url: '/icons-weather',
        title: 'Icons Weather',
        templateUrl: basepath('icons-weather.html'),
        controller: 'NullController'
    })
    .state('app.form-standard', {
        url: '/form-standard',
        title: 'Form Standard',
        templateUrl: basepath('form-standard.html'),
        controller: 'NullController'
    })
    .state('app.form-extended', {
        url: '/form-extended',
        title: 'Form Extended',
        templateUrl: basepath('form-extended.html'),
        controller: 'NullController',
        resolve: resolveFor('codemirror', 'codemirror-plugins', 'moment', 'taginput','inputmask','chosen', 'slider', 'ngWig', 'filestyle')
    })
    .state('app.form-validation', {
        url: '/form-validation',
        title: 'Form Validation',
        templateUrl: basepath('form-validation.html'),
        controller: 'NullController',
        resolve: resolveFor('parsley')
    })
    .state('app.form-wizard', {
        url: '/form-wizard',
        title: 'Form Wizard',
        templateUrl: basepath('form-wizard.html'),
        controller: 'NullController',
        resolve: resolveFor('bwizard')
    })
    .state('app.form-upload', {
        url: '/form-upload',
        title: 'Form upload',
        templateUrl: basepath('form-upload.html'),
        controller: 'NullController',
        resolve: resolveFor('filestyle')
    })
    .state('app.chart-flot', {
        url: '/chart-flot',
        title: 'Chart Flot',
        templateUrl: basepath('chart-flot.html'),
        controller: 'NullController',
        resolve: resolveFor('flot-chart','flot-chart-plugins')
    })
    .state('app.chart-radial', {
        url: '/chart-radial',
        title: 'Chart Radial',
        templateUrl: basepath('chart-radial.html'),
        controller: 'NullController',
        resolve: resolveFor('classyloader')
    })
    .state('app.table-standard', {
        url: '/table-standard',
        title: 'Table Standard',
        templateUrl: basepath('table-standard.html'),
        controller: 'NullController'
    })
    .state('app.table-extended', {
        url: '/table-extended',
        title: 'Table Extended',
        templateUrl: basepath('table-extended.html'),
        controller: 'NullController'
    })
    .state('app.table-datatable', {
        url: '/table-datatable',
        title: 'Table Datatable',
        templateUrl: basepath('table-datatable.html'),
        controller: 'NullController',
        resolve: resolveFor('datatables', 'datatables-pugins')
    })
    .state('app.timeline', {
        url: '/timeline',
        title: 'Timeline',
        templateUrl: basepath('timeline.html'),
        controller: 'NullController'
    })
    .state('app.calendar', {
        url: '/calendar',
        title: 'Calendar',
        templateUrl: basepath('calendar.html'),
        controller: 'NullController',
        resolve: resolveFor('jquery-ui', 'moment','fullcalendar')
    })
    .state('app.invoice', {
        url: '/invoice',
        title: 'Invoice',
        templateUrl: basepath('invoice.html'),
        controller: 'NullController'
    })
    .state('app.search', {
        url: '/search',
        title: 'Search',
        templateUrl: basepath('search.html'),
        controller: 'NullController',
        resolve: resolveFor('moment', 'chosen', 'slider')
    })
    .state('app.todo', {
        url: '/todo',
        title: 'Todo List',
        templateUrl: basepath('todo.html'),
        controller: 'TodoController'
    })
    .state('app.profile', {
        url: '/profile',
        title: 'Profile',
        templateUrl: basepath('profile.html'),
        controller: 'NullController',
        resolve: resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'google-map')
    })
    .state('app.template', {
        url: '/template',
        title: 'Blank Template',
        templateUrl: basepath('template.html'),
        controller: 'NullController'
    })
    .state('app.documentation', {
        url: '/documentation',
        title: 'Documentation',
        templateUrl: basepath('documentation.html'),
        controller: 'NullController',
        resolve: resolveFor('flatdoc')
    })
    // Mailbox
    // ----------------------------------- 
    .state('app.mailbox', {
        url: '/mailbox',
        title: 'Mailbox',
        abstract: true,
        templateUrl: basepath('mailbox.html'),
        controller: 'MailboxController'
    })
    .state('app.mailbox.inbox', {
        url: '/inbox',
        title: 'Mailbox',
        templateUrl: basepath('mailbox-inbox.html'),
        controller: 'NullController'
    })
    .state('app.mailbox.compose', {
        url: '/compose',
        title: 'Mailbox',
        templateUrl: basepath('mailbox-compose.html'),
        controller: 'NullController',
        resolve: resolveFor('ngWig')
    })
    .state('app.mailbox.view', {
        url: '/view',
        title: 'View mail',
        templateUrl: basepath('mailbox-view.html'),
        controller: 'NullController',
        resolve: resolveFor('ngWig')
    })
    // 
    // Single Page Routes
    // ----------------------------------- 
    .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        resolve: resolveFor('modernizr', 'icons', 'parsley')
    })
    .state('page.login', {
        url: '/login',
        title: "Login",
        templateUrl: 'app/pages/login.html'
    })
    .state('page.register', {
        url: '/register',
        title: "Register",
        templateUrl: 'app/pages/register.html'
    })
    .state('page.recover', {
        url: '/recover',
        title: "Recover",
        templateUrl: 'app/pages/recover.html'
    })
    .state('page.lock', {
        url: '/lock',
        title: "Lock",
        templateUrl: 'app/pages/lock.html'
    })
    // 
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // ----------------------------------- 
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;


    // Set here the base of the relative path
    // for all app views
    function basepath(uri) {
      return 'app/views/' + uri;
    }

    // Generates a resolve object by passing script names
    // previously configured in constant.APP_REQUIRES
    function resolveFor() {
      var _args = arguments;
      return {
        deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
          // Creates a promise chain for each argument
          var promise = $q.when(1); // empty promise
          for(var i=0, len=_args.length; i < len; i ++){
            promise = andThen(_args[i]);
          }
          return promise;

          // creates promise to chain dynamically
          function andThen(_arg) {
            // also support a function that returns a promise
            if(typeof _arg == 'function')
                return promise.then(_arg);
            else
                return promise.then(function() {
                  // if is a module, pass the name. If not, pass the array
                  var whatToLoad = getRequired(_arg);
                  // simple error check
                  if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                  // finally, return a promise
                  return $ocLL.load( whatToLoad );
                });
          }
          // check and returns required data
          // analyze module items with the form [name: '', files: []]
          // and also simple array of script files (for not angular js)
          function getRequired(name) {
            if (appRequires.modules)
                for(var m in appRequires.modules)
                    if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                        return appRequires.modules[m];
            return appRequires.scripts && appRequires.scripts[name];
          }

        }]};
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
