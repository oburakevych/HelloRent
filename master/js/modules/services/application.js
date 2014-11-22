/**=========================================================
 * Module: application.js
 * Services to find applications
 =========================================================*/
 
App.service('application', function() {
  var applications = {
      "657890860" : {
        "DOB" : "11/11/88",
        "addresses" : [ {
          "line1" : "256 flinders street",
          "postCode" : 9999,
          "type" : "current"
        } ],
        "criminalOffences" : {
          "criminalOffence" : "yes",
          "details" : "killed a guy"
        },
        "email" : "oburakevych@gmail.com",
        "employmentDetails" : {
          "isEmployed" : true,
          "position": "junior developer"
        },
        "bankruptcy" : {
          "hasFiledBankruptcy": false
        },
        "firstName" : "Alex",
        "gender" : "m",
        "identity" : {
          "passportNumber" : 456789
        },
        "lastName" : "Last",
        "image": "app/img/user/08.jpg",
        "pets" : "no",
        "phone" : "098765431",
        "references" : [ {
          "name" : "mr smith",
          "relationship" : "manager"
        } ],
        "refusedRent" : "no",
        "smoker" : "yes",
        "social": {
          "facebook" : "facebook_username"
        }
      },
      "757890860" : {
        "DOB" : "11/11/88",
        "addresses" : [ {
          "line1" : "252 flinders street",
          "postCode" : 9999,
          "type" : "current"
        } ],
        "criminalOffences" : {
          "criminalOffence" : "yes",
          "details" : "killed a guy"
        },
        "email" : "oburakevych@gmail.com",
        "employmentDetails" : {
          "isEmployed" : false
        },
        "bankruptcy" : {
          "hasFiledBankruptcy": false
        },
        "firstName" : "Marcy",
        "gender" : "m",
        "identity" : {
          "passportNumber" : 456789
        },
        "lastName" : "Last",
        "image": "app/img/user/09.jpg",
        "pets" : "no",
        "phone" : "098765431",
        "references" : [ {
          "name" : "mrs smith",
          "relationship" : "manager"
        } ],
        "refusedRent" : "no",
        "smoker" : "no",
        "social": {
          "facebook" : "facebook_username"
        }
      }
    };
  return application;
});