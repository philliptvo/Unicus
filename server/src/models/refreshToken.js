import mongoose from 'mongoose';

const RefreshTokenSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  token: String,
  expires: Date,
  created: {
    type: Date,
    default: Date.now(),
  },
  revoked: Date,
  replacedByToken: String,
});

RefreshTokenSchema.virtual('isExpired').get(function () {
  return Date.now() >= this.expires;
});

RefreshTokenSchema.virtual('isActive').get(function () {
  return !this.revoked && !this.isExpired;
});

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

export default RefreshToken;
