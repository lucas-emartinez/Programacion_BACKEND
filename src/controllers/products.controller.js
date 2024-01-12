import { productService } from "../services/products.service.js";

class ProductController {
    constructor() {
        this.productService = productService;
    }

   addProduct = async (req, res) => {
        const product = req.body;
        const file = req.file;

        if (file) {
            file.path = '/img/' + file.filename;
            product.thumbnails.push(file.path)
        }

        try {
            const result = await productService.createOne(product);
            return res.status(201).json({ message: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    getProducts = async (req, res) => {

        try {
            const result = await productService.findAll(req.query);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message});
        }
    };

    getProductById = async (req, res) => {
        const { pid } = req.params;
        if (!pid) res.status(400).json({ error: 'Debe ingresar un id' });

        try {
            const product = await productService.findById(pid);
            return res.status(200).json({ product });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    updateProduct = async (req, res) => {
        const { pid } = req.params;

        if (!pid) res.status(400).json({ error: 'Debe ingresar un id' });
        const product = req.body;
        try {
            const result = await productService.updateOne(pid, product);
            return res.status(200).json({ result })
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };


    deleteProduct = async (req, res) => {
        const { pid } = req.params;

        if (!pid) res.status(400).json({ error: 'Debe ingresar un id' });

        try {
            const result = await productService.deleteOne(pid);
            return res.status(204).json({ message: result })
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
}

export const productController = new ProductController();