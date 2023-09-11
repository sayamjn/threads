import mongoose from "mongoose";

// Define the MongoDB schema for followers
const followerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  path: {
    type: String, // Add a field for the path
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the MongoDB model for followers
const Follow = mongoose.models.Follow || mongoose.model("Follow", followerSchema);

export default Follow;
