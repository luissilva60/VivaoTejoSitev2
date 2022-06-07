var user = JSON.parse(window.localStorage.getItem('user'));
var botao = document.getElementById("dashboardButton")

console.log(user);

if (user.utilizador_role_id == 1) {
    botao.style.visibility("hidden")
} else botao.style.visibility("visible")


/*function userOption() {
    const dashboardButton = document.querySelector('dashboardButton');
    
    if (user.roles_id >= 2) {
        dashboardButton.style.visibility('visible') 
    } else botao.style.visibility('hidden') 
    
} */