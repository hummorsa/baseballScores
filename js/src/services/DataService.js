'use strict';

app.service('DataService',['$http', function($http){

    this.getScores = function(date){
        return $http.get('http://gd2.mlb.com/components/game/mlb/year_'+date.year+'/month_'+date.month+'/day_'+date.day+'/master_scoreboard.json')
    }

}]);