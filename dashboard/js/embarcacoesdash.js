$(document).ready(

    function(){
        var user = JSON.parse(window.localStorage.getItem('user'));
        var username = document.getElementById("usernameDB");
        username.textContent = user.utilizador_name;
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/pending",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                window.localStorage.setItem('barcos', JSON.stringify(result));
                console.log(obj);
                let tabela = document.querySelector("#tableembpending")
                let html = ""
                let buttons = 
                `<td><div class="btn-group">
                          <button type="button" id="btnRejeitar" class="btn btn-danger">Rejeitar</button>
                        </div>
                        <div class="btn-group">
                          <button type="button" onclick="aceitar(${result.embarcacao_id})"id="btnAceitar" class="btn btn-success">Aceitar</button>
                        </div>`;
                for (let i in result)
                {
                    var contentString = result[i].lat + ", " + result[i].long;
                    html += `<tr>
                    <th>${result[i].embarcacao_id}</th>
                    <th>${result[i].embarcacao_name}</th>
                    <th>${result[i].embarcacao_info}</th>
                    <th>${result[i].utilizador_name}</th>
                    <th>${contentString} </th>
                    ${buttons}</tr>`
                }

                tabela.innerHTML = html
            }

        });
    }

);

$(document).ready(function () {
  $('#btnCriarEmbarcacao').on('click', function(event) {

      event.preventDefault();

      var user = JSON.parse(window.localStorage.getItem('user'));
      console.log(user.utilizador_id);

      $("#btnCriarEmbarcacao").prop("disabled", true);
      $.ajax({
          url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/new",
          type: "POST",
          data: {
              name: jQuery('[name=embarcacao_name]').val(),
              info: jQuery('[name=embarcacao_info]').val(),
              propId: user.utilizador_id,
              pos: jQuery('[name=embarcacao_pos]').val(),
              rota: jQuery('[name=rota]').val()
          },
          dataType: 'json',
          success: function(result) {
              console.log("SUCCESS : ", result);
              $("#btnCriarEmbarcacao").prop("disabled", false);
          }
      });
  });
});

$(document).ready(function () {

  $('#btnAceitar').on('click', function(event) {

      event.preventDefault();

      $("#btnAceitar").prop("disabled", true);
  });
});

function aceitar(id){
  var barcos = JSON.parse(window.localStorage.getItem('barcos'));
    $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/update/verification/" + barcos.embarcacao_id,
    type: "PUT",
    dataType: 'json',
    success: function(result) {
        console.log("SUCCESS : ", result);
        $("#btnAceitar").prop("disabled", false);
        alert("Embarcação Aceite")
    }
  });
}