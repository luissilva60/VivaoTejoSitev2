const eventosUrl = 'https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/eventos/upcoming'

async function getEventos() {
    const response = await fetch (eventosUrl);
    const eventos = await response.json();
    console.log(eventos);
    console.log(eventos[0].eventos_name);
    console.log(eventos[0].data);
    document.getElementById("tituloEventoUm").textContent = eventos[0].eventos_name
    document.getElementById("textoEventoUm").textContent = eventos[0].data + "            LOCAL:  " + eventos[0].eventos_local_name
    document.getElementById("tituloEventoDois").textContent = eventos[1].eventos_name
    document.getElementById("textoEventoDois").textContent = eventos[1].data + "            LOCAL:  " + eventos[1].eventos_local_name
    document.getElementById("tituloEventoTres").textContent = eventos[2].eventos_name

    document.getElementById("textoEventoTres").textContent = eventos[2].data + "            LOCAL:  " + eventos[2].eventos_local_name

    const evento1Button = document.getElementById('evento1');
    const evento2Button = document.getElementById('evento2');
    const evento3Button = document.getElementById('evento3');
    evento1Button.addEventListener("click", function (){
        window.localStorage.setItem('evento', JSON.stringify(eventos[0]));
    })
    evento3Button.addEventListener("click", function (){
        window.localStorage.setItem('evento', JSON.stringify(eventos[1]));
    })
    evento2Button.addEventListener("click", function (){
        window.localStorage.setItem('evento', JSON.stringify(eventos[2]));
    })

}

getEventos();