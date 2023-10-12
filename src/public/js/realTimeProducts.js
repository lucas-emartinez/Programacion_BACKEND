const socket = io();

const form = document.getElementById("productsForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const code = document.getElementById("code");
const stock = document.getElementById("stock");
const price = document.getElementById("price");
const category = document.getElementById("category");
const thumbnails = document.getElementById("thumbnails");


form.onsubmit = (e) => {
    e.preventDefault();
     
    const product = {
        title: title.value,
        description: description.value,
        code: code.value,
        category: category.value,
        stock: stock.value,
        price: price.value,
    };

    socket.emit('productCreated', product);

   form.reset();
}



socket.on('products', (data) => {
    const tableBody = document.getElementById("productsTableBody");
    console.log(data)
    const rows = data.map((product) => {
        const { id, title, description, price, code, stock } = product;
        return `
                <tr>
                    <td>${id}</td>
                    <td>${title}</td>
                    <td>${description}</td>
                    <td>${price}</td>
                    <td>${code}</td>
                    <td>${stock}</td>
                </tr>`;
      });
      tableBody.innerHTML += rows.join("");

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

socket.on('updatedProduct', (data) => {
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

