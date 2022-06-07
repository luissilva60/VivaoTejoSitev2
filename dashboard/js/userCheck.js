function check(){
    var user = JSON.parse(window.localStorage.getItem('user'));
    var username = document.getElementById("usernameDB");
    var gerirUsers = document.getElementById("gerirUsers");
    var gerirCont = document.getElementById("gerirCont");
    var gerirEmb = document.getElementById("gerirEmb");
    var gerirMapa = document.getElementById("gerirMapa");

    console.log(user);
    console.log(user.utilizador_role_id);
    
    username.textContent = user.utilizador_name;

    if (user.utilizador_role_id == 2) {
        gerirUsers.style.display = "block";
        gerirCont.style.display = "block";
        gerirEmb.style.display = "block";
        gerirMapa.style.display = "block";
    } 
    else if (user.utilizador_role_id == 3) {
        gerirCont.style.display = "block";
    }
    else if (user.utilizador_role_id == 4) {
        gerirEmb.style.display = "block";;
    }
    
}
check();