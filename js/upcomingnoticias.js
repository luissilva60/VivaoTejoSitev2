const artigosUrl = 'https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/artigos'

async function getartigos() {
    const response = await fetch (artigosUrl);
    const artigos = await response.json();
    console.log(artigos);

    document.getElementById("artigoUmTitulo").textContent = artigos[0].artigos_title
    document.getElementById("artigoUmInfo").textContent = artigos[0].data 

    document.getElementById("artigoDoisTitulo").textContent = artigos[1].artigos_title
    document.getElementById("artigoDoisInfo").textContent = artigos[1].data

    document.getElementById("artigoTresTitulo").textContent = artigos[2].artigos_name
    document.getElementById("artigoTresInfo").textContent = artigos[2].data

    const artigo1Button = document.getElementById('artigo1btn');
    const artigo2Button = document.getElementById('artigo2btn');
    const artigo3Button = document.getElementById('artigo3btn');

    artigo1Button.addEventListener("click", function (){
        window.localStorage.setItem('artigo', JSON.stringify(artigos[0]));
    })
    artigo2Button.addEventListener("click", function (){
        window.localStorage.setItem('artigo', JSON.stringify(artigos[1]));
    })
    artigo3Button.addEventListener("click", function (){
        window.localStorage.setItem('artigo', JSON.stringify(artigos[2]));
    })

}

getartigos();