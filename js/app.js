// Varaibles
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    //Cuando agregas un curso presionando 'Agregar al arrito'
    listaCursos.addEventListener('click',agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; // Borrar todos los elementos del arreglo
        limpiarHTML(); // Limpiar el HTML a mostrar
    })
}




// Funciones
function agregarCurso(e){
    e.preventDefault();         //Evita la accion por defecto de subir al inicio de la pagina

    if(e.target.classList.contains('agregar-carrito')){     //Verifico que se este seleccionando especificamente el boton 'Agregar al carrito' 
        const cursoSleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSleccionado);
    }
}

// Elimina un curso de carrito
function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar del arreglo de articulosCarrito
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        console.log(articulosCarrito);
    }
    carritoHTML();

}



// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el Carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);


    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no estan duplicados
            }
        })
        articulosCarrito = [...cursos];
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]; // Toma una copia del carrito actual y le agrego los elementos del curso seleccionado
    }

    // Agrega elementos al arreglo de carritos
    carritoHTML();
}


// Muestra el carrito de compras en el HTML
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();


    // Recorrer los elementos del arreglo del carrito
    articulosCarrito.forEach( curso => {  

        // console.log(curso);
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr'); // Pudo haberse creado un 'div', pero se crea un 'tr' para mantener el diseño de tablas.
        // Agregar a 'row' el HTML
        row.innerHTML =`
        <td>
            <img src= '${imagen}' width= '100'>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href='#' class= 'borrar-curso' data-id= '${id}'> X </a>
        </td>
        `;
    
        // Agrega el HTML del carrito al tbody
        contenedorCarrito.appendChild(row);
    });
}


// Elimina los cursos del tbody
function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}