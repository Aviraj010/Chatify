import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {

try{
    const loggedUserId = req.user._id;
    const filterUsers=await User.find({_id:{$ne:loggedUserId}}).select("-password");
    res.status(200).json(filterUsers);

}catch(error){
    console.log("Error in getUsersForSidebar controller:", error.message);
    res.status(500).json({
        message: "Internal server error",
    });

}
}

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: userToChatId },
        { sender: userToChatId, receiver: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {

    try{
        const {text,image}=req.body;
        const senderId=req.user._id;
        const {id:receiverId}=req.params;
       
        let imageUrl=null;

        if(image){
            //upload base64 to cloudinary
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        // Create the message in the database
        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            text,
            image: imageUrl
        });
        //realtime usage using socketio
        //here

        res.status(200).json(newMessage);
    }
    catch(error){
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }

}