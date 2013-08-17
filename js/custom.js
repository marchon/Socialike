/*---------------------------User Data-------------------------*/

function users(callback) {

    FB.api('/me?fields=name,first_name,username,birthday,hometown,albums,photos,location,picture.height(100).width(100),cover', function(response) {
        callback(response);

    });
}

/*------------------------Friends Data------------------------------------*/

function friends(callback) {

    FB.api('/me/friends?fields=name,username,location,picture.height(80).width(80)', function(response) {

        callback(response);

    });
}


/*---------------------------User Album Data-------------------------*/

function pic(album_id, callback) {

    FB.api("/" + album_id + "/photos", function(response) {

        callback(response);

    });
}


/*---------------------------End Friends List------------------------------*/

function homePage() {

    var docfrag = document.createDocumentFragment(); // Document Fragment


    var getuser = users(function(me) {

        // All variables for loged in user//
        var inName = document.createTextNode(me.name),
            inFirstName = me.first_name,
            inUsername = document.createTextNode(typeof(me.username) != 'undefined' ? me.username : "Username?"),
            inHome = document.createTextNode(typeof(me.hometown) != 'undefined' ? me.hometown.name : "Hometown?"),
            inLocation = document.createTextNode(typeof(me.location) != 'undefined' ? me.location.name : "Location?"),
            inBday = typeof(me.birthday) != 'undefined' ? me.birthday : "Birthday?",
            inPicture = me.picture.data.url;

            console.log(bDayFormatter(inBday));

        $("#preloader h1").text("Howdy! " + inFirstName);
        document.getElementById('fnu').setAttribute('data-location', inLocation.nodeValue);

        //Creating first List Item //
        var listFirst = document.createElement("li");
        listFirst.setAttribute("class", "grid_items main_user");

        //Creating Cover//
        var cover = document.createElement("div");
        cover.setAttribute("class", "cover_photo");

        var coverWrapper = cover.cloneNode(false);
        coverWrapper.setAttribute("class", "cover_wrapper");

        var coverImg = document.createElement("img");


        coverWrapper.appendChild(coverImg);
        if (me.cover) {
            var inCover = me.cover.source;
            inCover = inCover.replace(/s720/i, 'l720');
            //var inCoverPos = me.cover.offset_y;

            coverImg.setAttribute('src', inCover);
            //coverImg.setAttribute('style', "top:" + inCoverPos + "; width:100%;");
        } else {

            coverImg.setAttribute("src", "http://www.coverbooth.com/uploads/covmg/the-three-choices-of-life-quotes-cool-facebook-timeline-covers.jpg");
        }

        //Creating Name & Picture Container//
        var userBg = cover.cloneNode(false);
        userBg.setAttribute("class", "userbg");

        //Creating Picture & Container//

        var pictureCont = cover.cloneNode(false);
        pictureCont.setAttribute("class", "picture_container circle");

        var mePhoto = document.createElement("img");
        mePhoto.setAttribute("src", inPicture);
        mePhoto.setAttribute("class", "me_photo circle");
        mePhoto.setAttribute("width", "100px");
        mePhoto.setAttribute("height", "100px");

        pictureCont.appendChild(mePhoto);

        //Creating HighChart Container
        var chartContainer = document.createElement("div");
        chartContainer.setAttribute("id", "chart_container");

        //Creating Name//
        var meName = cover.cloneNode(false);
        meName.setAttribute("class", "me_name");
        meName.removeAttribute("style");
        meName.appendChild(inName);

        cover.appendChild(pictureCont); // appending user photo to BG
        cover.appendChild(meName); // appending user name to BG

        cover.appendChild(userBg); // appending BG to cover container
        cover.appendChild(coverWrapper);




        //---------Creating user details elements----------//

        var detailsList = document.createElement('ul');
        detailsList.setAttribute('class', 'user_details');

        for (j = 0; j < 4; j++) {

            var detailListItems = document.createElement('li');

            var iconContainer = document.createElement('span');
            iconContainer.setAttribute('class', 'detailsicon circle melist_' + j);

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
                    var formattedBday = document.createTextNode(bDayFormatter(inBday));
                    detailListItems.appendChild(formattedBday);
                    break;
            }

            detailListItems.appendChild(iconContainer);
            detailsList.appendChild(detailListItems);

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



                var list = document.createElement("li");
                list.setAttribute("class", "grid_items");
                list.style.backgroundColor = flatColors();

                var image = document.createElement("img");
                image.setAttribute("src", dostImg);
                image.setAttribute("class", "circle");
                image.setAttribute("width", "80");
                image.setAttribute("height", "80");

                var photoCont = document.createElement("div");
                photoCont.setAttribute("class", "pic circle transition");
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
                    $('#preloader').hide();
                    //$('.topnav').slideDown();
                }

                if (i === (dostLength - 4)) {
                    //$('#preloader').hide();
                    $('.topnav').slideDown('slow');
                }
            }



            //Masonry initiated//
            var container = document.querySelector('#container');
            msnry = new Masonry(container, {
                // options
                //isResizable: true,
                containerStyle: null,
                isAnimated: true,
                columnWidth: 195,
                "gutter": 4,
                transitionDuration: '0.6s',
                itemSelector: '.grid_items'
                //"isFitWidth": true
            });


            setTimeout(function() {
                highCharts(chartdat);

            }, 2000)

            setTimeout(function() {
                albums()

            }, 5000)
            //albums()

            $('#container').imagesLoaded().progress(function(instance, image) {
                var result = image.isLoaded ? 'loaded' : 'broken';
                if (result) {
                    $(image.img).parents('.grid_items').addClass('bigEntrance');
                    //$(image.img).fadeIn();
                }
            });


        });
    });
}


/*-------------------------Donut Chart------------------------------*/

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
        // if (chartdat[j] > 5) {
        datasum1.push([j, chartdat[j]]);
        // }

    }

    console.log("chartdat:" + chartdat);

    datasum1.sort(function(a, b) {
        return a[1] - b[1];
    }); // Sorted array

    console.log("datasum1:" + datasum1);

    var chartInput = datasum1.slice(Math.max(datasum1.length - 5, 1)) // last five elements only

    console.log('chartInput:' + chartInput);
    $(function() {

        Highcharts.setOptions({
            colors: ["#1abc9c", "#2980b9", "#d35400", "#f39c12", "#e74c3c"]
        });

        chart = new Highcharts.Chart({
            chart: {
                renderTo: chart_container,
                plotBackgroundColor: null,
                backgroundColor: null,
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
                hideDelay: 300,
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
                    borderWidth: 0,
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


/*-------------------------User Album - remove myAlbum and check ------------------------------*/

function albums() {

    users(function(myalbum) {

        var len = myalbum.albums.data.length;

        for (var i = 0; i < len; i++) {

            var albumid = myalbum.albums.data[i].id; //Album ID

            var albumname = document.createTextNode(myalbum.albums.data[i].name); //Album Name

            (function(albumid, albumname) {

                var albumPic = pic(albumid, function(albPic) {



                    var coverPic = albPic.data[0].source;

                    var list = document.createElement("li");
                    list.setAttribute("id", albumid);
                    list.setAttribute("onClick", "albumPictures(this.id)");

                    var image = document.createElement("img");
                    image.setAttribute("src", coverPic);
                    image.setAttribute("id", albumid);

                    var albumCoverCont = document.createElement("div");
                    albumCoverCont.setAttribute("class", "img_container transition");
                    albumCoverCont.appendChild(image);

                    var albumNameCont = document.createElement("div");
                    albumNameCont.setAttribute("class", "album_title");
                    albumNameCont.setAttribute("style", "background-color:" + flatColors() + ";");
                    albumNameCont.appendChild(albumname);





                    list.appendChild(albumCoverCont);
                    list.appendChild(albumNameCont);

                    document.getElementById("albums").appendChild(list);

                });

            })(albumid, albumname);
        }

    });
}

/*---------------------------Random Colors--------------------------*/

function flatColors() {
    var colors = ["#1abc9c", "#3498db", "#34495e", "#f39c12", "#c0392b", "#7f8c8d", "#2980b9", "#16a085", "#e74c3c", "#95a5a6", "#9b59b6", "#27ae60", "#8e44ad", "#d35400", "#e67e22"];
    var ran = Math.floor(Math.random() * colors.length);
    return colors[ran];
}

/*---------------------------Menu Hover function-------------------*/
var counter;
$('.leftnav').on({

    mouseenter: function() {
        clearTimeout(counter);
    },

    mouseleave: function() {
        counter = setTimeout(function() {
            $('.leftnav').removeClass('menupush');
        }, 5000);
    }
});

/*---------------------------Menu Click function-------------------*/

function menuClick(elemId) {

    switch (elemId) {

        case "showhide":
            $('.leftnav').toggleClass('menupush');
            break;

        case "home":
            if ($(".album_container").css('display') === 'block') {

                $(".album_container").slideUp().removeClass('slideRight');
                $("#container").show().addClass('slideRight');
                $(".grid_items").show().addClass('bigEntrance');
                msnry.layout();

            } else {
                $(".grid_items").show().addClass('bigEntrance');
                msnry.layout();
            }
            break;

        case "photos":
            $('#container').removeClass('slideRight').slideUp();
            $('.album_container').show().addClass('slideRight');
            break;

        case "fnu":
            var myLoci = $("#" + elemId).attr('data-location');
            myLoci = myLoci.split(',')[0];
            if ($(".album_container").css('display') === 'block') {
                $(".album_container").slideUp();
                $("#container").show().addClass('slideRight');

                setTimeout(function() {

                    $(".location").not(":contains(" + myLoci + ")").parent('li').removeClass('bigEntrance').hide();
                    msnry.layout();

                }, 600)

            } else {
                $(".location").not(":contains(" + myLoci + ")").parent('li').removeClass('bigEntrance').hide();
                msnry.layout();
            }
            break;

        case "close_gallery":
            $('.albumpopup').empty();
            $('.albumpopup').hide();
            break;

        case "theme":
            $('#' + elemId).toggleClass('light_bulb');
            $('body').toggleClass('light');
            break;

        case "logout":
            FB.ui({
                method: 'feed',
                link: 'http://socialike.heroku.com',
                picture: 'http://fbrell.com/f8.jpg',
                name: 'Facebook Dialogs',
                caption: 'Facebook wrapper using Node.js',
                description: 'Using Dialogs to interact with people.'
            }, function(response) {
                FB.logout(function(response) {
                    window.top.location = "/";
                });
            });

            break;


        default:
            break;
    }

}

/*-------------------------User Album Ends ------------------------------*/

function albumPictures(albumId) {

    pic(albumId, function(albumpict) {

        $('.albumpopup').show();
        $('.albumpopup').empty();

        $('.albumpopup').append('<div id="close_gallery" onClick="menuClick(this.id)">x</div><div class="galleria_container"><div id="galleria"></div></div>')

        for (var i = 0; i < albumpict.data.length; i++) {

            $("#galleria").append("<a href=" + albumpict.data[i].source + "> <img src=" + albumpict.data[i].picture + "> </a>");

        }

        Galleria.run('#galleria'); // Initialize Galleria

    });
}



/*-------------------------Logout Script ------------------------------*/

// function fbLogout() {
//     FB.logout(function(response) {
//         window.top.location = "/";
//     });
// }


function fbLogin() {
    FB.login(function(response) {
        if (response.authResponse) {

            window.top.location = "/home.html";
        }
    }, {
        scope: 'user_birthday,user_location,user_hometown,user_photos,friends_location'
    });
}

/*------------------------- Logout Script End -------------------------*/


/*-------------------------format Birthday ------------------------------*/

// function fbLogout() {
//     FB.logout(function(response) {
//         window.top.location = "/";
//     });
// }


function bDayFormatter(fbBday) {

if(fbBday != 'Birthday?'){
    //var date = fbBday;
    var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    month = fbBday.split('/')[0],
    date = fbBday.split('/')[1];

    return(date + ' ' + monthArray[month - 1]);
} else {

    return('Birthday?');
}

}

/*------------------------- format Birthday End -------------------------*/