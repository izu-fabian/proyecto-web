
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
