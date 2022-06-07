    function check(){
    var user = JSON.parse(window.localStorage.getItem('user'));
    var botao = document.getElementById("dashboardButton")
    

    console.log(user);
    console.log(user.utilizador_role_id);

    if (user.utilizador_role_id >= 2) {
        botao.style.display = "block";
    } else 
    botao.style.display = "hidden";
}
check();
