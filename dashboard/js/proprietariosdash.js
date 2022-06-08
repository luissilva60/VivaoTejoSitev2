$(document).ready(

    function(){
        var user = JSON.parse(window.localStorage.getItem('user'));
        var username = document.getElementById("usernameDB");
        username.textContent = user.utilizador_name;
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/utilizador/proprietarios",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);
                let tabela = document.querySelector("#tableproprietarios")
                let html = ""
                let buttons = 
                "<td><div class='btn-group'>" +
                "<button type='button' class='btn btn-danger'>Apagar</button>" +
                "</div>" +
                "<div class='btn-group'>" +
                "<button type='button' class='btn btn-warning'>Role Down</button>" +
                "</div>" +
                "<div class='btn-group'>" +
                "<button type='button' class='btn btn-success'>Role Up</button>" +
                "</div>" +
                "<div class='btn-group'>" ;
                for (let i in result)
                {
                    html += `<tr>
                    <th>${result[i].utilizador_id}</th>
                    <th>${result[i].utilizador_name}</th>
                    <th>${result[i].bdate}</th>
                    <th>${result[i].utilizador_gender}</th>
                    <th>${result[i].utilizador_email}</th>
                    ${buttons}</tr>`
                }

                tabela.innerHTML = html
            }

        });
    }

);