import * as mongoose from 'mongoose';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { UserRole } from '../constants/role.constant';
import { UserStatus } from '../constants/status.constant';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    match: /^[A-Za-z_]\w{5,15}$/
  },
  password: {
    type: String,
    required: true,
    match: /[a-fA-F0-9]{32}/
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
  },
  telephone: {
    type: String,
    unique: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  telephoneVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: Number,
    default: UserRole.SUBSCRIBER
  },
  avatarURI: {
    type: String
  },
  createdTime: {
    type: Date,
    default: new Date()
  },
  lastLoginIP: {
    type: String
  },
  lastLoginTime: {
    type: Date
  },
  status: {
    type: Number,
    default: UserStatus.VALID
  },
}, {
  versionKey: false
  })
  .pre('findOneAndUpdate', function(next) {
    this.setOptions({ runValidators: true, new: true, useFindAndModify: false});
    next();
  })
  .post('save', (error, doc, next) => {
    if('MongoError' === error.name) {
      if(error.code === 11000) {
        throw new ConflictException('Duplicated user identifier!');
      }
    }
    if('ValidationError' === error.name) {
      throw new BadRequestException(error.message);
    }
    next(error);
  })
  .post('findOneAndUpdate', (error, doc, next) => {
    if('ValidationError' === error.name) {
      throw new BadRequestException(error.message);
    }
    next(error);
  });
