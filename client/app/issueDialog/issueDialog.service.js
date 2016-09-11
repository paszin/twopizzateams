'use strict';

angular.module('perfectteamApp')
  .service('issueDialog', issueDialog);


function issueDialog($log, $mdDialog, $mdMedia) {

      this.show = function (issue) {

          var useFullScreen = true //($mdMedia("sm") || $mdMedia("xs"));
          $mdDialog.show({
              controller: IssueDialogController,
              locals: {
                  issue: issue
              },
              templateUrl: "app/issueDialog/issueDialog.html",
              parent: angular.element(document.body),
              //targetEvent: ev,
              clickOutsideToClose: true,
              fullscreen: useFullScreen
          });
      };

}



  function IssueDialogController($scope, $rootScope, $mdDialog, $http, $sce, issue, User) {
      $scope.issue = issue;
      if ($scope.issue.assignees.length >= 2) {
        $scope.user1 = $rootScope.userLookup[$scope.issue.assignees[0].login];
        $scope.user1.avatar_url = $scope.issue.assignees[0].avatar_url;
        $scope.user1.login = $scope.issue.assignees[0].login;
        if ($scope.user1 == undefined) {
          console.log("no user found 1");
        }
        //$scope.user2 = _.merge($scope.issue.assignees[1], $rootScope.userLookup[$scope.issue.assignees[1]]);
        $scope.user2 = $rootScope.userLookup[$scope.issue.assignees[1].login];
        $scope.user2.avatar_url = $scope.issue.assignees[1].avatar_url;
        $scope.user2.login = $scope.issue.assignees[1].login;
        //$scope.user2.avatar_url = $scope.issue.assignees[1].avatar_url;
        if ($scope.user2 == undefined) {
          console.log("no user found 2");
        }
      }

      function getFamousPerson(username) {
        return $rootScope.userLookup[username].assessment.personality_traits[0].personality_trait.personality_type.famous_people[0];
      }

      if ($scope.user1.login && $scope.user2.login) {
        issue.imagedescription = " is like " + getFamousPerson($scope.user1.login).name + " meets " + getFamousPerson($scope.user2.login).name;
      }

      console.log($scope.user1.assessmentId);
      Traitify.setPublicKey("g6i16p2618i8iurgm981bfvnmh");
        Traitify.setHost("https://api.traitify.com");
        Traitify.setVersion("v1");
        setTimeout(function () {
          var traitify = Traitify.ui.load("personalityTraits", $scope.user1.assessmentId, ".traitify-widget1"); // Example selector for widget target
        traitify.onInitialize(function(){
            console.log(traitify.data.get("PersonalityTraits"));
            console.log("Initialized!");
        });
      }, 1000);
      setTimeout(function () {
        var traitify = Traitify.ui.load("personalityTraits", $scope.user2.assessmentId, ".traitify-widget2"); // Example selector for widget target
      traitify.onInitialize(function(){
          console.log(traitify.data.get("PersonalityTraits"));
          console.log("Initialized!");
      });
    }, 1000);



      function removeSomeTraits() {}


      $scope.showPersonDetails = function (person) {

          person.showMore =! person.showMore;

          User.getById({id: person._id},
                       function(data) {
                          person.profile = data;
                      }
                  );
      };

      $scope.hide = function () {
          $mdDialog.hide();
      };
      $scope.cancel = function () {
          $mdDialog.cancel();
      };
      $scope.answer = function () {
      };
  }
