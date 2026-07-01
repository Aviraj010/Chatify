import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Get JWT token from cookies
        const token = req.cookies.jwt;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID and exclude the password field
        const user = await User.findById(decoded.userId).select("-password");

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized - User not found",
            });
        }

        // Attach the user to the request object
        req.user = user;

        // Continue to the next middleware/controller
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);

        return res.status(401).json({
            message: "Unauthorized - Invalid or expired token",
        });
    }
};