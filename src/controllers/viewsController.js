import { productManager } from '../dao/db/ProductManager.js';


const home = async (req, res) => {
    const products = await productManager.getProducts();

    return res.render('home', {
        products,
        style: 'home.css'
    });
}

const realTimeProducts = async (req, res) => {

        return res.render('realTimeProducts', {
            style: 'realTimeProducts.css'
        });
    }

export default {
    home,
    realTimeProducts
}