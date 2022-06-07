$(document).ready(

    function(){
        var user = JSON.parse(window.localStorage.getItem('user'));
        var username = document.getElementById("usernameDB");
        username.textContent = user.utilizador_name;

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/prop/" + user.utilizador_id,
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);
                let tabela = document.querySelector("#tablemybarcos")
                let html = ""
                let buttons = 
                `<td class="project-actions text-right">
                        <a class="btn btn-tool btn-sm" href="#">
                            <i class="fas fa-minus">
                            </i>
                            Esconder
                        </a>
                        <a class="btn btn-info btn-sm" href="#">
                            <i class="fas fa-pencil-alt">
                            </i>
                            Editar
                        </a>
                        <a class="btn btn-danger btn-sm" href="#">
                            <i class="fas fa-trash">
                            </i>
                            Apagar
                        </a>
                    </td>`;
                for (let i in result)
                {
                    html += `<tr>
                    <th>${result[i].embarcacao_id}</th>
                    <th>${result[i].embarcacao_name}</th>
                    <th>${result[i].embarcacao_info}</th>
                    <th>${result[i].embarcacao_prop_id}</th>
                    ${buttons}</tr>`
                }

                tabela.innerHTML = html
            }

        });
    }

);