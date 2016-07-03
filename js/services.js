angular.module('CHBAapp.services', [])

.factory('Data', function($http,$rootScope) {
  
  return {
    get_members: function() {

        return $http.get("http://www.chba-pei.ca/scrubbed?action=members");
    },
    get_detail: function(memberIndex) {
        return $rootScope.global_members[parseInt(memberIndex)];
    },
    search_detail: function(memberId) {
        for (var i = 0; i < $rootScope.global_members.length; i++) {
            if ($rootScope.global_members[i].member_id === memberId) {
                return $rootScope.global_members[i];
        }
      }
    },
    get_events: function() {

        return $http.get("http://www.chba-pei.ca/scrubbed?action=events");
    },
    event_detail: function(eventIndex) {
          return $rootScope.global_events[parseInt(eventIndex)];
    },
    get_advantages: function() {

        return $http.get("http://www.chba-pei.ca/scrubbed?action=advantages");
    },
    advantage_detail: function(advantageIndex) {
          return $rootScope.global_advantages[parseInt(advantageIndex)];
    },
    send_feedback: function(data){     
        return $http.post("http://www.chba-pei.ca/scrubbed",data);
     },
    search_members: function(data){
        return $http.post("http://www.chba-pei.ca/scrubbed",data);
     }

   
  };
});

