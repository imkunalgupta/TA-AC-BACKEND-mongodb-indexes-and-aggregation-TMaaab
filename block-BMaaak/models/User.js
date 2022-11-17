var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: String,
  email: { type: String, unique: true, required: true },
  address: {
    city: String,
    state: String,
    country: String,
    pin: Number,
  },
});

userSchema.index({ 'address.state': 1, 'address.country': 1 }); //compound index
userSchema.index({ favourites: 1 }); //Multikey Indexes
userSchema.index({ username: 1 }, { unique: true }); //Unique index property

module.exports = mongoose.model('User', userSchema);
