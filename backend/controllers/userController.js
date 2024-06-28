import User from "../models/userModel.js";
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import {delete_file, upload_file} from '../utils/cloudinary.js';


//@desc     Login User
//@route    POST /api/auth/login
//@access   Public
const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
        })
    }else{
        res.status(401);
        throw new Error("Email ou mot de passe invalide");
    };
});

//@desc     Register User
//@route    POST /api/users/register
//@access   Public
const register = asyncHandler(async(req, res)=>{
    const {name, email, password, phone, role} = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error("L'utilistaur existe déjà");
    };

    const user = await User.create({
        name,
        email,
        password,
        phone,
        role
    });

    if(user){
        generateToken(res, user._id);
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        });
    }else{
        res.status(400);
        throw new Error("Information invalide");
    };

});

//@desc     Logout / Clear the cookie
//@route    POST /api/auth/logout
//@access   Private
const logout = asyncHandler(async(req, res)=>{
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Déconnecté avec succès' });
});


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
  
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('untilisateur inconnu');
    }
  });

export {
    register,
    login,
    logout,
    getUsers,
    getUserById,
};
