import jwt from "jsonwebtoken";
import users from "../moduls/auth.js";

export const login = async(req,res)=>{
    const {email} = req.body;
    console.log(email);
    try{
        const existingUser = await users.findOne({email});

        if(!existingUser){
            try{
                const newUser= await users.create({email});
                console.log(process.env.JWT_SECRET);
                const token= jwt.sign({
                    email:newUser.email, id:newUser._id
                },process.env.JWT_SECRET,{
                    expiresIn:"1h"
                })
                res.status(200).json({result:newUser,token})
            }
            catch(error){
                console.log(error);
                res.status(500).json({mess:"Something wents wrong..."});
            }
        }
        else{

            const token=jwt.sign({
                email:existingUser.email, id:existingUser._id
            },process.env.JWT_SECRET,{
                expiresIn:"1h"
            })
            res.status(200).json({result:existingUser,token})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({mess:"Something wents wrong..."});
    }
}