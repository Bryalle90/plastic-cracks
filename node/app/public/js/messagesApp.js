var app = angular.module("messagesApp", []);
app.controller("messagesCtrl", function($scope, $http) {
	$scope.sendMessage = function(){
		var data = { text: $scope.message, user: $scope.user };
		$http.post("/api/v1/messages", data)
		.then(function(response) {
	        $scope.response = response.data;
	    });
	}
	$scope.getMessages = function(){
		$http.get("/api/v1/messages")
		.then(function(response) {
	        $scope.response = response.data;
		    }, function(response) {
		        $scope.response = response.status + response.data.message || 'Request failed';
	    });
	}
	$scope.getMessage = function(){
		$http.get("/api/v1/messages/" + $scope.getID)
		.then(function(response) {
	        $scope.response = response.data.user + ": " + response.data.text;
		    }, function(response) {
		        $scope.response = response.status + response.data.message || 'Request failed';
	    });
	}
	$scope.modifyMessage = function(){
		var data = { text: $scope.msgReplace };
		$http.put("/api/v1/messages/" + $scope.id, data)
		.then(function(response) {
	        $scope.response = response.data.message;
		    }, function(response) {
		        $scope.response = response.status + response.data.message || 'Request failed';
	    });
	}
	$scope.deleteMessage = function(){
		$http.delete("/api/v1/messages/" + $scope.delID)
		.then(function(response) {
	        $scope.response = response.data.message;
		    }, function(response) {
		        $scope.response = response.status + response.data.message || 'Request failed';
	    });
	}
	
	$scope.getMessages();
});