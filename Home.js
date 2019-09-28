const DESIGN_URI = "http://localhost:4000/Designs";

$(document).ready(function (){
    //$('parallax').parallax();
    $('.modal').modal();
    var $display = $('.designs');
    
    //--front end HTML template Formating
    function tempFormat(design){
        $display.prepend(
            '<div class="col s12 m6 l4">' +
                '<div class="card hoverable" title="' + design.designName + ' ' + design.category + ' ' + design.Gender +'">' +
                    '<div class="card-image"><img style="height: 255px; width: 100%;" src="' + design.image + '"></div>' +
                        '<div class="card-content">' +
                        '<span class="center teal-text card-title">' + design.designName + '</span>' +
                            '<p class="">' + design.category + '</p>' +
                            '<p class="">' + design.Gender + '</p>' +
                            '<p class="">' + 'By: ' + design.Designer + '</p>' +
                            '<p class="">' + design.Description + '</p>' +
                        '</div>' +
                    '<div class="card-action">' +
                        '<button id="more" class="btn waves-effect waves-light teal modal-trigger">More Details</button>' +
                        '<div class="modal" id="more">' +
                            '<div class="modal-content">' +
                                '<h4>Description</h4>' +
                                '<p>' + design.Description + '< /p>' +
                            '</div>' +
                            '<div class="modal-footer">' +
                                '<a href="#" class="btn waves-effect waves-light modal-close teal">Close</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }

    $.ajax({
        type: 'GET',
        url: DESIGN_URI,
        success: function (designs) {
            //console.log('success', designs);
            $.each(designs, function (i, design) {
                //console.log(design.image);
                tempFormat(design);
            });
        }
    })

    //----search command event function----
    $('#search').keyup(function(){
        $display.html('');
        var searchField = $(this).val()
        console.log(searchField);
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
    // $display.delegate('#more', 'click', function(){
    //     var $dsgnDisplay = $(this).closest('div');
    //     console.log($dsgnDisplay.find('div.modal')[0]);
    //     $dsgnDisplay.find('div.modal').modal();
    // });
});