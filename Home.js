const DESIGN_URI = "http://localhost:4000/Designs";

$(document).ready(function (){
    //$('parallax').parallax();
   // $('.modal').modal();
//    $(this).scroll(function(){
//     $('.toptop').addClass('parapara');
//    })
    var $display = $('.designs');
    //var $slides = $('.slides');
    
    //--front end HTML template Formating
    function tempFormat(design){
        $display.prepend(
            '<div class="col s12 m4 l3">' +
                '<div class="card large z-depth-1 hoverable tooltipped" data-tooltip="' + design.designName + ' ' + design.category + ' ' + design.Gender + '">' +
                    '<div class="card-image waves-effect waves-block waves-light"><img style="height: 255px; width: 100%;" src="' + design.image + '"></div>' +
                        '<div class="card-content">' +
                        '<span class="center teal-text card-title">' + design.designName + '</span>' +
                            '<p class="">' + design.category + '</p>' +
                            '<p class="">' + design.Gender + '</p>' +
                            '<p class="">' + 'By: ' + design.Designer + '</p>' +
                            '<p class="truncate">' + design.Description + '</p>' +
                        '</div>' +
                    '<div class="card-action">' +
                        '<a href="#modal'+ design.id+'" id="more" class="btn waves-effect waves-light teal modal-trigger">More Details</a>' +
                        //MODAL
                        '<div class=" modal modal-fixed-footer" id="modal' + design.id + '">' +
                            '<div class="modal-content">' +
                                '<h5>' + design.designName + '</h5>' +
                                '<h6>Designed by: ' + design.Designer +'</h6>' +
                                '<h6>Designed for: ' + design.Gender + '</h6>' +
                                '<h6>Design Category: ' + design.category + '</h6>' +
                                '<h4>Design Description</h4>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                                '<p>' + design.Description + '</p>' +
                            '</div>' +
                            '<div class="modal-footer">' +
                                '<a href="#!" class="btn waves-effect waves-light modal-close teal">Close</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }

    //SLIDES
    // function slides(dsgnSlides){
    //     $slides.prepend(
    //         '<li>'+
    //             '<img src="'+dsgnSlides.image+'">' +
    //         '</li>'
    //     );
    // }

    $.ajax({
        type: 'GET',
        url: DESIGN_URI,
        success: function (designs) {
            //console.log('success', designs);
            $.each(designs, function (i, design) {
                //console.log(design.image);
                tempFormat(design);
                //slides(design);
                //$('.slider').slider();
                $('.tooltipped').tooltip();
                $('.materialboxed').materialbox();
            });
        }
    })

    //----search command event function----
    $('#search').keyup(function(){
        $display.html('');
        var searchField = $(this).val()
        //console.log(searchField);
        var expression = new RegExp(searchField, "i");
        $.ajax({
            type: 'GET',
            url: DESIGN_URI,
            success: function (designs) {
                $.each(designs, function (i, design) {
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
    $('.fixed-action-btn').floatingActionButton();
    $('.dropdown-trigger').dropdown({coverTrigger: false, hover: true});
    $('.scrollspy').scrollSpy();
    // $('.slider').slider();
});