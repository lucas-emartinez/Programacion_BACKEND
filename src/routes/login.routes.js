import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
    const {name, email} = req.body;
    res.cookie(name, email, {maxAge: 1000 * 10, signed: true}).send('cookie setted');
})

export default router;