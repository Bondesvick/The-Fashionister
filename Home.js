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
    function carousel(carousels){
        $carousel.prepend(
            '<a class="carousel-item tooltipped" href="#' + carousels.id + '!" data-tooltip="' + carousels.designName + ' ' + carousels.category + ' ' + carousels.Gender + '"> <img class="" src="' + carousels.image + '"></a>'
        )
    }

    function carouselTrending(){
        let trendCount = 0;
        let trendArray = [];
        let trendHot = [];

        $.ajax({
            type: 'GET',
            url: DESIGN_URI,
            success: function(designs){
                $.each(designs, function(i, design){
                    trendArray.push(design.trendCount);
                });
                console.log(trendArray);
                
            },
            error: function(){

            }
            
        })
    }
    carouselTrending();

    let $slideNum = 12;
    //let connected ;
    $.ajax({
        type: 'GET',
        url: DESIGN_URI,
        success: function (designs) {
            //console.log('success', designs);
            $.each(designs, function (i, design) {
                //console.log(design.image);
                tempFormat(design);
                if($slideNum > 0){
                     //slides(design);
                     carousel(design);
                      $slideNum--;
                }
                $('.carousel').carousel();
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
                        currentRank = design.trendCount;
                        console.log(currentRank);
                        newTrend.trendCount = currentRank + 1;
                        console.log(newTrend.trendCount);
                        
                        return;
                     }
                 });

                  console.log(newTrend);
                 $.ajax({
                     type: 'PUT',
                     url: DESIGN_URI + dataId,
                     data: newTrend,
                     success: function () {

                     }
                 });
             }
         });

        function updateTrend(trend){
            let newTrend ={

            }

            $.ajax({
                type: 'GET',
                url: DESIGN_URI,
                success: function (designs) {
                    $.each(designs, function(i, design){
                        console.log(design.trendCount);
                    });
                    
                }
            });

            // $.ajax({
            //     type: 'PUT',
            //     url: DESIGN_URI + dataId,
            //     data : newTrend,
            //     success: function () {

            //     }
            // });
        }
        

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