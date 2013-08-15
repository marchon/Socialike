  window.fbAsyncInit = function() {
      FB.init({
          appId: '488181561252340', // App ID
          channelUrl: 'https://socialike.herokuapp.com/home.html', // Channel File
          status: true, // check login status
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: true // parse XFBML

      });

      //Facebook Login asking for user extra permission//

      function fbLogin() {
          FB.login(function(response) {}, {
              scope: 'user_location,user_hometown,user_photos,friends_location'
          });
      }



      FB.Event.subscribe('auth.login', function(response) {

          if (response.status === 'connected') {

              console.log('auth.login satisfied');

              window.top.location = "/home.html";

          } else if (response.status === 'not_authorized') {

              // FB.login();
              console.log('auth.login not autorised');
          } else {

              // FB.login();
          }


      });



      FB.getLoginStatus(function(response) {

          if (response.status === 'connected') {


              getLoginStatus
              homePage();

          } else if (response.status === 'not_authorized') {
              // the user is logged in to Facebook, 
              // but has not authenticated your app
          } else {
              // the user isn't logged in to Facebook.
          }
      });

      FB.Event.subscribe('auth.statusChange', function(response) {
          //do something with response
          if (window.location.pathname == "/") {

              console.log('auth.statusChange satisfied');

              window.top.location = "/home.html";
          }
      });



  };

   // Load the SDK asynchronously
  (function(d) {
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