$(document).ready(function () {
            const LOGIN_DATABASE_URI = "http://localhost:4000/Users";
            $('#logIn').click(function (e) {
                e.preventDefault();
                const userName = $('#username').val().trim();
                const userPwd = $('#password').val();
                //console.log(userName, userPwd);
                if (userName !== "" && userPwd !== "") {

                    $.ajax({
                        type: 'GET',
                        url: LOGIN_DATABASE_URI,
                        success: function (users) {
                            //console.log('success', designs);
                            $.each(users, function (i, user) {
                                if (user.UserName == userName && user.PassWord == userPwd) {
                                    window.location = "Admin.html";
                                    return;
                                }

                                if (user.UserName != userName) return $('#userNameError').html("Ivalid User Name");

                                if (user.PassWord != userPwd) return $('#pwError').html("Invalid Password");
                            });
                        }, // success ends
                        error: function () {
                            alert('error!');
                        }
                    });




                    // fetch(`${LOGIN_DATABASE_URI}`).then(response => response.json()).then(userData => {
                    //     const user = userData.find(user => user.UserName == userName)
                    //     if (!user) return $('#userNameError').html("Ivalid Email");

                    //     if (user.PassWord != userPwd) return $('#pwError').html("Invalid Password");

                    //     localStorage.setItem('user', JSON.stringify(user))
                    //     window.location = "Admin.html";
                    // })


                } else {
                    if (userName == "") {
                        $('#userNameError').html("Ivalid Username");
                    }
                    if (userPwd == "") {
                        $('#pwError').html("Invalid Password");
                    }
                }
            })
})