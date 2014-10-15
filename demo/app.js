angular.module('FbTest', [])

	  	.factory('FbService', ['$rootScope', function($rootScope){

			var Facebook = {};

			Facebook.getFriends = function(resp) {
			 
			  FB.login(function(response) {// fb login as soon as the ui loads
				if (response.authResponse) {
					FB.api('/me/friends?fields=name,picture.height(280).width(280)', function(response) {
						$rootScope.$apply(function() {
						   resp(response.data);
						});
					});
				} else {
					
				}
			  });

			}
		
			return Facebook;

		}])
	  
		.controller('test', ['$scope', '$rootScope', 'FbService', function($scope, $rootScope, FbService){

			FbService.getFriends(function(resp) {
				console.log(resp);
				$scope.friends = resp;
			});

		}])


// Facebook SDK Initialization
window.fbAsyncInit = function() {
	FB.init({
		appId: '488181561252340', // App ID
		channelUrl: 'https://socialike.herokuapp.com/home.html', // Channel File
		status: true, // check login status
		cookie: true, // enable cookies to allow the server to access the session
		xfbml: false // parse XFBML

	});

	// Bootstrap app
	angular.bootstrap(document.body, ['FbTest']);
};

// Load the SDK asynchronously
(function (d) {
   var js, id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {
      return;
   }
   js = d.createElement('script');
   js.id = id;
   js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
}(document));