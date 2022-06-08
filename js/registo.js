/* const form = document.getElementById("form");
            const username = document.getElementById("username");
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const password2 = document.getElementById("password2");

            //Show input error messages
            function showError(input, message) {
                const formControl = input.parentElement;
                formControl.className = "form-control error";
                const small = formControl.querySelector("small");
                small.innerText = message;
            }

            //show success colour
            function showSucces(input) {
                const formControl = input.parentElement;
                formControl.className = "form-control success";
            }

            //check email is valid
            function checkEmail(input) {
                const re =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(input.value.trim())) {
                    showSucces(input);
                } else {
                    showError(input, "Email is not invalid");
                }
            }

            //checkRequired fields
            function checkRequired(inputArr) {
                inputArr.forEach(function (input) {
                    if (input.value.trim() === "") {
                        showError(input, `${getFieldName(input)} is required`);
                    } else {
                        showSucces(input);
                    }
                });
            }

            //check input Length
            function checkLength(input, min, max) {
                if (input.value.length < min) {
                    showError(
                        input,
                        `${getFieldName(input)} must be at least ${min} characters`
                    );
                } else if (input.value.length > max) {
                    showError(
                        input,
                        `${getFieldName(input)} must be less than ${max} characters`
                    );
                } else {
                    showSucces(input);
                }
            }

            //get FieldName
            function getFieldName(input) {
                return input.id.charAt(0).toUpperCase() + input.id.slice(1);
            }

            // check passwords match
            function checkPasswordMatch(input1, input2) {
                if (input1.value !== input2.value) {
                    showError(input2, "Passwords do not match");
                }
            }

            //Event Listeners
            form.addEventListener("submit", function (e) {
                e.preventDefault();

                checkRequired([username, email, password, password2]);
                checkLength(username, 3, 15);
                checkLength(password, 6, 25);
                checkEmail(email);
                checkPasswordMatch(password, password2);
            }); */

$(document).ready(function () {
    $('#btnRegistar').on('click', function (event) {
        // prevent form default behaviour
        event.preventDefault();

        // disabled the submit button
        $("#btnRegistar").prop("disabled", true);
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/utilizador/new",
            type: "POST",
            data: {
                name: jQuery('[name=utilizador_name]').val(),
                bdate: jQuery('[name=utilizador_bdate]').val(),
                email: jQuery('[name=utilizador_email]').val(),
                gender: jQuery('[name=utilizador_gender]').val(),
                password: jQuery('[name=utilizador_password]').val()
            },
            dataType: 'json',
            success: function (result) {
                console.log("SUCCESS : ", result);
                window.location.href = "login.html"
                $("#btnRegistar").prop("disabled", false);
                //window.location.href = "file:///C:/Users/pedro/OneDrive/Ambiente%20de%20Trabalho/MarinhaDoTejo/login.html"
            }
        });
    });
});

