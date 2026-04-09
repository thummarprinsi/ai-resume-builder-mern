//create signup Service,login Service and getme Service
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupService = async (data:{
    name: string;
    email: string;
    password: string;
}) => {
    const { name, email, password } = data;
   const user = await User.findOne({ email });
   if(user){
    throw new Error("User already exists");
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   const result = await User.create({
    name,
    email,
    password: hashedPassword,
   });
   return result;
   
};


export const loginService = async (data:{
    email: string;
    password: string;
}) => {
   const { email, password } = data;

   const user = await User.findOne({ email });
   if(!user){
    throw new Error("User not found");
   }  
   
   const isPasswordCorrect = await bcrypt.compare(password, user.password);
   if(!isPasswordCorrect){
    throw new Error("Invalid credentials");
   }
   const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string, {expiresIn: "7d"});
  
   await user.save();
   return { user, token};
   
};



export const getMeService = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return user;
};


