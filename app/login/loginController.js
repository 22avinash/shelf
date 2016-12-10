app.controller('loginController', ['$scope','$uibModalInstance','authenticationService', function($scope, $uibModalInstance, authenticationService){
	$scope.params = {};

	$scope.init = function(){
		authenticationService.clearSession();
	};

	$scope.init();

	$scope.login = function(form){
		if(form.$valid) {
			authenticationService.login($scope.params, function(err,response){
				if(err){
					return;
				}
				var res = response.data;
				if(res.success){
					$scope.ok(res.user);
				} else {
					alert(res.message);
				}
				
			});
		}
	};
	
	$scope.ok = function (user) {
		$uibModalInstance.close(user);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);