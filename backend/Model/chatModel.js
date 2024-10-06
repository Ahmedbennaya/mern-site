import mongoose from 'mongoose';

const chatSchema = mongoose.Schema(
  {
    sender: { type: String, required: true },  // 'admin' or 'user'
    message: { type: String, required: true },
  },
  { timestamps: true }  // Automatically add createdAt and updatedAt timestamps
);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
