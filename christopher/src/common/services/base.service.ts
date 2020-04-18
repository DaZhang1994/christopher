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

  async addOne(model: T) {
    return new this.CollectionModel(model).save();
  }

  async updateOne(oriModel: T, desModel: T) {
    return this.CollectionModel.findOneAndUpdate(oriModel, desModel);
  }

  async deleteOne(model: T) {
    return this.CollectionModel.deleteOne(model);
  }

  async findByIds(ids: string[]) {
    return this.CollectionModel.find({_id: { $in: ids.map(id => mongoose.Types.ObjectId(id)) }});
  }

  async findAll() {
    return this.CollectionModel.find({});
  }

}
