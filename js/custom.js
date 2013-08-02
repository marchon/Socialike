/*---------------------------Display User Profile-------------------------*/

function users(callback) {

    FB.api('/me?fields=name,birthday,hometown,albums,photos,location,picture.height(100).width(100),cover', function(response) {
        callback(response);

    });
}

/*-------------------------End Script - Display User Profile------------*/

/*------------------------Friends List------------------------------------*/

function friends(callback) {

    FB.api('/me/friends?fields=name,username,location,picture.height(80).width(80)', function(response) {

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
        var inName = document.createTextNode(me.name);
        var inUsername = document.createTextNode(me.username);
        var inHome = document.createTextNode(me.hometown.name);
        var inLocation = document.createTextNode(me.location.name);
        var inBday = document.createTextNode(me.birthday);
        var inPicture = me.picture.data.url;

        //Creating first List Item //
        var listFirst = document.createElement("li");
        listFirst.setAttribute("class", "grid_items main_user");
        listFirst.style.backgroundColor = "#fff";

        //Creating Cover//
        var cover = document.createElement("div");
        cover.setAttribute("class", "cover_photo");
        if (me.cover) {
            var inCover = me.cover.source;
            var inCoverPos = me.cover.offset_y;

            cover.setAttribute("style", "background:url(" + inCover + ") no-repeat 0 " + inCoverPos + "%;");
        } else {

            cover.setAttribute("style", "background:url( http://www.coverbooth.com/uploads/covmg/the-three-choices-of-life-quotes-cool-facebook-timeline-covers.jpg ) no-repeat 0 0");
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

        //Creating Name//
        var meName = cover.cloneNode(false);
        meName.setAttribute("class", "me_name");
        meName.removeAttribute("style");
        meName.appendChild(inName);

        userBg.appendChild(mePhoto); // appending user photo to BG
        userBg.appendChild(meName); // appending user name to BG

        cover.appendChild(userBg); // appending BG to cover container

        listFirst.appendChild(cover); // appending cover container to 1st List item
        docfrag.appendChild(listFirst); // appending 1st List item to document fragment


        //---------Creating user details elements----------//

        var detailsList = document.createElement('ul');
        detailsList.setAttribute('class', 'user_details');

        var detailListItems = listFirst.cloneNode(false);
        //meUsername.setAttribute("class", "me_username");
        var iconContainer = document.createElement('span');

        for (j = 0; j < 4; j++) {

            iconContainer.setAttribute('class', 'melist_' + j );

            detailListItems.appendChild(iconContainer);

            switch (j) {
                case 0:
                    detailListItems.appendChild(inUsername);
                    break;
                case 1:
                    detailListItems.appendChild(inLocation);
                    break;
                case 2:
                    detailListItems.appendChild(inHome);
                    break;
                default:
                    detailListItems.appendChild(inBday);
                    break;
            }
            
            detailsList.appendChild(detailListItems);
            docfrag.appendChild(detailsList);

        }



       

        document.getElementById('container').appendChild(docfrag);


        //=========================Adding Friends list====================================================//
        var getfriends = friends(function(dostData) {

            var dostLength = dostData.data.length;
            console.log(dostLength);
            for (i = 0; i < dostLength; i++) {

                var dostCommon = dostData.data[i],
                    dostImg = dostCommon.picture.data.url; // Image Url

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


                list.appendChild(photoCont);
                list.appendChild(naamCont);
                list.appendChild(usernaamCont);
                list.appendChild(locationCont);

                docfrag.appendChild(list);

                document.getElementById('container').appendChild(docfrag);

                if (i === (dostLength - 2)) {
                    $('#preloader').fadeOut();
                }
            }



            /*var container = document.querySelector('#container');
            var msnry = new Masonry(container, {
                // options
                //isResizable: false,
                isAnimated: true,
                columnWidth: 200,
                "gutter": 6,
                transitionDuration: '0.6s',
                itemSelector: '.grid_items',
                "isFitWidth": true
            });

            $('#container').imagesLoaded().progress(function(instance, image) {
                    var result = image.isLoaded ? 'loaded' : 'broken';
                    if (result) {
                        $(image.img).fadeIn();
                    }
                });*/


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

// function getFriends() {
//     var chartdat = [];
//     var getfriends = friends(function(model) {

//         for (var i = 0; i < model.data.length; i++) {

//             if (i === 0) {
//                 $('#friend_list').append('<ul class="friendList">');
//             }
//             $('.friendList').append('<li> <span class="friendImg"><img src="' + model.data[i].picture.data.url + '" width="40" height="40" ></span> <span>' + model.data[i].name + '</span></li>');

//             if (typeof(model.data[i].location) != 'undefined') chartdat.push(model.data[i].location.name);
//         }

//         /*------------------------- City-Wise friends count Chart---------------*/

//         chartdat = chartdat.reduce(function(acc, curr) {
//             if (typeof acc[curr] == 'undefined') {
//                 acc[curr] = 1;
//             } else {
//                 acc[curr] += 1;
//             }
//             return acc;
//         }, {});

//         var datasum1 = [];
//         for (var j in chartdat) {
//             if (chartdat[j] > 5) {
//                 datasum1.push([j, chartdat[j]]);
//             }

//         }


//         $(function() {
//             chart = new Highcharts.Chart({
//                 chart: {
//                     renderTo: container,
//                     plotBackgroundColor: null,
//                     plotBorderWidth: null,
//                     plotShadow: false
//                 },
//                 title: {
//                     text: 'Top locations where your friends are'
//                 },
//                 tooltip: {
//                     pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
//                 },
//                 plotOptions: {
//                     pie: {
//                         size: 200,
//                         allowPointSelect: true,
//                         cursor: 'pointer',
//                         dataLabels: {
//                             enabled: true,
//                             color: '#000000',
//                             connectorColor: '#000000',
//                             format: '<b>{point.name}</b>: {point.y:.0f} '
//                         }
//                     }
//                 },
//                 series: [{
//                     type: 'pie',
//                     name: 'City',
//                     innerSize: '20%',
//                     data: datasum1,
//                     showInLegend: false,
//                     dataLabels: {
//                         enabled: true
//                     }
//                 }]
//             });
//         });

//     });

// }






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