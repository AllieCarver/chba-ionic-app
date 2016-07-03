// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('CHBAapp', ['ionic','ngCordova', 'CHBAapp.controllers', 'CHBAapp.services', 'CHBAapp.directives'])

.run(function($ionicPlatform, $rootScope, Data) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    };
    
  });
  Data.get_members().success(function(data) {
         $rootScope.global_members = data;           
        });
        
  Data.get_events().success(function(data) {
         $rootScope.global_events = data;           
        });
  Data.get_advantages().success(function(data) {
         $rootScope.global_advantages = data;           
        })              
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("home", {
          url:"/home", 
          //This is the path you would update, relative to index.html
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'  
        })
        .state("search-detail", {
          url:"/search/:memberId", 
          //This is the path you would update, relative to index.html
          templateUrl: "templates/member-detail.html",
          controller: 'SearchDetailCtrl' 
        })
        .state("members", {
          url:"/members", 
          //This is the path you would update, relative to index.html
          templateUrl: "templates/members.html",
          controller: 'MembersCtrl' 
        })
        .state("members-detail", {
          url:"/members/:memberIndex", 
          //This is the path you would update, relative to index.html
          templateUrl: "templates/member-detail.html",
          controller: 'MembersDetailCtrl' 
        })
        .state("advantages", {
          url:"/advantages", 
          //This is the path you would update, relative to index.html
          templateUrl: "templates/advantages.html",
          controller: 'AdvantagesCtrl' 
        })
        .state("advantage-detail", {
          url:"/advantages/:advantageIndex", 
          //This is the path you would update, relative to index.html
          templateUrl: "templates/advantage-detail.html",
          controller: 'AdvantageDetailCtrl' 
        })
        .state("events", {
          url:"/events", 
          //This is the path you would update, relative to index.html
          templateUrl: "templates/events.html",
          controller: 'EventsCtrl' 
        })
        .state("event-detail", {
          url:"/events/:eventIndex", 
          //This is the path you would update, relative to index.html
          templateUrl: "templates/event-detail.html",
          controller: 'EventDetailCtrl' 
        })
        .state("contact", {
          url:"/contact", 
          //This is the path you would update, relative to index.html
          templateUrl: "templates/contact.html",
          controller: 'ContactCtrl' 
        })
    $urlRouterProvider.otherwise("/home");
}]);

