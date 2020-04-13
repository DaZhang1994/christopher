import { BaseModel } from '../../models/base.model';
import { Model } from 'mongoose';
import { UseInterceptors } from '@nestjs/common';
import { Cache } from '../../decorators/cache.decorator';
import { CacheInterceptor } from '../../interceptors/cache/cache.interceptor';

export class BaseService<T extends BaseModel> {

  protected CollectionModel: Model<any>;

  constructor(CollectionModel: Model<any>) {
    this.CollectionModel = CollectionModel;
  }

  async findOne(model: T) {
    try{
      return await this.CollectionModel.findOne(model);
    }
    catch (e) {
      console.log(e);
      return null;
    }
  }

  async addOne(model: T) {
    try{
      await new this.CollectionModel(model).save();
    }
    catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  async updateOne(oriModel: T, desModel: T) {
    try{
      await this.CollectionModel.updateOne(oriModel, desModel);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

  async deleteUser(model: T) {
    try{
      await this.CollectionModel.deleteOne(model);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

}
