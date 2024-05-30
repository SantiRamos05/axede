import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {HabitaionesType, HabitaionesTypeRelations} from '../models';

export class HabitaionesTypeRepository extends DefaultCrudRepository<
  HabitaionesType,
  typeof HabitaionesType.prototype.id,
  HabitaionesTypeRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(HabitaionesType, dataSource);
  }
}
