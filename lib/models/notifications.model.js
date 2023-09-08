import mongoose from 'mongoose';

const notificationsSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  read: { type: Boolean, default: false },
  type: {
    type: String,
    enum: ['LIKE', 'REPOST', 'FOLLOW', 'NEWPOST', 'REPLY'],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: String },
  threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
});

const Notifications = mongoose.model('Notification', notificationsSchema);

export default Notifications;
