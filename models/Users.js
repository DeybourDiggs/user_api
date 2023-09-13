const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    unique: true,
  },
  name: String,
});

// Create a model method to generate and set the next user_id
userSchema.statics.generateUserId = async function () {
  const User = this;
  const lastUser = await User.findOne({}, {}, { sort: { user_id: -1 } });
  const nextUserId = (lastUser && lastUser.user_id + 1) || 1;
  return nextUserId;
};

// Pre-save hook to set the user_id before saving a new user
userSchema.pre('save', async function (next) {
  if (!this.user_id) {
    this.user_id = await this.constructor.generateUserId();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);