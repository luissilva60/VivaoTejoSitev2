var artigo = JSON.parse(window.localStorage.getItem('artigo'));
console.log(artigo);
console.log(artigo.data);

document.getElementById("artigos_name").textContent = artigo.artigos_name
document.getElementById("artigos_info").textContent = artigo.artigos_info