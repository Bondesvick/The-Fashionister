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
            '<div class="col s12 m6 l4 xl3">' +
                '<div class="card large hoverable tooltipped" data-tooltip="' + design.designName + ' ' + design.category + ' ' + design.Gender + '">' +
                    '<div class="card-image waves-effect waves-block waves-light"><img class=" activator" src="' + design.image + '">'+
                    '</div>' +
                        '<div class="card-content">' +
                        '<span class="center teal-text text-darken-4 card-title activator">' + design.designName + '</span>' +
                        '<p class="truncate">' + design.Description + '</p>' +
                        '</div>' +
                        
                    '<div class="card-action">' +
                        '<a href="#modal'+ design.id+'" id="more" class="btn waves-effect waves-light teal modal-trigger">More Details</a>' +
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
                        '<a href="#modal' + design.id + '" id="more" class="teal-text modal-trigger">More Details</a>' +
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
            '<a class="carousel-item" href="#' + carousels.id + '!"> <img class="" src="' + carousels.image + '"></a>'
        )
    }

    let $slideNum = 10;
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
                    if (design.designName.search(expression) != -1 ||
                     design.category.search(expression) != -1 || 
                     design.Gender.search(expression) != -1) {
                        tempFormat(design);
                    }
                });
            }
        });
    });

     $display.delegate('#more','click', function(e){
         //e.preventDefault();
      //var $dsgnDisplay = $(this).closest('div');
      //console.log($dsgnDisplay.find('div.modal')[0]);
      //$dsgnDisplay.find('div.modal').modal();
     // $(this).modal();
     $('.modal').modal();
    });

    //$('.modal').modal();
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