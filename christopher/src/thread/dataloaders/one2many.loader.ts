import { BaseService } from '../../common/services/base.service';
import { BaseModel } from '../../common/models/base.model';

export class One2ManyLoader<T extends BaseModel> {

  protected service: BaseService<T>;
  protected set4One: string;
  protected map4Many: string;
  protected field4One: string;
  protected batchPromise: string;
  protected batchMutex: string;

  constructor(service: BaseService<T>,
              set4One: string,
              map4Many: string,
              field4One: string,
              batchPromise: string,
              batchMutex: string) {
    this.service = service;
    this.set4One = set4One;
    this.map4Many = map4Many;
    this.field4One = field4One;
    this.batchPromise = batchPromise;
    this.batchMutex = batchMutex;
  }

  async load(_id4One: string, req: any) {

    if(req[this.map4Many] != null) {
      const hitCache = req[this.map4Many].get(_id4One.toString());
      if(hitCache != null) {
        return hitCache;
      }
    }

    if(req[this.set4One] == null) {
      req[this.set4One] = new Set();
    }
    req[this.set4One].add(_id4One.toString());

    if(req[this.map4Many] == null) {
      req[this.map4Many] = new Map();
    }

    if(!req[this.batchMutex]) {
      req[this.batchMutex] = true;

      req[this.batchPromise] = new Promise(resolve => {
        process.nextTick(async () => {
          const set4OneArr: string[] = Array.from(req[this.set4One]);

          if(set4OneArr.length == 0) {
            req[this.batchMutex] = null;
            req[this.set4One] = null;
            resolve();
          }

          else if(set4OneArr.length == 1) {
            const collection = await this.service.findByField(this.field4One, set4OneArr[0]);
            req[this.map4Many].set(_id4One.toString(), collection);
          }

          else{
            (await this.service.findAndGroupByIds(this.field4One, set4OneArr)).map(entry => {
              req[this.map4Many].set(entry._id.toString(), entry.collection);
            });
          }

          req[this.batchMutex] = null;
          req[this.set4One] = null;
          resolve();
        })
      })
    }

    return req[this.batchPromise].then(() => req[this.map4Many].get(_id4One.toString()));
  }

}
