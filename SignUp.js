const LOGIN_DATABASE_URI = "http://localhost:4000/Users";

$(document).ready(function (){

    var $email = $('#email');
    var $username = $('#username');
    var $password = $('#password');

    $('#signUp').on('click', function (e) {
        e.preventDefault();
        var details ={
                email: $email.val(),
                UserName: $username.val(),
                PassWord: $password.val()
        };

        console.log(details)
        
        //$.post("http://localhost:4000/Users", details, alert('User has been created'));

        $.ajax({
                type: 'POST',
                url: LOGIN_DATABASE_URI,
                data: details,
                success: function () {
                    
                    alert('saved Successfully, now you can log in!');

                },
                error: (error) => {
                    alert('error saving!');
                }
        });
    });


});