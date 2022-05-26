var evento = JSON.parse(window.localStorage.getItem('evento'));
console.log(evento);
console.log(evento.data);







document.getElementById("eventos_data").textContent = "Data: " + evento.data
console.log(evento.data)
document.getElementById("eventos_name").textContent = evento.eventos_name
document.getElementById("eventos_starttime").textContent = evento.eventos_starttime
document.getElementById("eventos_endtime").textContent = evento.eventos_endtime
document.getElementById("eventos_info").textContent = evento.eventos_info


//document.getElementById("eventos_id3").textContent = eventos[2].evento_titulo
//document.getElementById("evento_titulo3").textContent = eventos[2].evento_titulo
//document.getElementById("evento_descricao3").textContent = eventos[2].evento_descricao



