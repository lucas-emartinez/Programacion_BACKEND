// Manager requerido
import { carritoManager }  from "../impl/CarritoManager.js";
import errors from "../config/errors.js";

const {
    CART_NOT_EXIST,
    PRODUCT_TO_ADD_NOT_EXIST,
    GET_CARTS_ERROR
} = errors;


const addCarrito = async (req, res) => {
    try {
        const result = await carritoManager.addCarrito();
        return res.status(201).json({ message: result });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

const addProductToCarrito = async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid) res.status(400).json({error: 'Debe ingresar un id'});

    try {
        const result = await carritoManager.addProductToCarrito(cid, pid);

        if ( result == CART_NOT_EXIST) return res.status(400).json({ error: CART_NOT_EXIST });
        if ( result == PRODUCT_TO_ADD_NOT_EXIST) return res.status(400).json({ error: PRODUCT_TO_ADD_NOT_EXIST });
        
        return res.status(201).json({ message: result });

    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

const getProductsCarritoById = async (req, res) => {

    const { cid } = req.params;
    
    if (!cid) res.status(400).json({error: 'Debe ingresar un id'});

    try {
        const products = await carritoManager.getProductsByCarritoId(cid);

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

        const result = await carritoManager.deleteCarrito(cid);

        if (result == GET_CARTS_ERROR) return res.status(400).json({ error: GET_CARTS_ERROR });
    
        return res.status(200).json({ result });

    } catch (error) {
        return res.status(400).json({ error: error });
    }
}; 


export default {
    addCarrito,
    addProductToCarrito,
    getProductsCarritoById,
    deleteCarrito
};