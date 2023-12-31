// Manager requerido
import { productManager } from "../dao/db/ProductManager.js";
import errors from '../config/errors.js';


const {
    PRODUCT_CODE_EXIST,
    PRODUCT_NOT_EXIST,
    PRODUCT_MUST_HAVE_CATEGORY,
    PRODUCT_MUST_HAVE_CODE,
    PRODUCT_MUST_HAVE_DESCRIPTION,
    PRODUCT_MUST_HAVE_PRICE,
    PRODUCT_MUST_HAVE_STOCK,
    PRODUCT_MUST_HAVE_TITLE,
    PRODUCT_MUST_HAVE_POSITIVE_PRICE,
    PRODUCT_MUST_HAVE_POSITIVE_STOCK
} = errors;


const addProduct = async (req, res) => {
    const product = req.body;
    const file = req.file;

    if (file){
        file.path = '/img/' + file.filename;
        product.thumbnails.push(file.path)
    } 
    
    try {

        const result = await productManager.addProduct(product);

        if (result == PRODUCT_CODE_EXIST) return res.status(400).json({ error: PRODUCT_CODE_EXIST });
        if (result == PRODUCT_MUST_HAVE_CATEGORY) return res.status(400).json({ error: PRODUCT_MUST_HAVE_CATEGORY });
        if (result == PRODUCT_MUST_HAVE_CODE) return res.status(400).json({ error: PRODUCT_MUST_HAVE_CODE });
        if (result == PRODUCT_MUST_HAVE_DESCRIPTION) return res.status(400).json({ error: PRODUCT_MUST_HAVE_DESCRIPTION });
        if (result == PRODUCT_MUST_HAVE_PRICE) return res.status(400).json({ error: PRODUCT_MUST_HAVE_PRICE });
        if (result == PRODUCT_MUST_HAVE_STOCK) return res.status(400).json({ error: PRODUCT_MUST_HAVE_STOCK });
        if (result == PRODUCT_MUST_HAVE_TITLE) return res.status(400).json({ error: PRODUCT_MUST_HAVE_TITLE });
        if (result == PRODUCT_MUST_HAVE_POSITIVE_PRICE) return res.status(400).json({ error: PRODUCT_MUST_HAVE_POSITIVE_PRICE });
        if (result == PRODUCT_MUST_HAVE_POSITIVE_STOCK) return res.status(400).json({ error: PRODUCT_MUST_HAVE_POSITIVE_STOCK });

        return res.status(201).json({ message: result });

    } catch (error) {
        return res.status(400).json({ error: error });
    }

};

const getProducts = async (req, res) => {

    try {

        const result = await productManager.findAll(req.query);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ 
            status: 'error'
         });
    }
};

const getProductById = async (req, res) => {
    const { pid } = req.params;

    if (!pid) res.status(400).json({ error: 'Debe ingresar un id' });

    try {

        const product = await productManager.findById(pid);

        if (product == PRODUCT_NOT_EXIST) return res.status(404).json({ error: PRODUCT_NOT_EXIST })

        return res.status(200).json({ product })

    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

const updateProduct = async (req, res) => {
    const { pid } = req.params;

    if (!pid) res.status(400).json({ error: 'Debe ingresar un id' });

    const product = req.body;

    try {
        const result = await productManager.updateOne(pid, product);

        if (result == PRODUCT_NOT_EXIST) return res.status(404).json({ error: PRODUCT_NOT_EXIST })
        if (result == PRODUCT_CODE_EXIST) return res.status(400).json({ error: PRODUCT_CODE_EXIST })
        return res.status(200).json({ result })
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};


const deleteProduct = async (req, res) => {
    const { pid } = req.params;

    if (!pid) res.status(400).json({ error: 'Debe ingresar un id' });

    try {

        const result = await productManager.deleteOne(pid);
        return res.status(204).json({ message: result })

    } catch (error) {
        return res.status(400).json({ error: error });
    }
};


export default {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};