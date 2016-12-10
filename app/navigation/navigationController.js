app.controller('navigationController', ['$scope','$uibModal','authenticationService', function($scope, $uibModal, authenticationService){

	$scope.init = function(){
		$scope.user = authenticationService.getSession();
		$scope.isLoggedIn = ($scope.user != null);
		authenticationService.subscribe($scope,EVENTS.LOGOUT,onLogout);
	};

	$scope.logout = function(){
		authenticationService.clearSession();
	};

	function onLogout(){
		$scope.user = authenticationService.getSession();
		$scope.isLoggedIn = ($scope.user != null);
	}

	$scope.showLoginBox = function () {
		var modalInstance = $uibModal.open({
			animation: false,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'app/login/login.html',
			controller: 'loginController',
			size: 'md',
			windowClass:'shelf-modal'
		});

		modalInstance.result.then(function(user){
			if(user != null) {
				$scope.user = user;
				$scope.isLoggedIn = ($scope.user != null);
				authenticationService.storeSession(user);
			}
		});
	};

	$scope.showSignUpBox = function(){
		var modalInstance = $uibModal.open({
			animation: false,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'app/login/login.html',
			controller: 'loginController',
			size: 'md',
			windowClass:'shelf-modal'
		});
	};
}]);

