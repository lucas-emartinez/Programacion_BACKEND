// Manager requerido
import { cartManager } from "../dao/db/CartManager.js";
import errors from "../config/errors.js";

const {
    CART_NOT_EXIST,
    PRODUCT_TO_ADD_NOT_EXIST,
    GET_CARTS_ERROR,
    PRODUCT_TO_DELETE_NOT_EXIST
} = errors;

const getCarts = async (req, res) => {
    const {limit, page, sort } = req.query;
    const opts = { 
        limit: limit ? limit : 10, 
        page: page ? page: 1,
        sort: sort ? {_id: sort } : { _id: -1 },
    }

    try {
        const carts = await cartManager.findAll(opts);
    
        return res.status(200).json(carts);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

const addCarrito = async (req, res) => {
    try {
        const result = await cartManager.createOne({});
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid) res.status(400).json({error: 'Debe ingresar un id'});

    try {
        const result = await cartManager.addProductToCart(cid, pid);

        if ( result == CART_NOT_EXIST) return res.status(400).json({ error: CART_NOT_EXIST });
        if ( result == PRODUCT_TO_ADD_NOT_EXIST) return res.status(400).json({ error: PRODUCT_TO_ADD_NOT_EXIST });
        
        return res.status(201).json(result);

    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

const getProductsFromCart = async (req, res) => {

    const { cid } = req.params;
    
    if (!cid) res.status(400).json({error: 'Debe ingresar un id'});

    try {
        const products = await cartManager.getProductsByCartId(cid);

        if (products === CART_NOT_EXIST) return res.status(400).json({ error: CART_NOT_EXIST });

        return res.status(200).json({products});

    } catch (error) {
        return res.status(400).json({ error: error });
    }
};


const deleteCarrito = async (req, res) => {
    const { cid } = req.params;

    if (!cid) return res.status(400).json({error: 'Debe ingresar un id'});
 
    try {

        const result = await cartManager.deleteCarrito(cid);

        if (result == GET_CARTS_ERROR) return res.status(400).json({ error: GET_CARTS_ERROR });
    
        return res.status(200).json({ result });

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}; 

const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!cid || !pid) res.status(400).json({error: 'Debe ingresar un id'});

    try {
        const result = await cartManager.updateProductQuantity(cid, pid, quantity);

        if (result == CART_NOT_EXIST) return res.status(400).json({ error: CART_NOT_EXIST });
        if (result == PRODUCT_TO_DELETE_NOT_EXIST) return res.status(400).json({ error: PRODUCT_TO_DELETE_NOT_EXIST });
        
        return res.status(201).json(result);

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

const deleteAllProductsFromCart = async (req, res) => {
    const { cid } = req.params;

    if (!cid) res.status(400).json({error: 'Debe ingresar un id'});

    try {
        const result = await cartManager.deleteAllProductsFromCart(cid);

        if (result == CART_NOT_EXIST) return res.status(400).json({ error: CART_NOT_EXIST });
        
        return res.status(201).json(result);

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

const deleteProductFromCart = async (req, res) => {

    const { cid, pid } = req.params;

    if (!cid || !pid) res.status(400).json({error: 'Debe ingresar un id'});

    try {
        const result = await cartManager.deleteProductFromCart(cid, pid);

        if (result == CART_NOT_EXIST) return res.status(400).json({ error: CART_NOT_EXIST });
        if (result == PRODUCT_TO_DELETE_NOT_EXIST) return res.status(400).json({ error: PRODUCT_TO_DELETE_NOT_EXIST });
        
        return res.status(201).json(result);

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}


export default {
    getCarts,
    addCarrito,
    addProductToCart,
    getProductsFromCart,
    updateProductQuantity,
    deleteCarrito,
    deleteAllProductsFromCart,
    deleteProductFromCart
};