import { productManager } from '../impl/ProductManager.js';


const home = async (req, res) => {

    const products = await productManager.getProducts({});
    console.log(products);
    return res.render('home', {
        products,
        thumnails: products.thumbnails,
        style: 'home.css'
    });
}

export default {
    home
}