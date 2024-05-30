import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HabitaionesTarifa,
  SedeHotel,
} from '../models';
import {HabitaionesTarifaRepository} from '../repositories';

export class HabitaionesTarifaSedeHotelController {
  constructor(
    @repository(HabitaionesTarifaRepository)
    public habitaionesTarifaRepository: HabitaionesTarifaRepository,
  ) { }

  @get('/habitaiones-tarifas/{id}/sede-hotel', {
    responses: {
      '200': {
        description: 'SedeHotel belonging to HabitaionesTarifa',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SedeHotel),
          },
        },
      },
    },
  })
  async getSedeHotel(
    @param.path.string('id') id: typeof HabitaionesTarifa.prototype.id,
  ): Promise<SedeHotel> {
    return this.habitaionesTarifaRepository.sedeHotel(id);
  }
}
