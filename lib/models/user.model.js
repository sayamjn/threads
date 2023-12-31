import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming users can follow other users
    },
  ],
  clerkId: {
    type: String,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
