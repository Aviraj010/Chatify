
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {


  const { fullName, email, password } = req.body;
  try{
     //Hash the password before saving it to the database
     if(password.length < 6){
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
     }
     const user= userModel.findOne({ email });
     if(user){
      return res.status(400).json({ message: "User already exists" });

     }
     const salt= await bcrypt.genSalt(10);
     const hashedPassword= await bcrypt.hash(password, salt);
     const newUser= new userModel({
      fullName,
      email,
      password: hashedPassword,
     });

     if(newUser){
      
      ge
      
    }
       

          
    
     


     
     

  }catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
  
}   

export const login = (req, res) => {
  res.send("login route");
}

export const logout = (req, res) => {
  res.send("logout route");
}   


