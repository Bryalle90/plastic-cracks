var app = angular.module("messagesApp", []);
app.controller("messagesCtrl", function($scope, $http) {
	$scope.sendMessage = function(){
		var data = { text: $scope.message, user: $scope.user };
		$http.post("/api/messages/v1/messages/", data)
		.then(function(response) {
	        $scope.response = response.data;
	    });
	}
	$scope.getMessages = function(){
		$http.get("/api/messages/v1/messages/")
		.then(function(response) {
	        $scope.response = response.data;
		    }, function(response) {
		        $scope.response = response.status + response.data.message || 'Request failed';
	    });
        $scope.resetTextBoxes();
	}
	$scope.getMessage = function(){
		$http.get("/api/messages/v1/messages/" + $scope.getID)
		.then(function(response) {
	        $scope.response = response.data.user + ": " + response.data.text;
		    }, function(response) {
		        $scope.response = response.status + response.data.message || 'Request failed';
	    });
        $scope.resetTextBoxes();
	}
	$scope.modifyMessage = function(){
		var data = { text: $scope.msgReplace };
		$http.put("/api/messages/v1/messages/" + $scope.id, data)
		.then(function(response) {
	        $scope.response = response.data.message;
		    }, function(response) {
		        $scope.response = response.status + response.data.message || 'Request failed';
	    });
        $scope.resetTextBoxes();
	}
	$scope.deleteMessage = function(){
		$http.delete("/api/messages/v1/messages/" + $scope.delID)
		.then(function(response) {
	        $scope.response = response.data.message;
		    }, function(response) {
		        $scope.response = response.status + response.data.message || 'Request failed';
	    });
        $scope.resetTextBoxes();
	}
	$scope.resetTextBoxes = function(){
		$scope.user = "";
		$scope.message = "";
		$scope.msgReplace = "";
		$scope.id = "";
		$scope.getID = "";
		$scope.delID = "";
	}
	
	$scope.getMessages();
});