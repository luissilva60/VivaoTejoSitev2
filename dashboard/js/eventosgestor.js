$(document).ready(

    function(){
        var user = JSON.parse(window.localStorage.getItem('user'));
        var username = document.getElementById("usernameDB");
        username.textContent = user.utilizador_name;
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/eventos",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);
                let tabela = document.querySelector("#tableeventos")
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
                    <th>${result[i].eventos_id}</th>
                    <th>${result[i].eventos_name}</th>
                    <th>${result[i].eventos_info}</th>
                    <th>${result[i].data}</th>
                    ${buttons}</tr>`
                }

                tabela.innerHTML = html
            }

        });
    }

);

$(document).ready(function () {
    $('#btnCriarEvento').on('click', function(event) {

        event.preventDefault();

        $("#btnCriarEvento").prop("disabled", true);
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/eventos/new",
            type: "POST",
            data: {
                name: jQuery('[name=eventos_name]').val(),
                info: jQuery('[name=eventos_info]').val(),
                date: jQuery('[name=eventos_date]').val(),
                local: jQuery('[name=eventos_local]').val(),
                localName: jQuery('[name=eventos_local_name]').val(),
                startTime: jQuery('[name=eventos_starttime]').val(),
                endTime: jQuery('[name=eventos_endtime]').val(),
                stateId: 1
            },
            dataType: 'json',
            success: function(result) {
                console.log("SUCCESS : ", result);
                $("#btnCriarEvento").prop("disabled", false);
            }
        });
    });
});