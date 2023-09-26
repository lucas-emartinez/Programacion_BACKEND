import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
    res.render('index', {name: "Lucas", style: "index.css"})
});

export default router;