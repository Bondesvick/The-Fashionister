const DESIGN_URI = "http://localhost:4000/Designs/";

$(document).ready(function (){
    var $imh1Btn = $('#image3');
    $('#uploadBtn').on('click', function(){
        console.log($imh1Btn.val().substring(12, $imh1Btn.val().length));
        
    });
    

    var $display = $('.dispaly-designs');

    // The formated template to be appended
    function addDesign(design){
        $display.prepend(
        '<div class="card-panel hoverable teal">' +
            '<ul class="collapsible">'+
            '<li>'+
            '<div class="collapsible-header teal">'+
                '<h4 class="white-text center">' + design.designName + '</h4>' +
            '</div>'+

            '<div class="collapsible-body">' +
                '<h4 id="designName" class=" white-text designName noedit">' + design.designName + '</h4>' +
                '<div class="input-field">' +
                    '<input type="text" id="edit-dsgnName" class="edit-dsgnName white-text designName edit"/>' +
                    '<label for="edit-dsgnName" class="white-text edit">Edit Design Name</label>' +
                '</div>'+

                '<h5 class="white-text dsgnCategory noedit">' + design.category + '</h5>' +
                '<div class="input-field">'+
                    '<input type="text" id="edit-dsgnCategory" class="edit-dsgnName white-text dsgnCategory edit"/>' +
                    '<label for="edit-dsgnCategory" class="white-text edit">Edit Design Category</label>' +
                '</div>'+

                '<h5 class="white-text genderCategory noedit">' + design.Gender + '</h5>' +
                '<div class="input-field">' +
                    '<input type="text" id="edit-genderCategory" class="edit-dsgnName white-text genderCategory edit"/>' +
                    '<label for="edit-genderCategory" class="white-text edit">Edit Design Category</label>' +
                '</div>' +
                
                '<h5 class="white-text designerName noedit">' + 'By: ' + design.Designer + '</h5>' +
                '<div class="input-field">' +
                    '<input type="text" id="edit-dsgnerName" class="edit-dsgnName white-text designerName edit"/>' +
                    '<label for="edit-dsgnerName" class="white-text edit">Edit Designer Name</label>' +
                '</div>' +
                //image
                '<input type="file" id="image2" class="edit image2" accept="image/*" name="image2"/>' +

                '<p class="white-text descrbTxt noedit">' + design.Description + '</p>' +
                '<div class="input-field">'+
                        '<textarea id="edit-description" class="materialize-textarea white-text descrbTxt edit"></textarea>' +
                        '<label for="edit-description" class="white-text edit">Description</label>'+
                    '</div>'+

                '<div>' +
                    '<button id="' + design.id + '" class="btn waves-effect waves-dark loaded-btn editBtn noedit">Edit</button>' +
                    '<button data-id="' + design.id + '" class="btn waves-effect waves-dark delBtn noedit">Delete</button>' +
                    '<a href="#update1" data-id="' + design.id + '" class="btn waves-effect waves-dark saveBtn edit modal-trigger">Save Updates</a>' +
                    '<button data-id="' + design.id + '" class="btn waves-effect waves-dark cancelBtn edit">Cancel</button>' +
                '</div>' +

            '</div>' +
            '</li>'+
            '</ul>'+
        '</div>'
        ); //append ends
    };

    //Loading and displaying designs
    $.ajax({
        type: 'GET',
        url: DESIGN_URI,
        success: function(designs) {
            //console.log('success', designs);
            $.each(designs, function(i, design){
                addDesign(design);
                $('.collapsible').collapsible();
            });
        },// success ends
        error: function(){
            alert('error loading designs');
        }
    });


    // add new design with the click of th add button
    var $designName = $('#design-name');
    var $designCategories = $('#dsgn-categories');
    var $designGender = $('#dsgn-gender');
    var $designer = $('#designer');
    var $designDescription = $('#description');
    var $imh1Btn = $('.file-path');

    $('#add-btn').on('click', function(){
        let $success = true;
        var design ={
            designName: $designName.val(),
            category: $designCategories.val(),
            Gender: $designGender.val(),
            Designer: $designer.val(),
            Description: $designDescription.val(),
            image: 'Images/' + $imh1Btn.val()  //.substring(12, $imh1Btn.val().length)
        };

         //console.log($imh1Btn.val());
        // console.log($designCategories.val());
        // console.log($designGender.val());

        $.ajax({
            type: 'POST',
            url: DESIGN_URI,
            data: design,
            success: function(newDesign){
                // $('.modal').modal();
                addDesign(newDesign);
                $success = true;
            },
            error: function(){
                alert('error saving design!');
                $success = false;
            }
        });

        if($success == true){
            $('.modal').modal();
        }
    });


    // deleting designs
    $display.delegate('.delBtn','click', function () {

        var $cardDiv = $(this).closest('div.card-panel'); //.parent();
        console.log($cardDiv[0]);
        
        $.ajax({
            type: 'DELETE',
            url: DESIGN_URI + $(this).attr('data-id'),
            success: function(){
                $cardDiv.fadeOut(300, function(){
                    $(this).remove();
                })
            }
        });
    });


    // edit designs
    $display.delegate('.editBtn', 'click', function(){
        var $cardDiv = $(this).closest('div').parent();
        //.log($cardDiv.find('h4.designName').html());
        
        $cardDiv.find('input.designName').val( $cardDiv.find('h4.designName').html() );
        $cardDiv.find('input.dsgnCategory').val( $cardDiv.find('h5.dsgnCategory').html());
        $cardDiv.find('input.genderCategory').val($cardDiv.find('h5.genderCategory').html());
        $cardDiv.find('input.designerName').val($cardDiv.find('h5.designerName').html()
        .substring(4, $cardDiv.find('h5.designerName').html().length-1));
        $cardDiv.find('textarea.descrbTxt').val($cardDiv.find('p.descrbTxt').html())

        // $cardDiv.addClass('edit');
        $cardDiv.find('input.designName').removeClass('edit');
        $cardDiv.find('input.dsgnCategory').removeClass('edit');
        $cardDiv.find('input.genderCategory').removeClass('edit');
        $cardDiv.find('input.designerName').removeClass('edit');
        $cardDiv.find('textarea.descrbTxt').removeClass('edit');
        $cardDiv.find('a.saveBtn').removeClass('edit');
        $cardDiv.find('button.cancelBtn').removeClass('edit');
        $cardDiv.find('input.image2').removeClass('edit');

        $cardDiv.find('h4.designName').addClass('edit');
        $cardDiv.find('h5.dsgnCategory').addClass('edit');
        $cardDiv.find('h5.genderCategory').addClass('edit');
        $cardDiv.find('h5.designerName').addClass('edit');
        $cardDiv.find('p.descrbTxt').addClass('edit');
        $cardDiv.find('button.editBtn').addClass('edit');
        $cardDiv.find('button.delBtn').addClass('edit');
        //$cardDiv.addClass('edit');
    })

    $display.delegate('.cancelBtn', 'click', function(){
        var $cardDiv = $(this).closest('div').parent();

        // $cardDiv.removeClass('edit');
        $cardDiv.find('input.designName').addClass('edit');
        $cardDiv.find('input.dsgnCategory').addClass('edit');
        $cardDiv.find('input.genderCategory').addClass('edit');
        $cardDiv.find('input.designerName').addClass('edit');
        $cardDiv.find('textarea.descrbTxt').addClass('edit');
        $cardDiv.find('a.saveBtn').addClass('edit');
        $cardDiv.find('button.cancelBtn').addClass('edit');
        $cardDiv.find('input.image2').addClass('edit');

        $cardDiv.find('h4.designName').removeClass('edit');
        $cardDiv.find('h5.dsgnCategory').removeClass('edit');
        $cardDiv.find('h5.genderCategory').removeClass('edit');
        $cardDiv.find('h5.designerName').removeClass('edit');
        $cardDiv.find('p.descrbTxt').removeClass('edit');
        $cardDiv.find('button.editBtn').removeClass('edit');
        $cardDiv.find('button.delBtn').removeClass('edit');
    })


    $display.delegate('.saveBtn', 'click', function () {
        var $cardDiv = $(this).closest('div').parent();
        var $imagePath = $cardDiv.find('input.image2').val();
        var $success = true;
        var editedDesign = {
            designName: $cardDiv.find('input.designName').val(),
            category: $cardDiv.find('input.dsgnCategory').val(),
            Gender: $cardDiv.find('input.genderCategory').val(),
            Designer: $cardDiv.find('input.designerName').val(),
            Description: $cardDiv.find('textarea.descrbTxt').val(),
            image: 'Images/' + $imagePath.substring(12, $imagePath.length)
        };
        console.log($cardDiv.find('input.dsgnCategory').val());
        console.log('Images/' + $imagePath.substring(12, $imagePath.length));
        
        

        $.ajax({
            type: 'PUT',
            url: DESIGN_URI + $(this).attr('data-id'),
            data: editedDesign,
            success: function (designs) {
                $success = true;
                //console.log('success', designs);
                // $.each(designs, function (i, design) {
                //     addDesign(design);
               // });
            }, // success ends
            error: function () {
                $success = false;
            alert('error updating design');
            }
        });
        if ($success == true){
            $('.modal').modal();
        }
    })

    $('select').formSelect();
    $('textarea#description').characterCounter();
    $('.datepicker').datepicker();
    //$('.edit-categories').formSelect();
    // $('.modal').modal();
});

//M.AutoInit();