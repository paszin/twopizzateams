'use strict';

angular.module('perfectteamApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, socket, issueDialog, Auth, User, githubdata, ghsubscribers) {

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.currentUser = User.get();

    $scope.showIssueDialog = function(issue) {
      if (event.target.type == "button" || event.target.id == "magicbutton" || event.target.className.indexOf("noclick") > -1) {
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

    function extractUser(user) {

    }



    function getSubscribers() {
      $http.get("https://api.github.com/repos/paszin/drleeslab/subscribers").success(function(subscribers) {
        $scope.subscribers = subscribers;
    }).error(function(err) {
      $scope.subscribers = ghsubscribers;
    });
  }

    getSubscribers();

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
          console.log(issue.assignees);
          for (var i = issue.assignees.length; i < 2; i++) {
             issue.assignees[i] = {"isMissing": true};
           }

          //var user1 = randomizeUser(template);
          //var user2 = randomizeUser(template); //randomizeUser(template);
          //issue.imagedescription = "It's like " + getFamousPerson(user1.login).name + " meets " + getFamousPerson(user2.login).name;
          //issue.assignees = [user1, user2];
        });
    }).error(function(err) {
      console.log("are you offline?");
      $scope.issues = githubdata;
    });
    }

    $scope.suggestPartner = function(issue, i) {
      //choose person with least issues first, skip partner
      var first = issue.assignees[0];
      if (i == undefined) {
        i = 0;
      }
      i = i % $scope.subscribers.length;
      for (i; i < $scope.subscribers.length; i++) {
        if ($rootScope.userLookup[$scope.subscribers[i].login] && $scope.subscribers[i].login != first.login) {
          issue.assignees[1] = $scope.subscribers[i];
          issue.assignees[1].isSuggesting = true;
          issue.assignees[1].index = i;
          break;
        }
      }
    };

    $scope.acceptPartner = function(user) {
      user.isSuggesting = false;
    };

    $scope.getColor = function($index) {
      return "cool";
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
