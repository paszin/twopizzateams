'use strict';

angular.module('perfectteamApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, socket, issueDialog, githubdata) {

    $scope.showIssueDialog = function(issue) {
      if (event.target.type == "button" || event.target.id == "magicbutton") {
        console.log("find a match");
        return;
      }
      console.log(event.target, event.currentTarget);
      issueDialog.show(issue);
    };

    $http.get('/api/users').success(function(users) {
      $scope.userArray = users;
      $rootScope.userLookup = {};
      users.forEach(function(user) {
        $rootScope.userLookup[user.name] = user;
      });
      getIssues();
    });
    //
    function randomizeUser(user) {
      user = JSON.parse(JSON.stringify(user));
      if (_.random(0, 1, true) > 0.6) {
        user.isMissing = true;
        return user;
      }
      var names = ["paszin", "y1y", "oveou", "Sweetymeow", "judithyueli"];
      user.login = names[_.random(0, names.length-1)];
      user.id = names.indexOf(user.login);
      return user;
    }

    function getFamousPerson(username) {
      return $rootScope.userLookup[username].assessment.personality_traits[0].personality_trait.personality_type.famous_people[0];
    }

    function getIssues() {
      var repo = "https://api.github.com/repos/paszin/drleeslab/issues";
      $http.get(repo).success(function(issues) {
        $scope.issues = issues; //githubdata
        //populate users
        var template = {"login": "paszin",
          "id": 9304382,
          "avatar_url": "https://avatars.githubusercontent.com/u/9304382?v=3",
          "isMissing": false
        };
        $scope.issues.forEach(function(issue) {
          var user1 = randomizeUser(template);
          var user2 = randomizeUser(template); //randomizeUser(template);
          issue.imagedescription = "It's like " + getFamousPerson(user1.login).name + " meets " + getFamousPerson(user2.login).name;
          issue.assignees = [user1, user2];
        });
    });
    }


    $scope.getColor = function($index) {
      return "darkBlue";
      var _d = ($index + 1) % 11;
      var bg = '';

      switch(_d) {
        case 1:       bg = 'darkgrey';         break;
        case 2:       bg = 'darkgrey';       break;
        case 3:       bg = 'darkgrey';    break;
        case 4:       bg = 'darkgrey';        break;
        case 5:       bg = 'yellow';      break;
        case 6:       bg = 'pink';        break;
        case 7:       bg = 'darkBlue';    break;
        case 8:       bg = 'purple';      break;
        case 9:       bg = 'deepBlue';    break;
        case 10:      bg = 'lightPurple'; break;
        default:      bg = 'yellow';      break;
      }

      return bg;
    };

    $scope.getSpan = function($index) {
      var _d = ($index + 1) % 11;

      if (_d === 1 || _d === 5) {
        return 2;
      }
    };


  });



      var app = angular.module("perfectteamApp");

      app.filter('highlight', function($sce) {
  return function(str, termsToHighlight) {
    // Sort terms by length
    termsToHighlight.sort(function(a, b) {
      return b.length - a.length;
    });
    // Regex to simultaneously replace terms
    var regex = new RegExp('(' + termsToHighlight.join('|') + ')', 'g');
    return $sce.trustAsHtml(str.replace(regex, '<span class="match">$&</span>'));
  };
});
