class Inventario{
    constructor(){
        this.arreglo = [];
    }
agregar(item){
    if(this.arreglo.length == 0){
        this.arreglo.push(item);
        return true;
    }
    let aux = this.arreglo[this.arreglo.length-1];
    for(let i = 0; i < this.arreglo.length; i++){
        if(item.codigo == this.arreglo[i].codigo){
            return false;
        }
        if(item.codigo < this.arreglo[0].codigo){
            this.arreglo.push(aux);
            for(let j = this.arreglo.length-1; j < 0; j--){
                this.arreglo[j] = this.arreglo[j-1];
            }
            this.arreglo[0] = item;
            return true;
        }
        if(this.arreglo[i+1] == undefined){
                this.arreglo.push(item);
                return true;
        }
        if(item.codigo > this.arreglo[i].codigo && item.codigo < this.arreglo[i+1].codigo){
            for(let j = this.arreglo.length-1; j < i; j--){
                this.arreglo[j] = this.arreglo[j-1];
            }
            this.arreglo.push(aux);
            this.arreglo[i+1] = item;
            return true;
        }
    }
}
eliminar(codigo){
    let indice = this.busqueda_binaria(codigo);
    if(indice == -1){
        return null;
    }
    let aux = this.arreglo[indice];
    for(let j = indice + 1;j < this.arreglo.length;j++){
        this.arreglo[j-1] = this.arreglo[j];
    }
    this.arreglo[this.arreglo.length-1] = aux;
    return this.arreglo.pop();
}
listar(){
    let listado = "";

    for(let i = 0; i<this.arreglo.length; i++){
        listado += "<" + this.arreglo[i].codigo + "> Nombre: " + this.arreglo[i].nombre
        + " Costo: " + this.arreglo[i].costo + " Cantidad: " + this.arreglo[i].cantidad + "<br>";
    }
    return listado;
}
listarInverso(){
let listadoInv = "";
for(let i = this.arreglo.length-1; i>=0; i--){
    listadoInv += "<" + this.arreglo[i].codigo + "> Nombre: " + this.arreglo[i].nombre
        + " Costo: " + this.arreglo[i].costo + " Cantidad: " + this.arreglo[i].cantidad + "<br>";
}
return listadoInv;
}
buscar(codigo){
    return this.arreglo[this.busqueda_binaria(codigo)];
}
busqueda_binaria(codigo){
    let min = 0;
    let max = this.arreglo.length-1;
    let index = Math.round(min+max/2);
    while(true){
        if(this.arreglo[index].codigo == codigo){
            return index;
        } else if(this.arreglo[index].codigo < codigo){
            if(this.arreglo[max].codigo == codigo){
                return max;
            }
            max = index;
            index = Math.ceil((min + max)/2);
        } else if(this.arreglo[index].codigo > codigo){
            if(this.arreglo[min].codigo == codigo){
                return min;
            }
            min = index;
            index = Math.ceil((min + max)/2);
        }
        if(index == min || index == max){
            return -1;
        }
    }
}
}
class Producto{
    constructor(codigo,nombre,cantidad,costo){
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
    }
}
const inventario = new Inventario();

const nombre = document.getElementById("nombre");
const codigo = document.getElementById("codigo");
const cantidad = document.getElementById("cantidad");
const precio = document.getElementById("precio");
const lista = document.getElementById("lista");
const busqueda = document.getElementById("busqueda");
const posicion = document.getElementById("posicion");

const btnBuscar = document.getElementById("buscar");
const btnListar = document.getElementById("listar");
const btnAgregar = document.getElementById("agregar");
const btnEliminar = document.getElementById("eliminar");
const btnInverso = document.getElementById("inverso");


btnListar.addEventListener("click",()=>{
let listado = "";
listado = inventario.listar()
if(listado === ""){
    return lista.innerHTML = "0 registros al hilo";
}
lista.innerHTML = inventario.listar();
})
btnAgregar.addEventListener("click",()=>{
    if(!nombre.value || !precio.value || !cantidad.value || !codigo.value){
        return lista.innerHTML = "Datos faltantes...";
    }
    producto = new Producto(codigo.value,nombre.value,cantidad.value,precio.value)
    if(false == inventario.agregar(producto)){
        return lista.innerHTML = "No se puede repetir el código";
    }
    lista.innerHTML = inventario.listar();
})
btnBuscar.addEventListener("click",()=>{
    if(!busqueda.value){
        return lista.innerHTML = "Falta el código para buscar"
    }
    let objeto = inventario.buscar(busqueda.value);
    if(objeto === null){
        return lista.innerHTML = "No existe tal objeto";
    }
    nombre.value = objeto.nombre;
    codigo.value = objeto.codigo;
    precio.value = objeto.costo;
    cantidad.value = objeto.cantidad;
})
btnEliminar.addEventListener("click",()=>{
    if(!busqueda.value){
        return lista.innerHTML = "Y el código?"
    }
    if(null == inventario.eliminar(busqueda.value)){
        return lista.innerHTML = "No existe tal elemento";
    }
    lista.innerHTML = inventario.listar();
})
btnInverso.addEventListener("click",()=>{
    let listadoInverso = "";
    listadoInverso = inventario.listarInverso()
    if(listadoInverso === ""){
        return lista.innerHTML = "No hay registros";
    }
    lista.innerHTML = inventario.listarInverso();
})