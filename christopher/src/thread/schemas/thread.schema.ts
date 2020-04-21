import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { BadRequestException, ConflictException } from '@nestjs/common';

export const ThreadSchema = new mongoose.Schema({
  subject: {
    type: String,
    unique: true
  },
  status: {
    type: Number
  },
  createdTime: {
    type: Date
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  lastUpdateTime: {
    type: Date
  }
})
  .pre('findOneAndUpdate', function(next) {
    this.setOptions({ runValidators: true, new: true, useFindAndModify: false});
    next();
  })
  .post('save', (error, doc, next) => {
    if('MongoError' === error.name) {
      if(error.code === 11000) {
        throw new ConflictException('Duplicated Thread identifier!');
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
