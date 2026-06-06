// In a MERN stack app, a utils.js (or utils folder) is used to store 
// reusable helper functions that can be used in multiple places of the project.
// here generateToken is a helper function that we are using in multple places to 
// generate token in our project.

import jwt from "jsonwebtoken";

export const generateToken = (userId) => {

  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",     // 🔐 token expiry
      algorithm: "HS256",  
    }
  );
};


