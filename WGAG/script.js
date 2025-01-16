const temas = document.getElementById('temas');
const root = document.documentElement; 
const botonFondo = document.getElementById('botonFondo');
const containerFondo = document.getElementById('containerFondo');
const click = document.getElementById('click');
let contador = 0;
let contador2 = 0;
const progreso = document.getElementById('progreso');
const progreso2 = document.getElementById('progreso%');
const hora = new Date().getHours();
const saludo = document.getElementById('Bienvenida');
const texto = document.getElementById('texto');
const body = document.getElementById('body');
let px = 16;
let estaAmpliado = false;
const botonArriba = document.getElementById('botonArriba');



//cambiar tema
const guardado = localStorage.getItem('theme');
if (guardado) {
    root.classList.add(guardado); 
}

// Función para alternar el tema
temas.addEventListener('click', function() {
    if (root.classList.contains('tema-oscuro')) {
        root.classList.remove('tema-oscuro');
        localStorage.setItem('theme', ''); 
    } else {
        root.classList.add('tema-oscuro');
        localStorage.setItem('theme', 'tema-oscuro'); 
    }
});

//Funcion para cambiar color del fondo 

function colorRamdom() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    containerFondo.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

if (botonFondo) {
    botonFondo.addEventListener('click', colorRamdom);
}


//contador de cliks
click.addEventListener('click', function(){
    contador++;
    document.getElementById('contador').textContent = 'Clicks: ' + contador; 
})


//Barra progreso 
window.addEventListener('scroll', function() {
    let scroll = window.scrollY; 
    let scrollAbajo = document.documentElement.scrollHeight - window.innerHeight; 
    let porcentaje = (scroll / scrollAbajo) * 100;

    if (contador2 < 100) {
        contador2 = Math.floor(porcentaje); 
        progreso.value = contador2; 
        progreso2.innerHTML = contador2 + '%';
    } else{
        contador2 = Math.max(100 - Math.floor(porcentaje));
    }
    //codigo para el boton para subir
    if (contador2 > 50) {
        containerBotonArriba.style.display = 'block'; 
    } else {
        containerBotonArriba.style.display = 'none'; 
    }
});

//Dar la bienvenida

function bienvenida(){
    if (hora>=6 && hora<12){
        saludo.textContent = 'Buenos Dias!!!'
    } else if (hora>=12 && hora<20){
        saludo.textContent = 'Buenas Tardes!!!'
    } else{
        saludo.textContent = 'Buenas Noches!!!'
    }
}



//Aumentar texto
    texto.addEventListener('click', function(){
        if (estaAmpliado) {
            px = 16; 
            estaAmpliado = false; 
        } else {
            px = px+4;
            estaAmpliado = true; 
        }
        body.style.fontSize = `${px}px`; 
    });
    


//Boton arriba
botonArriba.addEventListener('click', function() {
    body.scrollIntoView({ behavior: 'smooth' });
});

bienvenida();

//lectura de pagina

document.getElementById('lectura').addEventListener('click', function() {
    const texto = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(texto);

    utterance.lang = 'es-ES'; 
    utterance.rate = 1; 
    utterance.pitch = 1; 

    
    window.speechSynthesis.speak(utterance);
});
