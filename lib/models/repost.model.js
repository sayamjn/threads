import mongoose from 'mongoose';

const repostsSchema = new mongoose.Schema({
  threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
  reposterId: { type: String, required: true },
});

const Reposts = mongoose.model('Repost', repostsSchema);

export default Reposts;
