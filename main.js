angular.module('todoApp', []).controller('TodoListController', function($scope) {

  $scope.weathers = [
    "Day",
    "Night",
    "Raining"
  ]

  $scope.environments = [
    "Arctic",
    "Coastal",
    "Desert",
    "Forest",
    "Grasslands",
    "Hills",
    "Mountain",
    "Swamp",
    "Underdark",
    "Underwater",
  ]

  $scope.environment = "Forest"
  $scope.weather = "Day"
  $scope.mod = 0
  $scope.rolls = []



  function d4(){
    return Math.floor(Math.random() *4) +1
  }
  function d6(){
    return Math.floor(Math.random() *6) +1
  }
  function d20(){
    return Math.floor(Math.random() *20) +1
  }


  $scope.harvest = function(){
    var attempt = d20() + $scope.mod
    if(attempt < 15){
      $scope.rolls.push("No useful ingredients found today (Roll: "+attempt+")")
    } else {
      roll()
    }
  }
  
  function roll(){

    $scope.rolls.push("yay")
  }

});
