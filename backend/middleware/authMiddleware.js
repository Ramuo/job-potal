import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';


const protect = asyncHandler(async(req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Non autorisé, l'authentification a échouée");
        }
    }else{
        res.status(401);
        throw new Error("Non autorisé")
    }
});

// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        res.status(403);
        throw new Error(`User role ${req.user.role} is not authorized to access this route`)
      }
      next();
    };
  };

export {protect, authorize};