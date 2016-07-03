angular.module('CHBAapp.controllers', [])

.controller('HomeCtrl', function($scope, $rootScope, Data, $ionicModal, $window, $cordovaKeyboard, $ionicPlatform) {
    $scope.call_member = function (number) {
        $window.location.href = 'tel:'+number;
        }
       $scope.searchtext = {};
        $scope.search = function () {
            Data.search_members({
        'action':'search',
        'apikey':'scrubbed',  
        'query': $scope.searchtext.text,

    }).
  success(function(data) {
    $scope.searchtext.members = data;
    $rootScope.global_search_results = $scope.searchtext.members;
    $scope.openModal();
    
$ionicPlatform.ready(function() {
  $cordovaKeyboard.close();
});
  });      
        };
        
    $ionicModal.fromTemplateUrl('templates/search-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$goaway', function() {
   //$scope.modal.hide();
   $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });        

        
    })
.controller('SearchDetailCtrl', function($scope, $rootScope, $stateParams, Data, $window) {
    $scope.selected_member = {};     
    $scope.call_member = function (number) {
        $window.location.href = 'tel:'+number;
        }
    $scope.selected_member = Data.search_detail($stateParams.memberId);
    if($scope.selected_member.website === "") {
        $scope.selected_member.website = "http://chba-pei.ca/";
        };
    $rootScope.$broadcast('$goaway');  
    })   
.controller('MembersCtrl', function($scope, $rootScope, Data, $window) {
    $scope.call_member = function (number) {
        $window.location.href = 'tel:'+number;
        }
    $scope.members = $rootScope.global_members;     
   
         for (i = 0, len = $scope.members.length; i < len; i++) {
    if($scope.members[i]["image_file"] == ""){
        $scope.members[i]["image_file"] = "no_image.jpg"
        }}
           
    })
.controller('MembersDetailCtrl', function($scope, $rootScope, $stateParams, Data, $window) {
    $scope.selected_member = {};     
    $scope.call_member = function (number) {
        $window.location.href = 'tel:'+number;
        }
    $scope.selected_member = Data.get_detail($stateParams.memberIndex);
    if($scope.selected_member.website === "") {
        $scope.selected_member.website = "http://chba-pei.ca/";
        };
    $rootScope.$broadcast('$goaway');  
    })    
.controller('AdvantagesCtrl', function($scope, $rootScope, Data,  $ionicPopover) {
         $scope.advantages = $rootScope.global_advantages;
     $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event,adv_index) {
    $scope.selected_advantage = $scope.advantages[parseInt(adv_index)];
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });          
    })
.controller('AdvantageDetailCtrl', function($scope, $stateParams, Data, $window) {
    $scope.selected_advantage = Data.advantage_detail($stateParams.advantageIndex);     
    })       
.controller('EventsCtrl', function($scope, $rootScope, Data) {
    $scope.events = $rootScope.global_events;    
    })
.controller('EventDetailCtrl', function($scope, $stateParams, Data, $window, $cordovaCalendar, $ionicPopup) {
    $scope.call_member = function (number) {
        $window.location.href = 'tel:'+number;
        }
    $scope.selected_event = Data.event_detail($stateParams.eventIndex);
    $scope.add_reminder = function () {
        var calOptions = {
    firstReminderMinutes: 1440,
    secondReminderMinutes: 60,
    recurrence: null, // options are: 'daily', 'weekly', 'monthly', 'yearly'
    recurrenceEndDate: null,
    calendarName: null,
    calendarId: null,
    url: ""
  };
        $cordovaCalendar.createEventWithOptions({
            title: $scope.selected_event.name,
            location: $scope.selected_event.location,
            notes: $scope.selected_event.description,
            startDate: new Date($scope.selected_event.date_of+' '+$scope.selected_event.time_start),
            endDate: new Date($scope.selected_event.date_of+' '+$scope.selected_event.time_end),
            firstReminderMinutes: 1440,
            secondReminderMinutes: 60,
            url: ""
          }).then(function (result) {

               var alertPopup = $ionicPopup.alert({
                 title:'Notification',
                 template: 'Event Added to Calendar'
               });

          }, function (err) {
            // error
          });        
        }
         
    })  
    
.controller('ContactCtrl', function($scope, Data, $ionicPopup) {
     $scope.contact = {};
        $scope.send = function () {
            Data.send_feedback({
        'action':'contact',
        'apikey':'scrubbed',  
        'customer': $scope.contact.name,
        'customeremail': $scope.contact.email,
        'customerphone': $scope.contact.phone,
        'message': $scope.contact.message
    }).
  success(function(data) {
     var alertPopup = $ionicPopup.alert({
                 title:'Notification',
                 template: "Your feedback has been sent"
               }); 

  })
      
        }
    })



