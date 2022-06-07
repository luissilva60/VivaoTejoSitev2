var user = JSON.parse(window.localStorage.getItem('user'));
var botao = document.getElementById(id="dashboardButton")

if (user.roles_id >= 2) {
    botao.style.visibility(hidden) 
} 


/*function userOption() {
    const dashboardButton = document.querySelector('dashboardButton');
    
    if (user.roles_id >= 2) {
        dashboardButton.style.visibility('visible') 
    } else botao.style.visibility('hidden') 
    
} */