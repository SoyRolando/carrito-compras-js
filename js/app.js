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
}


// Funciones
function agregarCurso(e){
    e.preventDefault();         //Evita la accion por defecto de subir al inicio de la pagina

    if(e.target.classList.contains('agregar-carrito')){     //Verifico que se este seleccionando especificamente el boton 'Agregar al carrito' 
        const cursoSleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSleccionado);
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    // console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(infoCurso);


    // Agrega elementos al arreglo de carritos
    articulosCarrito = [...articulosCarrito, infoCurso]; // Toma una copia del carrito actual y le agrego los elementos del curso seleccionado

    // console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el carrito de compras en el HTML
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();


    // Recorrer los elementos del arreglo del carrito
    articulosCarrito.forEach( curso => {         
        console.log(curso);
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