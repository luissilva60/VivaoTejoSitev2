$(document).ready(

    function(){
        var user = JSON.parse(window.localStorage.getItem('user'));
        var username = document.getElementById("usernameDB");
        username.textContent = user.utilizador_name;
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/cais",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);
                let tabela = document.querySelector("#tablecais")
                let html = ""
                let buttons = 
                `<td class="text-right py-0 align-middle">
                            <div class="btn-group btn-group-sm">
                              <a href="#" class="btn btn-info"><i class="fas fa-edit"></i></a>
                              <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                            </div>
                          </td>`;
                for (let i in result)
                {
                    html += `<tr>
                    <th>${result[i].cais_id}</th>
                    <th>${result[i].cais_name}</th>
                    ${buttons}</tr>`
                }

                tabela.innerHTML = html
            }

        });
    }

);

$(document).ready(function () {
    $('#btnCriarCais').on('click', function(event) {
  
        event.preventDefault();
  
        $("#btnCriarCais").prop("disabled", true);
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/cais/new",
            type: "POST",
            data: {
                name: jQuery('[name=cais_name]').val(),
                spot: jQuery('[name=cais_spot]').val(),
                info: jQuery('[name=cais_info]').val()               
            },
            dataType: 'json',
            success: function(result) {
                console.log("SUCCESS : ", result);
                $("#btnCriarCais").prop("disabled", false);
            }
        });
    });
  });