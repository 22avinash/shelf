app.factory('authenticationService', ['$http','$cookies', '$rootScope',function($http, $cookies, $rootScope){
	var authService = {};
	authService.login = login;
	authService.storeSession = storeSession;
	authService.clearSession = clearSession;
	authService.getSession = getSession;
	authService.subscribe = subscribe;

	function subscribe(scope,event,cb){
		var handler = $rootScope.$on(event, cb);
		scope.$on('$destroy', handler);
	};

	function login(data, cb){
		$http({
			method : 'POST',
			url : 'api/users/login',
			data : data			
		}).then(function success(response){
			console.log('POST api/users/login success');
			console.log(response);
			cb(null,response);
		},function error(response){
			console.log('POST api/users/login failure');
			console.log(response);
			cb(response, null);
		});
	};

	function storeSession(user){
		$cookies.putObject('session',user);
	};

	function clearSession(){
		var user = $cookies.getObject('session');
		if(user){
			$http({
				method : 'POST',
				url : 'api/users/logout',
				data : {
					userId : user.id,
					token  : user.token
				},
			}).then(function success(response){
				console.log('POST api/users/logout success');
				console.log(response);
				$cookies.remove('session');
				$rootScope.$emit(EVENTS.LOGOUT);
			}, function error(response){
				console.log('POST api/users/logout failure');
				console.log(response);
			});
		}
	};

	function getSession(){
		return $cookies.getObject('session');
	};
	return authService;
}]);