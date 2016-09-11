'use strict';

angular.module('perfectteamApp')
  .controller('AssessmentCtrl', function ($scope, $stateParams, $http, $location, Auth) {

    //$scope.done = true;
    $scope.location = $location;
    var user = Auth.getCurrentUser();
    if (!user) {
      console.log("please login");
    }
    function getAssessment(aid, callback) {
    var url = "https://api.traitify.com/v1/assessments/asid?data=blend,types,traits"
    $http.get(url.replace("asid", aid),
      {headers: {"Authorization": "Basic g6i16p2618i8iurgm981bfvnmh:x"}}).success(function(data) {
      callback(data);
    });
  }

    function saveAssessment(assessment) {
      $http.put("/api/users/" + user._id, {assessment: assessment});
    }

    Traitify.setPublicKey("g6i16p2618i8iurgm981bfvnmh");
      Traitify.setHost("https://api.traitify.com");
      Traitify.setVersion("v1");
      if ($stateParams.demo) {
        console.log("using devmode");
        Traitify.setEnvironment("development"); //awesome hack!!!
      }
      console.log("Assessment Id is", user.assessmentId);
      var assessmentId = user.assessmentId;
      var traitify = Traitify.ui.load(assessmentId, ".assessment");
      traitify.slideDeck.onFinished(function() {
        $scope.done = true;
        getAssessment(assessmentId, saveAssessment);
      });


  });
