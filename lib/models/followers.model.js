import mongoose from 'mongoose';

const followersSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  followerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Followers = mongoose.model('Followers', followersSchema);

export default Followers;
