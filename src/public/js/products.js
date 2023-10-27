document.addEventListener('DOMContentLoaded', () => {
    // Esta función se ejecuta cuando el DOM está completamente cargado


    const showMessage = (message) => {
        Toastify({
            text: message,
            duration: 1000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            backgroundColor: "green",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function () { } // Callback after click
        }).showToast();
    };

    // Función que se ejecuta cuando se hace clic en un botón "Agregar al Carrito"
    const handleAddToCartClick = async (event) => {
        
        const productId = event.target.dataset.id;
        const cartId= cart.dataset.cart;
        
        try {
            const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                showMessage(`Producto agregado al carrito correctamente`);
                
                console.log('Producto agregado al carrito correctamente');
            } else {
                console.error('Error al agregar el producto al carrito');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Obtén todos los botones "Agregar al Carrito"
    const addToCartButtons = document.querySelectorAll('.addButton');
    const cart = document.getElementById('cart');

    // Asigna el evento clic a cada botón
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCartClick);
    });

    const toCart = document.getElementById('toCart');
    toCart.addEventListener('click', async () => {
        const cartId = cart.dataset.cart;
        window.location.href = `/carts/${cartId}`;
    })
});