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
const cartCounter = document.getElementById('cart-counter')

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
/* =========COMPORTAMIENTO CARRITO========== */
const caja_productos = document.getElementById('caja_productos');
const totalItem1Cart = document.querySelector('.counter')
const totalItemCart = document.querySelector('.totalItem')
const totalCostoCart = document.querySelector('.totalCosto')

let totalItem1 = 0
let totalItem = 0
let totalCosto = 0


function mostrarProductos(items){
    let fragmento = ``
    
    items.map(productos => {
        fragmento += `
            <div class="carta" id="${productos.id}">
                <div class="contenedor-imagen"><img class="carta-imagen" src="${productos.image}" alt="foto del producto"></div>
                <h4 class="carta-precio">$${productos.price}.00</h4>
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

                totalItem++
                totalItem1++
                totalItemCart.textContent = totalItem
                totalItem1Cart.textContent = totalItem1

            }else{
              mensajeAlerta.classList.remove('hide')
            }          

            
            //console.log(carritoCompras);
            //console.log(arregloProductos[id -1].quantity,arregloProductos[id -1].name)
            
            mostrarProductos(arregloProductos)
            addToCartShop(carritoCompras)

        })
    })
    
}
const carrito = document.getElementById('cart')
const carroIpreso = document.getElementById('carroIpreso')


function addToCartShop(cartShop){
    let carroImpreso = Object.values(cartShop)
 
    const totalCosto = carroImpreso.reduce( (total, product) => {
        return total + (product.cantidad * product.price)
    }, 0 )

    totalCostoCart.textContent = totalCosto
    
    //window.localStorage.setItem('savedCart', JSON.stringify(carroImpreso))

    let fragmento = ``

    carroImpreso.map(item => {

        fragmento += `
            <div class="carrito" id="${item.id}">
                <div class="contenedor--imagen-carrito"><img class="carrito-imagen" src="${item.image}" alt="foto del producto"></div>
                <div class="contenedor--texto-carrito">
                    <h4 class="carrito-t carrito-nombre">${item.name}</h4>
                    <h5 class="carrito-t carrito-stock">Stock: ${(item.quantity + 1) - item.cantidad}<span class="carrito-t carrito-precio">$${item.price}.00</span></h5>
                    <h4 class="carrito-t carrito-subtotal">Subtotal: $ ${item.price * item.cantidad}.00</h4>
                    <div class="botones-carrito">
                        <button class="btn_minus carrito-t">-</button>
                        <h4 class="carrito-t carrito-cantidad">${item.cantidad} units</h4>
                        <button class="btn_plus carrito-t">+</button>
                        <button class="btn_carrito_delete btn_carrito"><i class='bx bx-trash-alt'></i></button>
                    </div>
                </div>
            </div>
        `
    })

    carroIpreso.innerHTML = fragmento
    funcionalidadBtns()

    carroVacio(carritoCompras)
}



function funcionalidadBtns(){
    const btnPlus = document.querySelectorAll('.btn_plus')
    const btnMinus = document.querySelectorAll('.btn_minus')
    const btnDelete = document.querySelectorAll('.btn_carrito_delete')

    btnPlus.forEach(boton =>{
        boton.addEventListener('click', e=>{
            let sumar = Object.values(carritoCompras)
            const id = parseInt(e.target.parentElement.parentElement.parentElement.id)
            const productoSeleccionado = sumar.find( item => item.id == id )
            
            if(arregloProductos[id - 1].quantity !== 0){
                arregloProductos[id - 1].quantity--
                
                if(carritoCompras.hasOwnProperty(productoSeleccionado.id)) carritoCompras[productoSeleccionado.id].cantidad++
                
                totalItem++
                totalItem1++
                totalItemCart.textContent = totalItem
                totalItem1Cart.textContent = totalItem1
              }else{
                mensajeAlerta.classList.remove('hide')
              }
              addToCartShop(carritoCompras)
              mostrarProductos(arregloProductos)
        })
    })

    btnMinus.forEach(boton =>{
        boton.addEventListener('click', e=>{
            let sumar = Object.values(carritoCompras)
            const id = parseInt(e.target.parentElement.parentElement.parentElement.id)
            const productoSeleccionado = sumar.find( item => item.id == id )
            
                arregloProductos[id - 1].quantity++;
                
                if(carritoCompras[productoSeleccionado.id].cantidad === 1){
                    delete carritoCompras[productoSeleccionado.id]
                }else if(carritoCompras.hasOwnProperty(productoSeleccionado.id)){
                    carritoCompras[productoSeleccionado.id].cantidad--
                }
    
              addToCartShop(carritoCompras)
              mostrarProductos(arregloProductos)

                totalItem--
                totalItem1--
                totalItemCart.textContent = totalItem
                totalItem1Cart.textContent = totalItem1

        })
    })

    btnDelete.forEach(boton =>{
        boton.addEventListener('click', e=>{
            let sumar = Object.values(carritoCompras)
            const id = parseInt(e.target.parentElement.parentElement.parentElement.parentElement.id)
            const productoSeleccionado = sumar.find( item => item.id == id )
            let devolverStock = productoSeleccionado.cantidad + arregloProductos[id - 1].quantity
            
            totalItem = totalItem - productoSeleccionado.cantidad
            totalItem1 = totalItem1 - productoSeleccionado.cantidad
            totalItemCart.textContent = totalItem
            totalItem1Cart.textContent = totalItem1

            arregloProductos[id - 1].quantity = devolverStock
            productoSeleccionado.cantidad = 0
            delete carritoCompras[productoSeleccionado.id]
    
            addToCartShop(carritoCompras)
            mostrarProductos(arregloProductos)

        })
    })
}

function carroVacio(carro){
    let evaluarCarro = Object.values(carro)
    
    if(evaluarCarro.length < 1){
        carroIpreso.innerHTML = `
                <img src="./assets/images/empty-cart.png" alt="Carrito Vacio" class="imagen-carrito-vacio">
                <h3 style="text-align: center">Tu carrito está vacío</h3>
                <p style="padding: .5rem 2rem; text-align: center;">Puedes añadir productos a tu carrito cliqueando en el boton "+" en la página de productos</p>
            `
    }else{
        console.log('hola');
    }
}

const botonCerrarAlert = document.getElementById('cerrar_mensaje');
botonCerrarAlert.addEventListener('click', e => mensajeAlerta.classList.add('hide'))

let categoria = document.querySelectorAll('.categorySelect')

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