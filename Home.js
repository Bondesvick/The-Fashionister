const DESIGN_URI = "http://localhost:4000/Designs";

$(document).ready(function (){
    //$('parallax').parallax();
    var $display = $('.designs');
    
    
    

    $.ajax({
        type: 'GET',
        url: DESIGN_URI,
        success: function (designs) {
            //console.log('success', designs);
            $.each(designs, function (i, design) {
                console.log(design.image);
                $display.append(
                    '<div class="col s12 m6 l6">' +
                    '<div class="card hoverable">' +
                        
                        '<div class="card-image"><img style="height: 255px; width: 100%;" src="' + design.image + '"></div>' +
                        '<div class="card-content">'+
                        
                            '<span class="center teal-text card-title">' +design.designName + '</span>' +
                            
                            '<p class="">' + design.category + '</p>' +
                            '<p class="">' + design.Gender + '</p>' +
                            '<p class="">' + 'By: ' + design.Designer + '</p>' +
                            '<p class="">' + design.Description + '</p>' +
                            
                            
                        '</div>' +
                        '<div class="card-action">'+
                            '<a href="#more"class="btn teal modal-trigger">More Details</a>'+
                            '<div class="modal" id="more">'+
                                '<div class="modal=content">'+
                                    '<h4>Description</h4>'+
                                    '<p>' + design.Description +'< /p>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                '<a hfreh="#" class="btn modal-closs teal">Close</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '</div>'
                )
            });
        }
    })

    $('.modal').modal();
});