import cloudinary from "../dbconfig/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/user.Model.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

/* SIGNUP */
export const signupUser = async (req, res) => {
  try {
    const { userName, email, password, bio, profilePic } = req.body;

    // Validate required fields
    if (!userName || !email || !password || !bio) {
      return res.status(400).json({
        success: false,
        message: "Username, email, password and bio are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { userName }],  // ✅ PostgreSQL way
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload profile pic to Cloudinary
    let uploadedPic = "";
    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic);
      uploadedPic = upload.secure_url;
    }

    // Create user in PostgreSQL
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      bio,
      profilePic: uploadedPic,
    });

    // Generate JWT token
    const token = generateToken(newUser.id);  // ✅ .id not ._id

    // Remove password before sending response
    const userResponse = newUser.toJSON();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      user: userResponse,
      token,
      message: "Account created successfully",
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email — include password field
    const user = await User.findOne({
      where: { email },                          // ✅ PostgreSQL way
      attributes: {
        include: ["password"],                   // ✅ include password for comparison
      },
    });

    // User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = generateToken(user.id);        // ✅ .id not ._id

    // Remove password before sending response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      success: true,
      user: userResponse,
      token,
      message: "Login successful",
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* CHECK AUTH */
export const checkAuth = (req, res) => {
  // req.user is set by protectRoute middleware
  res.json({
    success: true,
    user: req.user,                              // ✅ same as MongoDB
  });
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, userName } = req.body;
    const userId = req.user.id;                  // ✅ .id not ._id

    // Prepare update data
    let updateData = { bio, userName };

    // Upload new profile pic if provided
    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = upload.secure_url;
    }

    // Find user and update
    const user = await User.findByPk(userId);    // ✅ findByPk instead of findByIdAndUpdate

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the user
    await user.update(updateData);               // ✅ Sequelize update

    // Return updated user without password
    const updatedUser = user.toJSON();
    delete updatedUser.password;

    res.json({
      success: true,
      user: updatedUser,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};