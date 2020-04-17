import { BaseModel } from '../models/base.model';
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
    await this.CollectionModel.updateOne(oriModel, desModel);
  }

  async deleteUser(model: T) {
    return this.CollectionModel.deleteOne(model);
  }

}
