import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {HabitaionesTarifa, HabitaionesTarifaRelations, HabitaionesType, SedeHotel} from '../models';
import {HabitaionesTypeRepository} from './habitaiones-type.repository';
import {SedeHotelRepository} from './sede-hotel.repository';

export class HabitaionesTarifaRepository extends DefaultCrudRepository<
  HabitaionesTarifa,
  typeof HabitaionesTarifa.prototype.id,
  HabitaionesTarifaRelations
> {

  public readonly habitaionesType: BelongsToAccessor<HabitaionesType, typeof HabitaionesTarifa.prototype.id>;

  public readonly sedeHotel: BelongsToAccessor<SedeHotel, typeof HabitaionesTarifa.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('HabitaionesTypeRepository') protected habitaionesTypeRepositoryGetter: Getter<HabitaionesTypeRepository>, @repository.getter('SedeHotelRepository') protected sedeHotelRepositoryGetter: Getter<SedeHotelRepository>,
  ) {
    super(HabitaionesTarifa, dataSource);
    this.sedeHotel = this.createBelongsToAccessorFor('sedeHotel', sedeHotelRepositoryGetter,);
    this.registerInclusionResolver('sedeHotel', this.sedeHotel.inclusionResolver);
    this.habitaionesType = this.createBelongsToAccessorFor('habitaionesType', habitaionesTypeRepositoryGetter,);
    this.registerInclusionResolver('habitaionesType', this.habitaionesType.inclusionResolver);
  }
}
