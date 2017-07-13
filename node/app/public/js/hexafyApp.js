var app = angular.module("hexafyApp", []);
app.controller("hexafyCtrl", function($scope, hexafy) {
	$scope.hexafication = function(){
		$scope.result = hexafy.myFunc($scope.hex);
	}
    $scope.hex=255;
});
app.service('hexafy', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});