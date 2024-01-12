import { cartService } from "../services/carts.service.js";

class CartController {
    constructor() {
        this.cartService = this.cartService;
    }

    findById = async (req, res) => {
        const { cid } = req.params;
        try {
            const cart = await cartService.findById(cid);
            return res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    findAll = async  (req, res) => {
        const {limit, page, sort } = req.query;
        const opts = { 
            limit: limit ? limit : 10, 
            page: page ? page: 1,
            sort: sort ? {_id: sort } : { _id: -1 },
        }

        try {
            const carts = await cartService.findAll(opts);
            return res.status(200).json(carts);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    addCarrito = async (req, res) => {
        try {
            const newCart = { products: [] }
            const result = await cartService.createOne(newCart);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    addProductToCart = async (req, res) => {
        const { cid, pid } = req.params;

        if (!cid || !pid) res.status(400).json({error: 'Debe ingresar un id'});

        try {
            const result = await cartService.addProductToCart(cid, pid);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    getProductsFromCart = async (req, res) => {

        const { cid } = req.params;
        
        if (!cid) res.status(400).json({error: 'Debe ingresar un id'});
        try {
            const products = await cartService.getProductsByCartId(cid);
            return res.status(200).json({products});
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    updateProductQuantity = async (req, res) =>{
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!cid || !pid) res.status(400).json({error: 'Debe ingresar un id'});

        try {
            const result = await cartService.updateProductQuantity(cid, pid, quantity);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    deleteCarrito = async (req, res) => {
        const { cid } = req.params;

        if (!cid) return res.status(400).json({error: 'Debe ingresar un id'});

        try {
            const result = await cartService.deleteOne(cid);
            return res.status(200).json({ result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    deleteAllProductsFromCart = async (req, res) => {
        const { cid } = req.params;

        if (!cid) res.status(400).json({error: 'Debe ingresar un id'});

        try {
            const result = await cartService.deleteAllProductsFromCart(cid);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    deleteProductFromCart = async (req, res) => {

        const { cid, pid } = req.params;

        if (!cid || !pid) res.status(400).json({error: 'Debe ingresar un id'});

        try {
            const result = await cartService.deleteProductFromCart(cid, pid);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export const cartController = new CartController();