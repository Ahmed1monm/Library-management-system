import { validationResult } from 'express-validator';

const validationMiddelware = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default validationMiddelware;