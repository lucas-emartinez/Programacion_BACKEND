document.addEventListener('DOMContentLoaded', () => {
    // Esta función se ejecuta cuando el DOM está completamente cargado

    const showMessage = (message) => {
        
        onAddResponse.innerHTML = message;

        setTimeout(() => {
            onAddResponse.lastChild.remove();
        }, 2000); // 2000 milisegundos (2 segundos)
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
    const onAddResponse = document.getElementById('addProductResponse');

    // Asigna el evento clic a cada botón
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCartClick);
    });
});