/*CODIGO SEMAFORO DE FOERTAS*/ 
const colores = ['rojo', 'amarillo', 'verde'];
let indice = 0;
let presentacionOculta = false;

function cambiarLuz() {
  if (!presentacionOculta) {
    const presentacion = document.getElementById('presentacion');
    if (presentacion) {
      presentacion.style.display = 'none';
    }
    presentacionOculta = true;
  }

  // Apagar todas las luces
  colores.forEach(color => {
    document.getElementById(color).classList.remove('activa');
  });

  // Ocultar todos los banners
  colores.forEach(color => {
    document.getElementById('link-' + color).classList.remove('activa');
  });

  // Activar luz actual
  const colorActual = colores[indice];
  document.getElementById(colorActual).classList.add('activa');

  // Mostrar imagen correspondiente
  document.getElementById('link-' + colorActual).classList.add('activa');

  // Avanzar al siguiente color
  indice = (indice + 1) % colores.length;
}


/* CODIGO DEL NAVBAR*/
var itemOrig;
function despMenu(nombre,sn)
{
obj = document.getElementById(nombre);
if (sn)
     obj.style.visibility = "visible";
else
     obj.style.visibility = "hidden";
}
function destacar(obj, val)
{
if (val)
     {
     itemOrig = obj.style.backgroundColor;
     obj.style.backgroundColor="Aqua";
     }
else
     obj.style.backgroundColor= itemOrig;
}

/*cambiar la img al pasar cursor*/
positon1=1
position2=2
position3=3
position4=4
a=true
b=false

function cambiarPosition(boton_doc,zIndex)
{
  const Element =document.getElementById(boton_doc);
  if(boton_doc)
  {
    boton_doc.style.zIndex = boton_doc2

  }
}







/* CODIGO DEL CARRUSEL*/

const images=[
    "./imagenes/imagen1.avif",
    "./imagenes/imagen2.jpg",
    "./imagenes/imagen4.webp",
    "./imagenes/imagen5.jpg",
]
let currentIndex=0;

function showImage(index){
    const img=document.getElementById("carrusel.img");
    img.src=images[index];
}

function imagenSiguiente(){
    currentIndex=(currentIndex+1)%images.length;
    showImage(currentIndex);//muestra la imagen anterior
}
//CODIGO DEL NAVBAR
function imagenAnterior(){
    currentIndex=(currentIndex-1+images.length)%images.length;
    showImage(currentIndex);
}

function openNav(){
    document.getElementById("mobile-menu").style.width = "100%";
}

function closeNav(){
    document.getElementById("mobile-menu").style.width = "0%";
}