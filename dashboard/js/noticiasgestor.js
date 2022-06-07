$(document).ready(

    function(){
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/artigos",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);
                let tabela = document.querySelector("#tablenoticias")
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
                    <th>${result[i].artigos_id}</th>
                    <th>${result[i].artigos_title}</th>
                    <th>${result[i].data}</th>
                    <th>${result[i].utilizador_name}</th>
                    ${buttons}</tr>`
                }

                tabela.innerHTML = html
            }

        });
    }

);

$(document).ready(function () {
    $('#btnCriarArtigo').on('click', function(event) {

        event.preventDefault();

        $("#btnCriarArtigo").prop("disabled", true);
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/artigos/new",
            type: "POST",
            data: {
                title: jQuery('[name=artigos_title]').val(),
                subtitle: jQuery('[name=artigos_subtitle]').val(),
                info: jQuery('[name=artigos_info]').val(),
                date: jQuery('[name=artigos_date]').val(),
                utId: jQuery('[name=artigos_ut_id]').val()
            },
            dataType: 'json',
            success: function(result) {
                console.log("SUCCESS : ", result);
                $("#btnCriarArtigo").prop("disabled", false);
            }
        });
    });
});