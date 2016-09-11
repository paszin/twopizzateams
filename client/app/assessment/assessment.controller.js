'use strict';

angular.module('perfectteamApp')
  .controller('AssessmentCtrl', function ($scope, $stateParams, $http, $location, Auth, User) {

    //$scope.done = true;
    $scope.location = $location;

    Traitify.setPublicKey("g6i16p2618i8iurgm981bfvnmh");
      Traitify.setHost("https://api.traitify.com");
      Traitify.setVersion("v1");

    $scope.user = {};
    $scope.user = User.get();
    if ($stateParams.demo) {
      console.log("using devmode");
      Traitify.setEnvironment("development"); //awesome hack!!!
    }
    setTimeout(function () {

        console.log("Assessment Id is", $scope.user.assessmentId);
        var assessmentId = $scope.user.assessmentId || "85b5b3d3-fd77-4ca1-bcbc-61c39184e72f" || "cafcab6f-c4db-4780-87d1-12d848efbca7";
        var traitify = Traitify.ui.load(assessmentId, ".assessment");
        traitify.slideDeck.onFinished(function() {
          $scope.done = true;
          getAssessment(assessmentId, saveAssessment);
        });
    }, 100);
    function getAssessment(aid, callback) {
    var url = "https://api.traitify.com/v1/assessments/asid?data=blend,types,traits"
    $http.get(url.replace("asid", aid),
      {headers: {"Authorization": "Basic g6i16p2618i8iurgm981bfvnmh:x"}}).success(function(data) {
      callback(data);
    });
  }

    function saveAssessment(assessment) {
      if ($scope.user._id) {
        $http.put("/api/users/" + $scope.user._id, {assessment: assessment});
      }
    }




  });
