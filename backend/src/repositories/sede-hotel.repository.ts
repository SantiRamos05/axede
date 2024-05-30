import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {SedeHotel, SedeHotelRelations} from '../models';

export class SedeHotelRepository extends DefaultCrudRepository<
  SedeHotel,
  typeof SedeHotel.prototype.id,
  SedeHotelRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(SedeHotel, dataSource);
  }
}
