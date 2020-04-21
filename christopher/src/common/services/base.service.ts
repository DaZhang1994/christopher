import { BaseModel } from '../models/base.model';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

export class BaseService<T extends BaseModel> {

  protected CollectionModel: Model<any>;

  constructor(CollectionModel: Model<any>) {
    this.CollectionModel = CollectionModel;
  }

  async findOne(model: T): Promise<T> {
    return this.CollectionModel.findOne(model);
  }

  async findById(_id: string): Promise<T> {
    return this.CollectionModel.findOne({ _id: mongoose.Types.ObjectId(_id) });
  }

  async addOne(model: T) {
    return new this.CollectionModel(model).save();
  }

  async updateOne(oriModel: T, desModel: T): Promise<T> {
    return this.CollectionModel.findOneAndUpdate(oriModel, desModel);
  }

  async updateById(_id: string, desModel: T): Promise<T> {
    return this.CollectionModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(_id) }, desModel);
  }

  async deleteOne(model: T) {
    return this.CollectionModel.deleteOne(model);
  }

  async deleteById(_id: string) {
    return this.CollectionModel.deleteOne({ _id: mongoose.Types.ObjectId(_id) });
  }

  async findByIds(_ids: string[]): Promise<T[]> {
    return this.CollectionModel.find({_id: { $in: _ids.map(id => mongoose.Types.ObjectId(id)) }});
  }

  async findAll(): Promise<T[]> {
    return this.CollectionModel.find({});
  }

  async findAllGroupByIds(groupBy: string): Promise<any[]> {
    return this.CollectionModel.aggregate([
      { $group: {
          _id: `$${groupBy}`,
          collection: { $push: '$$ROOT' }
        }
      }
    ]);
  }

  async findAndGroupByIds(groupBy: string, _ids: string[]): Promise<any[]> {
    return this.CollectionModel.aggregate([
      { $match: {
          [groupBy]: { $in: _ids.map(id => mongoose.Types.ObjectId(id)) }
        }
      },
      { $group: {
          _id: `$${groupBy}`,
          collection: { $push:'$$ROOT' }
        }
      }
    ]);
  }

}
