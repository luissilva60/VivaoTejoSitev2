const eventosUrl = 'https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/eventos'

    async function getEventos() {
      const response = await fetch (eventosUrl);
      const eventos = await response.json();
      console.log(eventos);
        console.log(eventos[0].eventos_name);
        console.log(eventos[0].data);
        document.getElementById("eventos_data1").textContent = eventos[0].data
        document.getElementById("eventos_name1").textContent = eventos[0].eventos_name
        document.getElementById("eventos_starttime1").textContent = eventos[0].eventos_starttime
        document.getElementById("eventos_endtime1").textContent = eventos[0].eventos_endtime
        document.getElementById("eventos_info1").textContent = eventos[0].eventos_info
        
        document.getElementById("eventos_data2").textContent = eventos[1].data
        document.getElementById("eventos_name2").textContent = eventos[1].eventos_name
        document.getElementById("eventos_starttime2").textContent = eventos[1].eventos_starttime
        document.getElementById("eventos_endtime2").textContent = eventos[1].eventos_endtime
        document.getElementById("eventos_info2").textContent = eventos[1].eventos_info

        //document.getElementById("eventos_id3").textContent = eventos[2].evento_titulo
        //document.getElementById("evento_titulo3").textContent = eventos[2].evento_titulo
        //document.getElementById("evento_descricao3").textContent = eventos[2].evento_descricao

    }

    getEventos();