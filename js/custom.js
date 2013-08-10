/*---------------------------User Data-------------------------*/

function users(callback) {

    FB.api('/me?fields=name,username,birthday,hometown,albums,photos,location,picture.height(100).width(100),cover', function(response) {
        callback(response);

    });
}

/*------------------------Friends Data------------------------------------*/

function friends(callback) {

    FB.api('/me/friends?fields=name,username,location,name,bio,about,picture.height(80).width(80)', function(response) {

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

        var coverImg = document.createElement("img");


        coverWrapper.appendChild(coverImg);
        if (me.cover) {
            var inCover = me.cover.source;
            inCover = inCover.replace(/s720/i, 'l720');
            var inCoverPos = me.cover.offset_y;

            coverImg.setAttribute('src', inCover);
            coverImg.setAttribute('style', "top:" + inCoverPos + "; width:100%;");
        } else {

            coverImg.setAttribute("src", "http://www.coverbooth.com/uploads/covmg/the-three-choices-of-life-quotes-cool-facebook-timeline-covers.jpg");
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

        //Creating HighChart Container
        var chartContainer = document.createElement("div");
        chartContainer.setAttribute("id", "chart_container");

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

            var detailListItems = document.createElement('li')

            var iconContainer = document.createElement('span');
            iconContainer.setAttribute('class', 'detailsicon melist_' + j);

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



                var list = document.createElement("li");
                list.setAttribute("class", "grid_items");
                list.style.backgroundColor = flatColors();

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

                if (i === (dostLength - 1)) {
                    $('#preloader').fadeOut();
                }
            }



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


            setTimeout(function() {
                highCharts(chartdat);

            }, 2000)

            setTimeout(function() {
                albums()

            }, 10000)
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


/*-------------------------Pie Chart------------------------------*/

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
                    //image.setAttribute("width", "100");
                    //image.setAttribute("height", "100");

                    var coverCont = document.createElement("div");
                    coverCont.setAttribute("class", "img_container");
                    coverCont.appendChild(image);

                    var albumNameCont = document.createElement("div");
                    albumNameCont.setAttribute("class", "album_title");
                    albumNameCont.setAttribute("style", "background-color:" + flatColors() + ";");
                    albumNameCont.appendChild(albumname);





                    list.appendChild(coverCont);
                    list.appendChild(albumNameCont);

                    document.getElementById("albums").appendChild(list);

                });

            })(albumid, albumname);
        }

    });
}

/*---------------------------Random Colors--------------------------*/

function flatColors() {
    var colors = ["#1abc9c", "#3498db", "#34495e", "#f39c12", "#c0392b", "#7f8c8d", "#2c3e50", "#2980b9", "#16a085", "#e74c3c", "#95a5a6", "#9b59b6", "#27ae60", "#8e44ad", "#d35400", "#e67e22"];
    var ran = Math.floor(Math.random() * colors.length);
    return colors[ran];
}

/*---------------------------Menu Click function-------------------*/

function menuClick(elemId) {

    if (elemId === 'showhide') {
        $('.leftnav').toggleClass('menupush');
    }
    if (elemId === 'home') {
        $(".grid_items").show().addClass('bigEntrance');
        msnry.layout();
    }
    if (elemId === 'photos') {
        $('#container').slideUp(300);
        $('.album_container').addClass('slideLeft');
    }
    if (elemId === 'fnu') {
        var myLoci = $("#" + elemId).attr('data-location');
        console.log(myLoci);
        myLoci = myLoci.split(',')[0];
        $(".location").not(":contains(" + myLoci + ")").parent('li').removeClass('bigEntrance').hide();
        msnry.layout();
    }

}

/*-------------------------User Album Ends ------------------------------*/

function albumPictures(albumId) {

pic(albumId, function(albumpict) {


            $('.albumpopup').empty();

            $('.albumpopup').append('<div id="galleria"></div>')

            for (var i = 0; i < albumpict.data.length; i++) {

                $("#galleria").append("<a href=" + albumpict.data[i].source + "> <img src=" + albumpict.data[i].picture + "> </a>");

            }
            // Initialize Galleria
            Galleria.loadTheme('galleria.classic.min.js');
            Galleria.run('#galleria');

    });
}



/*-------------------------Logout Script ------------------------------*/

function fbLogout() {
    FB.logout(function(response) {
        window.location.reload();
    });
}

/*------------------------- Logout Script End -------------------------*/