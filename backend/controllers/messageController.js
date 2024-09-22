import Conversation from "../models/conversation.js";
import Message from "../models/message.js";


export const sendMessage = async (req, res) => {
      try {
        const {message} = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
          senderId,
          receiverId,
          message
        })

        if(newMessage){
          conversation.messages.push(newMessage);
        }

        //TODO: to add socket.io

        await Promise.all([newMessage.save(), conversation.save()]);

        res.status(201).json(newMessage);


      } catch (error) {
        console.log("Error in sendMessage: ", error);
        res.status(500).json({ error: "Internal server error"});
      }
}

export const getMessages = async (req, res) => { 

  try {
    const {id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {$all: [senderId, userToChatId]}
    }).populate("messages");
    if(!conversation){
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages); 
  } catch (error) {
    console.log("Error in getMessages: ", error);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const getChatList = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({ participants: userId })
      .populate({
        path: 'participants',
        match: { _id: { $ne: userId } },
        select: 'fullName profilePic'
      })
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 },
        select: 'message createdAt'
      })
      .lean();

    const chatList = conversations
      .map(conv => ({
        userId: conv.participants[0]._id,
        fullName: conv.participants[0].fullName,
        profilePic: conv.participants[0].profilePic,
        lastMessage: conv.messages[0]?.message || null,
        lastMessageCreatedAt: conv.messages[0]?.createdAt || null
      }))
      .sort((a, b) => {
        if (!a.lastMessageCreatedAt) return 1;
        if (!b.lastMessageCreatedAt) return -1;
        return b.lastMessageCreatedAt - a.lastMessageCreatedAt;
      });

    res.status(200).json(chatList);
  } catch (error) {
    console.log("Error in getChatList: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
