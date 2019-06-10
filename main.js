angular.module('todoApp', []).controller('TodoListController', function($scope) {

  $scope.weathers = [
    "Day",
    "Night",
    "Raining",
    "In a cave"
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
  function twoD6(){
    return (d6()+d6())
  }
  function d20(){
    return Math.floor(Math.random() *20) +1
  }
  function d100(){
    return Math.floor(Math.random() *100) +1
  }


  $scope.harvest = function(){
    var attempt = d20()
    if(attempt + $scope.mod < 15){
      $scope.rolls.push("No useful ingredients found today (Roll: "+attempt+"+"+$scope.mod+"="+(attempt+$scope.mod)+")")
    } else {
      var numIngredients = d4()
      $scope.rolls.push("You found "+numIngredients+" ingredients!")
      for(var i=0; i<numIngredients; i++){
        roll()
      }
    }
  }
  
  function roll(){
    var rollValue = (twoD6() -2)
    if(rollValue < 4 || rollValue > 8){
      if(!elementalWater()){
        handleIngredient(ingredients[$scope.environment][rollValue])
      }
    } else {
      handleIngredient(ingredients[$scope.environment][rollValue])
    }
  }

  function elementalWater() {
    var val = d100()
    if (val >= 75){
      $scope.rolls.push("--Elemental Water")
      return true
    } else {
      return false
    }
  }

  function handleIngredient(ingredient) {
    switch(ingredient.rule) {
      case 'common':
        handleIngredient(ingredients["Common"][twoD6()-2])
        break;
      case 'night':
        if($scope.weather === "Night"){
          $scope.rolls.push("--"+ingredient.name)
        } else {
          handleIngredient(ingredients[$scope.environment][twoD6()-2])
        }
        break;
      case 'cave':
        $scope.rolls.push(($scope.weather === "In a cave" ? "--2 ":"--")+ingredient.name)
        break;
      case 'rain':
        $scope.rolls.push(($scope.weather === "Raining" ? "--2 ":"--")+ingredient.name)
        break;
      default:
        $scope.rolls.push("--"+ingredient.name)
        break;
    }
  }

});
