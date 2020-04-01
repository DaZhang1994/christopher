import * as mongoose from 'mongoose';

export const UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});
