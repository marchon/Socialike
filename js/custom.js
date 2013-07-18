var userLoci;

/*-------------------------------fb login--------------------------------------------*/

function Login() {
    FB.login(function(response) {
            if (response.authResponse) {
                console.log("Entered in Login function");
                window.top.location = "//socialike.herokuapp.com/home.html";
                getUser();
                getFriends();
                friendsNearby();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }

        });
    }







    /*-------------------------------fb login ends--------------------------------------------*/
    /*---------------------------------------------------------------------------*/

    function getUser() {


        var getuser = userProfile(function(model) {

            $("#userProfile").append('<ul class="userDetails">');
            //$('.userDetails').append('<li> <img src="'+response.cover.source+'"> </li>'); // User Image//
            $('.userDetails').append('<li> <img src="' + model.picture.data.url + '"width="100" height="100" > </li>'); // User Image//
            $('.userDetails').append('<li> <span>' + model.name + '</span></li>'); // User Name//
            $('.userDetails').append('<li> <span>' + model.location.name + '</span></li>'); // User Location//
            $('.userDetails').append('<li> <span>' + model.hometown.name + '</span></li>'); // User Hometown//
            if (typeof(model.birthday) == 'undefined') {
                $('.userDetails').append('<li id="userBday"> <span> Birthday Unknown</span></li>'); // User Birthday if not public//
            } else {
                $('.userDetails').append('<li id="userBday"> <span>' + model.birthday + '</span></li>'); // User Birthday//
            }

        });
    }

    /*-------------------------Friends List ------------------------------*/

    function getFriends() {

        var chartdat = [];


        var getfriends = friends(function(model) {

            for (var i = 0; i < model.data.length; i++) {

                if (i === 0) {
                    $('#friend_list').append('<ul class="friendList">');
                }
                $('.friendList').append('<li> <span class="friendImg"><img src="' + model.data[i].picture.data.url + '" width="40" height="40" ></span> <span>' + model.data[i].name + '</span></li>');

                if (typeof(model.data[i].location) != 'undefined') chartdat.push(model.data[i].location.name);
            }

            /*------------------------- City-Wise friends count Chart---------------*/

            chartdat = chartdat.reduce(function(acc, curr) {
                if (typeof acc[curr] == 'undefined') {
                    acc[curr] = 1;
                } else {
                    acc[curr] += 1;
                }
                return acc;
            }, {});

            var datasum1 = [];
            for (var j in chartdat) {
                if (chartdat[j] > 5) {
                    datasum1.push([j, chartdat[j]]);
                }

            }


            $(function() {
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: container,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: 'Top locations where your friends are'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
                    },
                    plotOptions: {
                        pie: {
                            size: 200,
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                format: '<b>{point.name}</b>: {point.y:.0f} '
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'City',
                        data: datasum1
                    }]
                });
            });




        });

    }






    /*------------------------- Friends List complete-------------------------*/


    /*------------------------- Friends Nearby-------------------------*/


    function friendsNearby() {



        var getuser1 = userProfile(function(model1) {

            userLoci = model1.location.name;


        });


        var getfriends1 = friends(function(model) {
            //console.log('inside getfriends1 '+userLoci);

            for (var i = 0; i < model.data.length; i++) {

                if (typeof(model.data[i].location) != 'undefined') {

                    if (i === 0) {
                        $('#friend_nearby').append('<ul class="friendList">');
                    }

                    if (model.data[i].location.name === userLoci) {


                        $('.friendList').append('<li> <span class="friendImg"><img src="' + model.data[i].picture.data.url + '" width="40" height="40" ></span> <span>' + model.data[i].name + '</span></li>');

                    }

                }

            }
        });




    }



    /*-------------------------Friends Nearby complete ------------------------------*/


    /*-------------------------Logout Script ------------------------------*/

    function fbLogout() {
        FB.logout(function(response) {
            window.location.reload();
        });
    }

    /*------------------------- Logout Script End -------------------------*/