const User= require("../models/User");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");


exports.signup= async (req,res) =>{
 const{name, surname, email, password}= req.body;

 try{
    const existingUser= await User.findOne({email})
    if (existingUser){
        return res.status(400).json({message:"User Already Exists"})
    }
 
    const newUser= new User({
        name,
        surname,
        email, 
        password})
    await newUser.save()

    const token= jwt.sign({id:newUser._id}, process.env.JWT_SECRET,{
    expiresIn:"1d"
    })
    
    res.status(201).json({
        token,
        user:{
            id: newUser._id,
            name: newUser.name,
            surname: newUser.surname,
            email: newUser.email,
            role: newUser.role,
        }
    })
}    catch(err){
        console.error("Sign up error:", err.message);
        res.status(500).json({message:"Sign up Failed", error:err.message})
}
}

exports.signin = async ( req,res) =>{
    const {email, password}= req.body;

    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isMatch= await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(400).json({message:"Invalid credentials"})
        }

    
    const token= jwt.sign({id:user._id}, process.env.JWT_SECRET,{
        expiresIn:"1d"
        })
        
        res.json({
            token,
            user:{
                id:user._id,
                name: user.name,        
                surname: user.surname,
                email:user.email,
                role:user.role,
            }
        })
    }    catch(err){
            console.error("Sign in error:", err.message);
            res.status(500).json({message:"Sign in Failed", error:err.message})
    }
}
