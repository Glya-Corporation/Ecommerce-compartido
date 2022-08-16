const arregloProductos = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    }
  ]


document.addEventListener( "DOMContentLoaded", () =>{
    load()
    mostrarProductos(arregloProductos)
})

/* =========== LOADER ========== */
const loader = document.getElementById( "loader" )
function load () {
    setTimeout(() => {
        loader.classList.add( "hide" )
    }, 3000);
}

/* =========DARK MODE======== */
const themeButton = document.getElementById( "theme-button" )

themeButton.addEventListener( "click", () =>{
    document.body.classList.toggle( "dark-theme" )

    if( themeButton.classList.contains( "bx-moon" ) ){
        themeButton.classList.replace( "bx-moon", "bx-sun" )
    }else{
        themeButton.classList.replace( "bx-sun", "bx-moon" )
    }
})


/*=======  CARRITO =========== */
const cartOpen = document.getElementById( "cart-shop" )
const cartClose = document.getElementById( "close-cart" )
const cartContainer = document.getElementById( "cart-container" )

cartOpen.addEventListener( "click", () => {
    cartContainer.classList.remove( "hide" )
})

cartClose.addEventListener( "click", () => {
    cartContainer.classList.add( "hide" )
})



/* ========SCROLL========= */
const header = document.getElementById("header")

window.addEventListener( "scroll", () =>{
    if( window.scrollY >= 50 ){
        header.classList.add("scroll-header")
    }else{
        header.classList.remove("scroll-header")
    }
})

const caja_productos = document.getElementById('caja_productos');

function mostrarProductos(items){
    let fragmento = ``
    
    items.map(productos => {
        fragmento += `
            <div class="carta" id="${productos.id}">
                <div class="contenedor-imagen"><img class="carta-imagen" src="${productos.image}" alt="foto del producto"></div>
                <h4 class="carta-precio">${productos.price}</h4>
                <h6 class="carta-stock">Stock: ${productos.quantity}</h6>
                <h4 class="carta-nombre">${productos.name}</h4>
                <button class="btn_item">+</button>
            </div>
        `
    });

    caja_productos.innerHTML = fragmento

    funcionalidadCartas()
}

const mensajeAlerta = document.querySelector('.alert');

const carritoCompras = {}

function funcionalidadCartas(){
    const btns = document.querySelectorAll('.btn_item');
    
    btns.forEach( boton => {
        boton.addEventListener('click', e => {
            const id = parseInt(e.target.parentElement.id)
            const productoSeleccionado = arregloProductos.find( item => item.id == id )
            productoSeleccionado.cantidad = 1
            
            if(arregloProductos[id - 1].quantity !== 0){
              arregloProductos[id - 1].quantity--;

                if(carritoCompras.hasOwnProperty(productoSeleccionado.id)){
                    carritoCompras[productoSeleccionado.id].cantidad++
                }else{

                    carritoCompras[productoSeleccionado.id] = {...productoSeleccionado}
                }

            }else{
              mensajeAlerta.classList.remove('hide')
            }          

            
            console.log(carritoCompras);
            console.log(arregloProductos[id -1].quantity,arregloProductos[id -1].name)
            
            mostrarProductos(arregloProductos)
            addToCartShop(carritoCompras)
        })
    })
}
const carrito = document.getElementById('cart')

function addToCartShop(cartShop){
    let carroImpreso = Object.values(cartShop)
    
    let fragmento = ``

    carroImpreso.forEach(item => {
        fragmento.innerHTML += `
            <div class="carrito" id="${item.id}">
                <div class="contenedor--imagen-carrito"><img class="carrito-imagen" src="${item.image}" alt="foto del producto"></div>
                <div class="contenedor--texto-carrito">
                    <h4 class="carrito-t carrito-nombre">${item.name}</h4>
                    <h5 class="carrito-t carrito-stock">Stock: ${item.quantity}<span class="carrito-t carrito-precio">$${item.price}</span></h5>
                    <h4 class="carrito-t carrito-subtotal">Subtotal: $${item.price * item.cantidad}</h4>
                    <div class="botones-carrito">
                        <button id="btn_plus" class="carrito-t btn_item">-</button>
                        <h4 class="carrito-t carrito-cantidad">${item.cantidad} units</h4>
                        <button id="btn_minus" class="carrito-t btn_item">+</button>
                        <button class="btn_carrito" id="btn_carrito_delete"><i class='bx bx-trash-alt'></i></button>
                    </div>
                </div>
            </div>
        `
    })
    console.log(fragmento);
}

const botonCerrarAlert = document.getElementById('cerrar_mensaje');
botonCerrarAlert.addEventListener('click', e => mensajeAlerta.classList.add('hide'))

let categoria = document.querySelectorAll('.categoria')

categoria.forEach( boton =>{
    boton.addEventListener('click', e=>{
        //console.log(e.target.parentElement.id)
        if(e.target.parentElement.id === 'categorias_all'){
            mostrarProductos(arregloProductos)
        }else{
            let productos = arregloProductos.filter( producto => producto.category === e.target.parentElement.id)
            mostrarProductos(productos)
        }
    })
})