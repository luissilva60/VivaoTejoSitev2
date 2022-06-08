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
                console.log("aaaa"+ obj);

                let tabela = document.querySelector("#tableembpending")
                let html = ""

                for (let i in result)
                {
                    var contentString = result[i].lat + ", " + result[i].long;
                    html += `<tr>
                    <th>${result[i].embarcacao_id}</th>
                    <th>${result[i].embarcacao_name}</th>
                    <th>${result[i].embarcacao_info}</th>
                    <th>${result[i].utilizador_name}</th>
                    <th>${contentString} </th>
                    <td><div class="btn-group">
                          <button type="button" id="btnRejeitar" onclick="rejeitar(${result[i].embarcacao_id})" class="btn btn-danger">Rejeitar</button>
                        </div>
                        <div class="btn-group">
                          <button type="button" onclick="aceitar(${result[i].embarcacao_id})" id="btnAceitar" class="btn btn-success">Aceitar</button>
                        </div></tr>`
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
              rota: 'LINESTRING(38.65475142061314 -8.995903878996437,38.65762804191019 -9.002536689744177,38.66714851297249 -9.010714991294767,38.678323006908926 -9.023183234118004,38.692853811334636 -9.066632193034929,38.7496420393992 -9.053848038098723, 38.79279172202453 -9.035704781063428)'
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
    url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/update/verification/" + id,
    type: "PUT",
    dataType: 'json',
    success: function(result) {
        console.log("SUCCESS : ", result);
        $("#btnAceitar").prop("disabled", false);
        alert("Embarcação Aceite")
    }
  });
}

function rejeitar(id){
  var barcos = JSON.parse(window.localStorage.getItem('barcos'));
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/" + id,
    type: "DELETE",
    dataType: 'json',
    success: function(result) {
      console.log("SUCCESS : ", result);
      $("#btnAceitar").prop("disabled", false);
      alert("Embarcação Rejeitada")
    }
  });
}

