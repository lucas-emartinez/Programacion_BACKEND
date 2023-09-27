const socket = io();

socket.on('products', (data) => {
    const products = data; // Array de productos recibido del servidor

    const productsContainer = document.querySelector('.productsContainer');

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.classList.add('productContainer');
        productContainer.setAttribute('data-id', product.id);

        productContainer.innerHTML = `
            <!-- Contenido del producto -->
            ${product.thumbnails.map(thumbnail => `<img class="thumbnail" src="${thumbnail}" alt="product image" />`).join('')}
            <div class="productInfo">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>$${product.price}</p>
            </div>
        `;

        productsContainer.appendChild(productContainer);
    });
});

socket.on('newProduct', (data) => {

    const product = data; // El objeto de producto recibido del servidor
    
    const productsContainer = document.querySelector('.productsContainer');

    const productContainer = document.createElement('div');
    productContainer.classList.add('productContainer');
    productContainer.setAttribute('data-id', product.id);

    productContainer.innerHTML = `
        <!-- Contenido del producto -->
        ${product.thumbnails.map(thumbnail => `<img class="thumbnail" src="${thumbnail}" alt="product image" />`).join('')}
        <div class="productInfo">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>$${product.price}</p>
        </div>
    `;

    productsContainer.appendChild(productContainer);
});

socket.on('deleteProduct', (data) => {
    const product = data;
    const productsContainer = document.querySelector('.productsContainer');
    const productContainer = document.querySelector(`.productContainer[data-id="${product.id}"]`);

    productsContainer.removeChild(productContainer);
});

socket.on('updateProduct', (data) => {

    const product = data;
    const productContainer = document.querySelector(`.productContainer[data-id="${product.id}"]`);
 

    productContainer.innerHTML = `
        <!-- Contenido del producto -->
        ${product.thumbnails.map(thumbnail => `<img class="thumbnail" src="${thumbnail}" alt="product image" />`).join('')}
        <div class="productInfo">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>$${product.price}</p>
        </div>
    `;
});

