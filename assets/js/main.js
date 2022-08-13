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

function funcionalidadCartas(){
    const btns = document.querySelectorAll('.btn_item');
    const carritoCompras = {}
    
    btns.forEach( boton => {
        boton.addEventListener('click', e => {
            const id = parseInt(e.target.parentElement.id)
            const productoSeleccionado = arregloProductos.find( item => item.id === id )
            productoSeleccionado.cantidad = 1

            if(carritoCompras.hasOwnProperty(productoSeleccionado.id)){
                productoSeleccionado.cantidad = carritoCompras[productoSeleccionado.id].cantidad + 1
            }

            carritoCompras[productoSeleccionado.id] = {...productoSeleccionado}            

            
            console.log(carritoCompras);
        })
    })
}