var userLoci;



/*---------------------------Display User Profile-------------------------*/

function users(callback) {

    FB.api('/me?fields=name,birthday,hometown,albums,photos,location,picture.height(100).width(100),cover', function(response) {
        callback(response);

    });
}

/*-------------------------End Script - Display User Profile------------*/

/*------------------------Friends List------------------------------------*/

function friends(callback) {

    FB.api('/me/friends?fields=name,location,picture.height(80).width(80)', function(response) {

        callback(response);

    });
}



// function pic(album_id, callback) {

//     FB.api("/" + album_id + "/photos", function(response) {

//         callback(response);

//     });
// }


/*---------------------------End Friends List------------------------------*/

/*---------------------------------------------------------------------------*/

function getUser() {


    var getuser = users(function(model) {
        userLoci = model.location.name;
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
                    innerSize: '20%',
                    data: datasum1,
                    showInLegend: false,
                    dataLabels: {
                        enabled: true
                    }
                }]
            });
        });

    });

}






/*------------------------- Friends List complete-------------------------*/


/*------------------------- Friends Nearby-------------------------*/


function friendsNearby() {


  //  var userLocationName = users(function(model1) {

      //  userLoci = model1.location.name;

   // });


    var friendsLocationName = friends(function(model) {
        //console.log('inside getfriends1 '+userLoci);
var userLoci1 = '';

        for (var i = 0; i < model.data.length; i++) {

            if (typeof(model.data[i].location) != 'undefined') {

                if (i === 0) {
                    $('#friend_nearby').append('<ul class="nearList">');
                    users(function(model1) {

        window.userLoci1 = model1.location.name;
        console.log(userLoci1);

    });
                }
            
console.log(userLoci1);
                if (model.data[i].location.name === userLoci1) {

console.log("Friends nearby  li called");
                    $('.nearList').append('<li> <span class="friendImg"><img src="' + model.data[i].picture.data.url + '" width="40" height="40" ></span> <span>' + model.data[i].name + '</span></li>');

                }

            }

        }
    });
}



/*-------------------------Friends Nearby complete ------------------------------*/


/*-------------------------User Album - remove myAlbum and check ------------------------------*/

// function albums() {

//     users(function(myalbum) {

//         var len = myalbum.albums.data.length;

//         for (var i = 1; i < len; i++) {

//             var albumid = myalbum.albums.data[i].id; //Album ID

//             var albumname = document.createTextNode(myalbum.albums.data[i].name); //Album Name

//             var list = document.createElement("li");
//             list.setAttribute("id", albumid);



//             var Div = document.createElement("div");
//             Div.setAttribute("class", "album_name");
//             Div.appendChild(albumname);

//             list.appendChild(Div);
            
//             document.getElementById("albums").appendChild(list);


//         }


//     });
// }



/*-------------------------User Album Ends ------------------------------*/






/*-------------------------Logout Script ------------------------------*/

function fbLogout() {
    FB.logout(function(response) {
        window.location.reload();
    });
}

/*------------------------- Logout Script End -------------------------*/