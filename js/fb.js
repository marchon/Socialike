  window.fbAsyncInit = function() {
      FB.init({
          appId: '488181561252340', // App ID
          channelUrl: 'https://socialike.herokuapp.com/index.html', // Channel File
          status: true, // check login status
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: true // parse XFBML
      });


      FB.Event.subscribe('auth.login', function(response) {

          if (response.status === 'connected') {


              $('body').attr('id', '');
              $('#wrapper').css('display', 'table');
              var pathArray = window.location.pathname;
              // if (pathArray == '/') {

              window.top.location = "//socialike.herokuapp.com/home.html";
              console.log("Redirecting: " + pathArray);

              // } 
              // else {

              //     console.log("Calling get user & friends function: " + pathArray);
              //     getUser();
              //     getFriends();
              //     friendsNearby()

              // };



          } else if (response.status === 'not_authorized') {

              // FB.login();
          } else {

              // FB.login();
          }
      });

      FB.getLoginStatus(function(response) {

          if (response.status === 'connected') {

              //     $('body').attr('id', '');
              //     $('#wrapper').css('display', 'table');
              //     var pathArray = window.location.pathname;
              //     if (pathArray == '/') {

              //         window.top.location = "//socialike.herokuapp.com/home.html";
              //         console.log("Redirecting: " + pathArray);

              //     } else {

              console.log("Calling get user & friends function: ");
              getUser();
              getFriends();
              friendsNearby();

              // };
          } else if (response.status === 'not_authorized') {
              // the user is logged in to Facebook, 
              // but has not authenticated your app
          } else {
              // the user isn't logged in to Facebook.
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