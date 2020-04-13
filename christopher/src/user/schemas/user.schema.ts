import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  username: {
    type: String,
    unique: true,
    match: /^[A-Za-z_]\w{5,15}$/
  },
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  },
  telephone: {
    type: String,
    unique: true
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String
  }
});
