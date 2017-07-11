'use strict';

app.controller('mainController', ['$scope', 'DataService', function($scope, DataService) {

    var today = new Date(),
        date = {},
        favoriteTeam = 'Blue Jays',
        tempFavorite = null,
        tempScores = [];

    $scope.maxDate = today;
    $scope.pickDate= today;


    $scope.laodScores = function(){
        console.log('Load Scores');
        date = {year:$scope.pickDate.getFullYear(),month:('0' + ($scope.pickDate.getMonth()+1)).slice(-2),day:('0' + $scope.pickDate.getDate()).slice(-2)};
        DataService.getScores(date).then(function(response){
            tempScores = response.data;
            if(tempScores.data.games.game && tempScores.data.games.game instanceof Array){
                for (var i = 0; tempScores.data.games.game.length > i; i++){
                    if(tempScores.data.games.game[i].home_team_name === favoriteTeam || tempScores.data.games.game[i].away_team_name === favoriteTeam){
                        tempFavorite = tempScores.data.games.game.splice(i,1);
                        tempScores.data.games.game.unshift(tempFavorite[0]);
                        break;
                    };
                };
            }else if(tempScores.data.games.game){
                tempScores.data.games.game = [ tempScores.data.games.game];
            }

            $scope.scores = tempScores;
        },function(error){

        });
    };

    $scope.laodScores();
}]);
