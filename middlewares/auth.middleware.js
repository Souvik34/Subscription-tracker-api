/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {

    try {

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' })
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.Userid);

        if (!user) {
            return res.status(404).json({ success: false, message: 'No user found with this id' })
         
        }
        req.user = user;
        next();

    } catch (error) {
            res.status(401).json({ success: false, error: error.message, message: 'Not authorized to access this route' })
        }
    }

export default authorize;