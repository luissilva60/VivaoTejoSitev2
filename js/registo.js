$(document).ready(function () {
    $('#btnRegistar').on('click', function(event) {

        // prevent form default behaviour
        event.preventDefault();

        // disabled the submit button
        $("#btnRegistar").prop("disabled", true);
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://quatrainserver.herokuapp.com/api/users",
            type: "POST",
            data: {
                name: jQuery('[name=utilizador_name]').val(),
                bdate: jQuery('[name=utilizador_bdate]').val(),
                gender: jQuery('[name=utilizador_gender]').val(),
                email: jQuery('[name=utilizador_email]').val(),
                password: jQuery('[name=utilizador_password]').val()
            },
            dataType: 'json',
            success: function(result) {
                console.log("SUCCESS : ", result);
                $("#btnRegistar").prop("disabled", false);
                window.location.href = "login.html"
            }
        });
    });
});

