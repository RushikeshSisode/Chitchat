import cloudinary from "../dbconfig/cloudinary.js";
import Message from "../model/message.Model.js";
import User from "../model/user.Model.js";
import { Op } from "sequelize";
import { io, userSocketMap } from '../server.js'

/* GET ALL USERS + UNSEEN COUNT */
export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user.id;                  // ✅ .id not ._id

    // Get all users except logged in user
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: userId },                 // ✅ $ne → [Op.ne]
      },
      attributes: { exclude: ["password"] },     // ✅ exclude password
    });

    // Count unseen messages for each user
    const unseenMsg = {};

    await Promise.all(
      users.map(async (user) => {
        const count = await Message.count({      // ✅ countDocuments → count
          where: {
            senderId: user.id,                   // ✅ .id not ._id
            receiverId: userId,
            seen: false,
          },
        });

        if (count > 0) {
          unseenMsg[user.id] = count;            // ✅ .id not ._id
        }
      })
    );

    res.json({
      success: true,
      users,
      unseenMsg,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL MESSAGES WITH USER */
export const getAllMsgForUser = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user.id;                    // ✅ .id not ._id

    // Get all messages between two users
    const messages = await Message.findAll({     // ✅ find → findAll
      where: {
        [Op.or]: [                               // ✅ $or → [Op.or]
          { senderId: myId,           receiverId: selectedUserId },
          { senderId: selectedUserId, receiverId: myId },
        ],
      },
      order: [["createdAt", "ASC"]],             // ✅ .sort({createdAt:1}) → order ASC
    });

    // Mark all their messages as seen
    await Message.update(                        // ✅ updateMany → update
      { seen: true },
      {
        where: {
          senderId: selectedUserId,
          receiverId: myId,
          seen: false,
        },
      }
    );

    res.json({
      success: true,
      messages,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* MARK SINGLE MESSAGE AS SEEN */
export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;

    // Update single message as seen
    await Message.update(                        // ✅ findByIdAndUpdate → update
      { seen: true },
      {
        where: { id },                           // ✅ find by id
      }
    );

    res.json({ success: true });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* SEND MESSAGE */
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user.id;                // ✅ .id not ._id

    // Upload image to Cloudinary if provided
    let imageUrl;
    if (image) {
      const upload = await cloudinary.uploader.upload(image);
      imageUrl = upload.secure_url;
    }

    // Save message to PostgreSQL
    const newMessage = await Message.create({   // ✅ same as MongoDB
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Send to receiver via Socket.IO if online
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.json({
      success: true,
      newMessage,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};