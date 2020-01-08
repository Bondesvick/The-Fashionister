const DESIGN_URI = "http://localhost:4000/Designs";

$(document).ready(function (){
    //$('parallax').parallax();
   // $('.modal').modal();
//    $(this).scroll(function(){
//     $('.toptop').addClass('parapara');
//    })
    var $display = $('.designs');
    //var $slides = $('.slides');
    var $carousel = $('.carousel');
    
    //--front end HTML template Formating
    function tempFormat(design){
        $display.prepend(
            '<div class="col s12 m6 l4 xl4">' +
                '<div class="card large hoverable tooltipped" data-tooltip="' + design.designName + ' ' + design.category + ' ' + design.Gender + '">' +
                    '<div class="card-image waves-effect waves-block waves-light"><img class=" activator" src="' + design.image + '">'+
                    '</div>' +
                        '<div class="card-content">' +
                        '<span class="center teal-text text-darken-4 card-title activator">' + design.designName + '</span>' +
                        '<p class="truncate">' + design.Description + '</p>' +
                        '</div>' +
                        
                    '<div class="card-action">' +
                        '<a href="#modal' + design.id + '" id="more" data-id = "' + design.id + '" class="btn waves-effect waves-light teal modal-trigger">More Details</a>' +
                        //MODAL
                        '<div class="modal" id="modal' + design.id + '">' +
                        '<div class="col l3 m12 s12">'+
                        '<img class="responsive-img materialboxed" src="' + design.image + '">' +
                        '<img class="responsive-img materialboxed" src="' + design.image + '">' +
                        '<img class="responsive-img materialboxed" src="' + design.image + '">' +
                        '</div>'+
                            '<div class="modal-content col l9">' +
                                '<h1 class="teal-text">' + design.designName + '</h1>' +
                                '<blockquote>'+
                                '<h6>Designed by: ' + design.Designer +'</h6>' +
                                '<h6>Designed for: ' + design.Gender + '</h6>' +
                                '<h6>Design Category: ' + design.category + '</h6>' +
                                '</blockquote>' +
                                '<h4>Design Description:</h4>' +
                                '<p class="flow-text">' + design.Description  + 
                                    '</br>' +
                                    '</br>' +
                                    design.Description +
                                    '</br>'+
                                     design.Description +
                                     '</br>' +
                                     design.Description +
                                     '</br>' +
                                     design.Description +
                                     '</br>' +
                                     design.Description +
                                '</p>' +
                            '</div>' +
                            '<div class="modal-footer">' +
                                '<a href="#!" class="btn waves-effect waves-light modal-close teal">Close</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' + //card action ends
                    //CAR REVEAL
                    '<div class="card-reveal">' +
                        '<span class="teal-text card-title">' + design.designName + '<i class="material-icons right">close</i></span>' +
                        '<blockquote>' +
                        design.category +
                        '</br>' +
                        design.Gender +
                        '</br>' +
                        'By: ' + design.Designer +
                        '</blockquote>' +
                        '<p>' + design.Description.substring(0, 150) + "..." + '</p>' +
                        '<div class="card-action">' +
                        '<a class="card-title" href="#!">Close</a>' +
                        '<a href="#modal' + design.id + '" id="more" class="teal-text modal-trigger" data-id = "' + design.id + '">More Details</a>' +
                        '</div>'+
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }

    //SLIDES
    // function slides(dsgnSlides){
    //     $slides.prepend(
    //         '<li>'+
    //             '<img class="" src="' + dsgnSlides.image + '">' +
    //         '</li>'
    //     );
    // }

    // CAROUSEL HTML Format
    function carousel(carousels){
        $carousel.prepend(
            '<a class="carousel-item tooltipped" href="#' + carousels.id + '!" data-tooltip="' + carousels.designName + ' ' + carousels.category + ' ' + carousels.Gender + ' ' + carousels.trendCount + ' views"> <img class="" src="' + carousels.image + '"></a>'
        )
    }

    // A function to load and append the Carousel
    function carouselTrending(){
        let trendArray = [];
        let trendHot = [];

        $.ajax({
            type: 'GET',
            url: DESIGN_URI,
            success: function(designs){

                // getting all the trendCount Values
                $.each(designs, function(i, design){
                    trendArray.push(design.trendCount);
                });

                // sorting the trendCount values
                trendArray.sort((a,b) => a - b);
                console.log(trendArray);
                
                // pushing the designs with the most popular trendCount to a new Array
                for(let range = 12; range > 0; range--){
                    trendHot.push(trendArray.pop());
                }
                console.log(trendHot);
                
                
                $.each(designs, function (i, design) {
                    //trendArray.push(design.trendCount);
                    //console.log(trendHot);
                    for(let a of trendHot){
                        //console.log(a);
                        
                        if(a === design.trendCount){
                            //console.log(design);
                            carousel(design);
                            $('.carousel').carousel();
                            a = null;
                            break;
                        }
                    }
                    // if(trendHot.any((a) => !(a < design))){
                    //     console.log(design);
                        
                    // }
                });
                
                // for(let a = 0; a < designs.length; a++) {
                //         console.log(designs[a].trendCount);
                        
                //         for(let i = 0; i < trendHot.length; i++){
                //             console.log(trendHot[i]);
                            
                //             if (trendHot[i] === designs[a].trendCount) {
                //                 carousel(design);
                                
                //     //         console.log(trendHot[i]);

                //                 trendHot[i] = null;
                //                 break;
                //             }
                //         } 
                //     //$('.carousel').carousel();
                // };
                 
            },
            error: function(){
                M.toast({
                    html: 'An error occured while trying to load the carousel ❗'
                });
            }
            
        });
    }
    carouselTrending();
    
    

    //let $slideNum = 12;
    //let connected ;
    $.ajax({
        type: 'GET',
        url: DESIGN_URI,
        success: function (designs) {
            //console.log('success', designs);
            $.each(designs, function (i, design) {
                //console.log(design.image);
                tempFormat(design);
                // if($slideNum > 0){
                //      //slides(design);
                     // carousel(design);
                //       $slideNum--;
                // }
                 //$('.carousel').carousel();
                //  $('.carousel.carousel-slider').carousel({
                //      fullWidth: false,
                //      indicators: true
                //  })
                //$('.slider').slider();
                $('.tooltipped').tooltip();
                $('.materialboxed').materialbox();
            });
            //connected = true;
            M.toast({
                html: 'Welcome!😎'
            })
        },
        error: function () {
          // connected = false;
            M.toast({
                html: 'Unable to connect to Database ❗'
            });
        }
    });
   // connected ? M.toast({html: 'Welcome!😎'}) : M.toast({html: 'Unable to connect to Database ❗'});
    

    //----search command event function----
    $('#search').keyup(function(){
        //clear the page first
        $display.html('');
        var searchField = $(this).val()
        //console.log(searchField);
        var expression = new RegExp(searchField, "i");
        $.ajax({
            type: 'GET',
            url: DESIGN_URI,
            success: function (designs) {
                $.each(designs, function (i, design) {
                    $('.materialboxed').materialbox();
                    $('.tooltipped').tooltip();
                    if (design.designName.search(expression) != -1 ||
                     design.category.search(expression) != -1 || 
                     design.Gender.search(expression) != -1) {
                        tempFormat(design);
                    }
                });
            }
        });
    });

    //------Category selection
    $('.toSelect').click(function(){
        //console.log($(this).attr('data-id'));

        let currentId = $(this).attr('data-id');

        //clear the page first
        $display.html('');

         $.ajax({
             type: 'GET',
             url: DESIGN_URI,
             success: function (designs) {
                 $.each(designs, function (i, design) {
                     
                     if (design.category == currentId ) {
                         tempFormat(design);
                         $('.tooltipped').tooltip();
                         $('.materialboxed').materialbox();
                     }
                 });
             }
         });
    });

    //------ Side Category selection ---------
    $('.toSelectSide').click(function () {
        //console.log($(this).attr('data-id'));

        let currentId = $(this).attr('data-id');

        //clear the page first
        $display.html('');

        $.ajax({
            type: 'GET',
            url: DESIGN_URI,
            success: function (designs) {
                $.each(designs, function (i, design) {

                    if (design.category == currentId) {
                        tempFormat(design);
                        $('.tooltipped').tooltip();
                        $('.materialboxed').materialbox();
                    }
                });
            }
        });

        //$('.sidenav').close();
    });

    //More Details Button event functions
     $display.delegate('#more','click', function(){
        
        $('.modal').modal();
        let dataId = $(this).attr('data-id');
        let currentRank = 0;
        let newTrend = {};
        //console.log(dataId);

         $.ajax({
             type: 'GET',
             url: DESIGN_URI,
             success: function (designs) {
                 $.each(designs, function (i, design) {
                     if(design.id == dataId){
                        currentRank = parseInt(design.trendCount);
                        console.log(currentRank);

                        newTrend.trendCount = currentRank + 1;
                        newTrend.designName = design.designName,
                        newTrend.category = design.category,
                        newTrend.Gender = design.Gender,
                        newTrend.Designer = design.Designer,
                        newTrend.Description = design.Description,
                        newTrend.image = design.image,

                        console.log(newTrend.trendCount);
                        return;
                     }
                 });

                  console.log(newTrend);
                 $.ajax({
                     type: 'PUT',
                     url: DESIGN_URI + '/' + dataId,
                     data: newTrend,
                     success: function () {

                     }
                 });
             }
         });

    });

    
    //Adding Scroll events to the document
    $(document).scroll(function () {
        $('#navDiv').addClass('navbar');
        $('#navDiv').removeClass('navbar-fixed');
    });

    $('.sidenav').sidenav();
    $('.tooltipped').tooltip();
    $('.fixed-action-btn').floatingActionButton({
        hoverEnabled: false
    });
    $('.dropdown-trigger').dropdown({coverTrigger: false, hover: true});
    $('.scrollspy').scrollSpy();
    // $('.autocomplete').autocomplete({
    //     data: {
    //         "Heels": null,
    //         "Skirt": null,
    //         "Suit": null,

    //     }
    // })
    //$('.slider').slider();
    //$('.carousel').carousel()
    // $('.carousel.carousel-slider').carousel({
    //     fullWidth: true
    // })
});