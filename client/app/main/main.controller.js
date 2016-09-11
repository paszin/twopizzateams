'use strict';

angular.module('perfectteamApp')
  .controller('MainCtrl', function ($scope, $http, socket) {



    $http.get('/api/users').success(function(users) {
      $scope.userArray = users;
      $scope.userLookup = {};
      users.forEach(function(user) {
        $scope.userLookup[user.name] = user;
      });
    });
    //
    function randomizeUser(user) {
      user = JSON.parse(JSON.stringify(user));
      if (_.random(0, 1, true) > 0.6) {
        user.isMissing = true;
        return user;
      }
      var names = ["paszin", "Daniel", "Linda", "Natalia", "Shailesh", "Wendy"];
      user.login = names[_.random(0, names.length-1)];
      user.id = names.indexOf(user.login);
      return user;
    }

    $http.get('https://api.github.com/repos/paszin/soundcloudfire/issues').success(function(issues) {
      $scope.issues = issues;
      //populate users
      var template = {"login": "paszin",
        "id": 9304382,
        "avatar_url": "https://avatars.githubusercontent.com/u/9304382?v=3",
        "isMissing": false
      };
      $scope.issues.forEach(function(issue) {
        var user1 = randomizeUser(template);
        var user2 = randomizeUser(template); //randomizeUser(template);
        issue.assignees = [user1, user2];
        //debugger;
      });
  });

    $scope.getColor = function($index) {
      var _d = ($index + 1) % 11;
      var bg = '';

      switch(_d) {
        case 1:       bg = 'grey';         break;
        case 2:       bg = 'grey25';       break;
        case 3:       bg = 'grey50';    break;
        case 4:       bg = 'grey75';        break;
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

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
