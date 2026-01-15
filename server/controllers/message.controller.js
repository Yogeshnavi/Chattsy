const Message = require("../models/message.model");

/**
 * GET /api/messages/:userId
 * Fetch chat history between logged-in user and another user
 */
exports.getMessages = async (req, res) => {
  const loggedInUserId = req.user.id;
  const otherUserId = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: loggedInUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: loggedInUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender receiver", "name email");

    res.json(messages);
  } catch {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
