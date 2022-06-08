var artigo = JSON.parse(window.localStorage.getItem('artigo'));
console.log(artigo);
console.log(artigo.data);

document.getElementById("artigos_title").textContent = artigo.artigos_title
/*document.getElementById("artigos_subtitle").textContent = artigo.artigos_subtitle*/
document.getElementById("artigos_info").textContent = artigo.artigos_info

document.getElementById("artigos_data").textContent = artigo.data