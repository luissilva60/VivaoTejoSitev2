$(document).ready(

    function(){
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
                "<button type='button' class='btn btn-danger'>Action</button>" +
                "<button type='button' class='btn btn-danger dropdown-toggle dropdown-hover dropdown-icon' data-toggle='dropdown'>" +
                  "<span class='sr-only'>Toggle Dropdown</span>" +
                "</button>" +
                    "<div class='dropdown-menu' role='menu'>" +
                        "<a class='dropdown-item' href='#'>Action</a>" +
                        "<a class='dropdown-item' href='#'>Another action</a>" +
                        "<a class='dropdown-item' href='#'>Something else here</a>" +
                    "<div class='dropdown-divider></div>" +
                    "<a class='dropdown-item' href='#'>Separated link</a>" +
                    "</div>" +
                "</div>" +
                "<div class='btn-group'>" +
                "<button type='button' class='btn btn-success'>Action</button>" +
                "<button type='button' class='btn btn-success dropdown-toggle dropdown-hover dropdown-icon' data-toggle='dropdown'>" +
                  "<span class='sr-only'>Toggle Dropdown</span>" +
                "</button>" +
                    "<div class='dropdown-menu' role='menu'>" +
                        "<a class='dropdown-item' href='#'>Action</a>" +
                        "<a class='dropdown-item' href='#'>Another action</a>" +
                        "<a class='dropdown-item' href='#'>Something else here</a>" +
                    "<div class='dropdown-divider'></div>" +
                    "<a class='dropdown-item' href='#'>Separated link</a>" +
                    "</div>" +
                "</div>" +
                "<div class='btn-group'>" +
                "<button type='button' class='btn btn-warning'>Action</button>" +
                "<button type='button' class='btn btn-warning dropdown-toggle dropdown-hover dropdown-icon' data-toggle='dropdown'>" +
                  "<span class='sr-only'>Toggle Dropdown</span>" +
                "</button>" +
                    "<div class='dropdown-menu' role='menu'>" +
                        "<a class='dropdown-item' href='#'>Action</a>" +
                        "<a class='dropdown-item' href='#''>Another action</a>" +
                        "<a class='dropdown-item' href='#'>Something else here</a>" +
                    "<div class='dropdown-divider'></div>" +
                    "<a class='dropdown-item' href='#'>Separated link</a>" +
                    "</div>" +
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