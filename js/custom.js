/*---------------------------Display User Profile-------------------------*/

function users(callback) {

    FB.api('/me?fields=name,username,birthday,hometown,albums,photos,location,picture.height(100).width(100),cover', function(response) {
        callback(response);

    });
}

/*-------------------------End Script - Display User Profile------------*/

/*------------------------Friends List------------------------------------*/

function friends(callback) {

    FB.api('/me/friends?fields=name,username,location,name,bio,about,picture.height(80).width(80)', function(response) {

        callback(response);

    });
}



// function pic(album_id, callback) {

//     FB.api("/" + album_id + "/photos", function(response) {

//         callback(response);

//     });
// }


/*---------------------------End Friends List------------------------------*/

function homePage() {

    var docfrag = document.createDocumentFragment(); // Document Fragment


    var getuser = users(function(me) {

        // All variables for loged in user//
        var inName = document.createTextNode(me.name),
            inUsername = document.createTextNode(typeof(me.username) != 'undefined' ? me.username : "Username?"),
            inHome = document.createTextNode(typeof(me.hometown.name) != 'undefined' ? me.hometown.name : "Hometown?"),
            inLocation = document.createTextNode(typeof(me.location.name) != 'undefined' ? me.location.name : "Location?"),
            inBday = document.createTextNode(typeof(me.birthday) != 'undefined' ? me.birthday : "Birthday?"),
            inPicture = me.picture.data.url;

        document.getElementById('fnu').setAttribute('data-location', inLocation.nodeValue);

        //Creating first List Item //
        var listFirst = document.createElement("li");
        listFirst.setAttribute("class", "grid_items main_user");
        listFirst.style.backgroundColor = "#fff";

        //Creating Cover//
        var cover = document.createElement("div");
        cover.setAttribute("class", "cover_photo");

        var coverWrapper = cover.cloneNode(false);
        coverWrapper.setAttribute("class", "cover_wrapper");

        // var inCover = me.cover.source;
        // inCover = inCover.replace(/s720/i, 'l720');
        // var inCoverPos = me.cover.offset_y;

        var coverImg = document.createElement("img");


        coverWrapper.appendChild(coverImg);
        if (me.cover) {
            var inCover = me.cover.source;
            inCover = inCover.replace(/s720/i, 'l720');
            var inCoverPos = me.cover.offset_y;

            coverImg.setAttribute('src', inCover);
            coverImg.setAttribute('style', "top:" + inCoverPos + "; width:100%;");
        } else {

            coverImg.setAttribute("style", "background:url( http://www.coverbooth.com/uploads/covmg/the-three-choices-of-life-quotes-cool-facebook-timeline-covers.jpg ) no-repeat 0 0");
        }

        //Creating Name & Picture Container//
        var userBg = cover.cloneNode(false);
        userBg.setAttribute("class", "userbg");
        userBg.removeAttribute("style");

        //Creating Picture//
        var mePhoto = document.createElement("img");
        mePhoto.setAttribute("src", inPicture);
        mePhoto.setAttribute("class", "me_photo");
        mePhoto.setAttribute("width", "100px");
        mePhoto.setAttribute("height", "100px");
        //mePhoto.removeAttribute("style");

        //Creating HighChart Container
        var chartContainer = document.createElement("div");
        chartContainer.setAttribute("id", "chart_container");

        // var chartTextContainer = document.createElement("div");
        // chartTextContainer.setAttribute("class", "chart_text");

        // var chartText = document.createTextNode('Friends Top Location');

        // chartTextContainer.appendChild(chartText);

        // chartContainer.appendChild(chartTextContainer);


        //Creating Name//
        var meName = cover.cloneNode(false);
        meName.setAttribute("class", "me_name");
        meName.removeAttribute("style");
        meName.appendChild(inName);

        userBg.appendChild(mePhoto); // appending user photo to BG
        userBg.appendChild(meName); // appending user name to BG

        cover.appendChild(userBg); // appending BG to cover container
        cover.appendChild(coverWrapper);




        //---------Creating user details elements----------//

        var detailsList = document.createElement('ul');
        detailsList.setAttribute('class', 'user_details');



        for (j = 0; j < 4; j++) {

            var arrColor = ["#f1c40f", "#3498db", "#1abc9c", "#7f8c8d"]

            var detailListItems = document.createElement('li')

            var iconContainer = document.createElement('span');
            iconContainer.style.backgroundColor = arrColor[j];

            iconContainer.setAttribute('class', 'melist_' + j);

            userIcons = document.createElement('img');



            switch (j) {
                case 0:
                    detailListItems.appendChild(inUsername);
                    userIcons.setAttribute('src', 'images/icon_link.png');
                    break;
                case 1:
                    detailListItems.appendChild(inLocation);
                    userIcons.setAttribute('src', 'images/icon_location.png');
                    break;
                case 2:
                    detailListItems.appendChild(inHome);
                    userIcons.setAttribute('src', 'images/icon_home.png');
                    break;
                default:
                    detailListItems.appendChild(inBday);
                    userIcons.setAttribute('src', 'images/icon_home.png');
                    break;
            }

            iconContainer.appendChild(userIcons);
            detailListItems.appendChild(iconContainer);
            detailsList.appendChild(detailListItems);
            //listFirst.appendChild(detailsList);
            //docfrag.appendChild(detailsList);

        }


        listFirst.appendChild(cover); // appending cover container to 1st List item
        listFirst.appendChild(detailsList);
        listFirst.appendChild(chartContainer);
        docfrag.appendChild(listFirst); // appending 1st List item to document fragment


        document.getElementById('container').appendChild(docfrag);


        //=========================Adding Friends list====================================================//
        var getfriends = friends(function(dostData) {


            var chartdat = [];
            var dostLength = dostData.data.length;

            for (i = 0; i < dostLength; i++) {

                if (typeof(dostData.data[i].location) != 'undefined') {

                    chartdat.push(dostData.data[i].location.name);
                }

                var dostCommon = dostData.data[i],
                    dostImg = dostCommon.picture.data.url; // Image Url
                // console.log(dostCommon.about);

                if (dostCommon.username) {
                    var usernaam = document.createTextNode(dostCommon.username); // Username

                } else {

                    usernaam = document.createTextNode("007"); // Username

                }
                naam = document.createTextNode(dostCommon.name); // Name
                dostLocate = dostCommon.location;

                if (dostLocate && dostLocate.name) {
                    var dostLocation = document.createTextNode(dostLocate.name); // Location

                } else {
                    dostLocation = document.createTextNode("Milky Way");
                }

                // Random Colors tiles//
                var colors = ["#1abc9c", "#3498db", "#34495e", "#f39c12", "#c0392b", "#7f8c8d", "#2c3e50", "#2980b9", "#16a085", "#e74c3c", "#95a5a6", "#9b59b6", "#27ae60", "#8e44ad", "#d35400", "#e67e22"];
                var ran = Math.floor(Math.random() * colors.length);




                var list = document.createElement("li");
                list.setAttribute("class", "grid_items");
                list.style.backgroundColor = colors[ran];

                var image = document.createElement("img");
                image.setAttribute("src", dostImg);
                image.setAttribute("width", "80");
                image.setAttribute("height", "80");

                var photoCont = document.createElement("div");
                photoCont.setAttribute("class", "pic");
                photoCont.appendChild(image);

                var naamCont = photoCont.cloneNode(false);
                naamCont.setAttribute("class", "name");
                naamCont.appendChild(naam);

                var usernaamCont = photoCont.cloneNode(false);
                usernaamCont.setAttribute("class", "username");
                usernaamCont.appendChild(usernaam);

                var locationCont = photoCont.cloneNode(false);
                locationCont.setAttribute("class", "location");
                locationCont.appendChild(dostLocation);

                // var aboutFriends = photoCont.cloneNode(false);
                // locationCont.setAttribute("class", "about_friends");
                // locationCont.appendChild(dostLocation);


                list.appendChild(photoCont);
                list.appendChild(naamCont);
                list.appendChild(usernaamCont);
                list.appendChild(locationCont);

                docfrag.appendChild(list);

                document.getElementById('container').appendChild(docfrag);

                if (i === (dostLength - 1)) {
                    $('#preloader').fadeOut();
                }
            }

            $(document).ready(function() {

                //Masonry initiated//
                var container = document.querySelector('#container');
                msnry = new Masonry(container, {
                    // options
                    isResizable: true,
                    isAnimated: true,
                    columnWidth: 195,
                    "gutter": 4,
                    transitionDuration: '0.6s',
                    itemSelector: '.grid_items',
                    "isFitWidth": true
                });

                $('#fnu').click(function() {

                    var myLoci = $(this).attr('data-location');
                    myLoci = myLoci.split(',')[0];
                    //console.log(myLoci);

                    $(".location").not(":contains(" + myLoci + ")").parent('li').hide();
                    
                    msnry.layout();

                });

                $('#home').click(function() {

                    $("li").show();
                    msnry.layout();

                });

            });


            setTimeout(function() {
                highCharts(chartdat);
            }, 1000)


            $('#container').imagesLoaded().progress(function(instance, image) {
                var result = image.isLoaded ? 'loaded' : 'broken';
                if (result) {
                    $(image.img).parents('li').addClass('bigEntrance');
                    $(image.img).fadeIn();
                }
            });


        });
    });



}

/*---------------------------------------------------------------------------*/

// function getUser() {


//     var getuser = users(function(model) {
//         userLoci = model.location.name;
//         $("#userProfile").append('<ul class="userDetails">');
//         //$('.userDetails').append('<li> <img src="'+response.cover.source+'"> </li>'); // User Image//
//         $('.userDetails').append('<li> <img src="' + model.picture.data.url + '"width="100" height="100" > </li>'); // User Image//
//         $('.userDetails').append('<li> <span>' + model.name + '</span></li>'); // User Name//
//         $('.userDetails').append('<li> <span>' + model.location.name + '</span></li>'); // User Location//
//         $('.userDetails').append('<li> <span>' + model.hometown.name + '</span></li>'); // User Hometown//
//         if (typeof(model.birthday) == 'undefined') {
//             $('.userDetails').append('<li id="userBday"> <span> Birthday Unknown</span></li>'); // User Birthday if not public//
//         } else {
//             $('.userDetails').append('<li id="userBday"> <span>' + model.birthday + '</span></li>'); // User Birthday//
//         }

//     });
// }

// /*-------------------------Friends List ------------------------------*/

function highCharts(chartdat) {

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

    datasum1.sort(function(a, b) {
        return a[1] - b[1];
    }); // Sorted array

    var chartInput = datasum1.slice(Math.max(datasum1.length - 5, 1)) // last five elements only


    $(function() {

        Highcharts.setOptions({
            colors: ["#8e44ad", "#2980b9", "#16a085", "#f39c12", "#c0392b"]
        });

        chart = new Highcharts.Chart({
            chart: {
                renderTo: chart_container,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            tooltip: {
                backgroundColor: '#fff',
                borderRadius: '50%',
                borderWidth: 0,
                shadow: false,
                useHTML: true,
                headerFormat: '<div class="tooltip_main"><div class="tooltip_location">{point.key}</div>',
                pointFormat: '<div class="tooltip_count">{point.y:.0f}</div>',
                footerFormat: '</div>',
                hideDelay: 100,
                followTouchMove: true,
                style: {
                    fontFamily: '\'Open Sans\', sans-serif',
                    width: '300px'
                },

                positioner: function() {
                    return {
                        x: 68,
                        y: 65
                    };
                }
            },
            plotOptions: {
                pie: {
                    size: '100%',
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            title: {
                useHTML: true,
                text: '<div class="chart_title"><div class="headingelem_1" >Friend\'s</div> <div class="headingelem_2" >Top</div> <div class="headingelem_3" >Location</div></div>',
                verticalAlign: 'top',
                y: 110,
                floating: true,
                style: {
                    fontFamily: '\'Open Sans\', sans-serif',
                    color: '#34495e',
                    width: '300px'
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                type: 'pie',
                name: 'City',
                innerSize: '85%',
                data: chartInput,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });


    });

}






/*------------------------- Friends List complete-------------------------*/


/*------------------------- Friends Nearby-------------------------*/


// function friendsNearby() {

//     var userLocationName = users(function(userData) {

//         var userLoci = userData.location.name;

//         var friendsLocationName = friends(function(friendsData) {


//             for (var i = 0; i < friendsData.data.length; i++) {

//                 if (typeof(friendsData.data[i].location) != 'undefined') {

//                     if (friendsData.data[i].location.name === userLoci) {

//                         $('.nearList').append('<li> <span class="friendImg"><img src="' + friendsData.data[i].picture.data.url + '" width="40" height="40" ></span> <span>' + friendsData.data[i].name + '</span></li>');

//                     }

//                 }

//             }
//         });

//     });



// }






/*-------------------------Friends Nearby complete ------------------------------*/


/*-------------------------User Album - remove myAlbum and check ------------------------------*/

// function albums() {

//     users(function(myalbum) {

//         var len = myalbum.albums.data.length;

//         for (var i = 0; i < len; i++) {

//             var albumid = myalbum.albums.data[i].id; //Album ID

//             var albumname = document.createTextNode(myalbum.albums.data[i].name); //Album Name

//             (function(albumid, albumname) {

//                 var albumPic = pic(albumid, function(albPic) {



//                     var coverPic = albPic.data[0].source;

//                     var list = document.createElement("li");
//                     list.setAttribute("id", albumid);
//                     list.setAttribute("onClick", "albumPictures(this.id)");



//                     var Div = document.createElement("div");
//                     Div.setAttribute("class", "album_name");
//                     Div.appendChild(albumname);

//                     var image = document.createElement("img");
//                     image.setAttribute("src", coverPic);
//                     image.setAttribute("id", albumid);
//                     image.setAttribute("width", "100");
//                     image.setAttribute("height", "100");

//                     list.appendChild(Div);
//                     list.appendChild(image);

//                     document.getElementById("albums").appendChild(list);

//                 });

//             })(albumid, albumname);
//         }

//     });
// }



/*-------------------------User Album Ends ------------------------------*/

// function albumPictures (albumId) {

//     $('#carousel-wrapper').empty().append('<div id="carousel"></div>');
//     $('#thumbs-wrapper').empty().append('<div id="thumbs"></div><a id="prev" href="#"></a><a id="next" href="#"></a>');


//     pic(albumId, function(albumpict) {
//             var len = albumpict.data.length

//             for (var j = 0; j < len; j++)

//             {

//                 var bigPic = albumpict.data[j].source;

//             /*-- For Big Image --*/
//             var bigImageContainer = document.createElement('span');
//             bigImageContainer.setAttribute('id', j);

//             var bigImage = document.createElement('img');
//             bigImage.setAttribute('src', bigPic);

//             bigImageContainer.appendChild(bigImage);
//             document.getElementById('carousel').appendChild(bigImageContainer);


//             /*-- For Small Image --*/
//             var smallImageContainer = document.createElement('a');
//             smallImageContainer.setAttribute('href', "#" + j);

//             var smallImage = document.createElement('img');
//             smallImage.setAttribute('src', bigPic);
//             smallImage.setAttribute('width', '73');
//             smallImage.setAttribute('height', '42');

//             smallImageContainer.appendChild(smallImage);
//             document.getElementById('thumbs').appendChild(smallImageContainer);

//         }

//         carouselPop();
//     });
// }





/*-------------------------Logout Script ------------------------------*/

// function fbLogout() {
//     FB.logout(function(response) {
//         window.location.reload();
//     });
// }

/*------------------------- Logout Script End -------------------------*/



// function carouselPop() {

//     $('#carousel span').append('<img src="images/gui/carousel_glare.png" class="glare" />');
//     $('#thumbs a').append('<img src="images/gui/carousel_glare_small.png" class="glare" />');

//     $('#carousel').carouFredSel({
//         responsive: true,
//         circular: false,
//         auto: false,
//         items: {
//             visible: 1,
//             width: 100,
//             height: '56%'
//         },
//         scroll: {
//             fx: 'directscroll'
//         }
//     });

//     $('#thumbs').carouFredSel({
//         responsive: true,
//         circular: false,
//         infinite: false,
//         auto: false,
//         prev: '#prev',
//         next: '#next',
//         items: {
//             visible: {
//                 min: 2,
//                 max: 6
//             },
//             width: 150,
//             height: '66%'
//         }
//     });

//     $('#thumbs a').click(function() {
//         $('#carousel').trigger('slideTo', '#' + this.href.split('#').pop());
//         $('#thumbs a').removeClass('selected');
//         $(this).addClass('selected');
//         return false;
//     });

// }