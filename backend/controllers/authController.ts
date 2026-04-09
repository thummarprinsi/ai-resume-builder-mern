import express from "express";
import { getMeService, loginService, signupService } from "../services/authService.js";
import { loginSchema, signupSchema } from "../validations/authValidation.js";


interface CustomRequest extends express.Request {
    user?: { userId: string }
}

export const signupController = async (req: express.Request, res: express.Response) => {
   try{
    const parseData = signupSchema.parse(req.body);
    const user = await signupService(parseData);
    const { password, ...safeUser} = user.toObject();
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: safeUser
    });

   }catch(error: any){
    res.status(400).json({
        success: false,
        message: error.errors ? error.errors[0].message: error.message,
    });
   }

}


export const loginController = async (req: express.Request, res: express.Response) => {
    try{
        const parseData = loginSchema.parse(req.body);
        const { user, token } = await loginService(parseData);

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        })
        
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
           user:{
            _id: user._id,
            name: user.name,
            email: user.email,

           }
        });
    }catch(error: any){
        res.status(401).json({
            success: false,
            message: error.errors ? error.errors[0].message: error.message,
        });
    }
}


export const logoutController = async (req: express.Request, res: express.Response) => {
      
  try{
        
const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {

        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
       
    })
    
    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
  }catch(error: any){
    res.status(500).json({
        success: false,
        message: "Logout failed",
    });
  }
}


export const getMeController = async (req: CustomRequest, res: express.Response) => {
    try{
        const user = await getMeService(req.user?.userId as string);
        res.status(200).json({
            success: true,
            user
        });
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}