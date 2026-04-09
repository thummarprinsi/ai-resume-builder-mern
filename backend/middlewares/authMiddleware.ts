//create a protect middleware
import express from "express";
import jwt from "jsonwebtoken";


interface CustomRequest extends express.Request {
        user?: {
            userId:String;
            email:String;
        }
    }


export const protect = async (req: CustomRequest, res: express.Response, next: express.NextFunction) => {
    try{
         const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
    return res.status(401).json({ success: false,message: "Not authorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string , email: string };
    req.user = decoded;
    next();
    }catch(error: any){
        res.status(401).json({ success: false, message: "Not authorized, token failed" });
}
};
