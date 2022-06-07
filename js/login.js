$(document).ready(function() {





    $('#loginForm').on('submit', function (event){

        // prevent form default behaviour
        event.preventDefault();

        // disabled the submit button
        $("#btnLogin").prop("disabled", true);

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/utilizador/login",
            type: "POST",
            data: {
                email: jQuery('[name=email]').val(),
                password: jQuery('[name=password]').val()
            },

            dataType: 'json',

            error: function (result){
                alert("Username or Password are Incorrect")
                console.log("ERROR: ", result)

                $("#btnLogin").prop("disabled", false);
            },
            success: function(result) {
                console.log("SUCCESS : ", result);
                window.location.href = "LoggedIn.html"



                window.localStorage.setItem('user', JSON.stringify(result));
                $("#btnLogin").prop("disabled", false);
            }

        });

    });




    $('#btnLogin').on('click', function(event) {

        // prevent form default behaviour
        event.preventDefault();

        // disabled the submit button
        $("#btnLogin").prop("disabled", true);

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/utilizador/login",
            type: "POST",
            data: {
                email: jQuery('[name=email]').val(),
                password: jQuery('[name=password]').val()
            },

            dataType: 'json',

            error: function (result){
                alert("Username or Password are Incorrect")
                console.log("ERROR: ", result)

                $("#btnLogin").prop("disabled", false);
            },
            success: function(result) {
                console.log("SUCCESS : ", result);
                window.location.href = "LoggedIn.html"



                window.localStorage.setItem('user', JSON.stringify(result));
                $("#btnLogin").prop("disabled", false);
            }

        });

    });



});