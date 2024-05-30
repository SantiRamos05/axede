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
  HabitaionesType,
} from '../models';
import {HabitaionesTarifaRepository} from '../repositories';

export class HabitaionesTarifaHabitaionesTypeController {
  constructor(
    @repository(HabitaionesTarifaRepository)
    public habitaionesTarifaRepository: HabitaionesTarifaRepository,
  ) { }

  @get('/habitaiones-tarifas/{id}/habitaiones-type', {
    responses: {
      '200': {
        description: 'HabitaionesType belonging to HabitaionesTarifa',
        content: {
          'application/json': {
            schema: getModelSchemaRef(HabitaionesType),
          },
        },
      },
    },
  })
  async getHabitaionesType(
    @param.path.string('id') id: typeof HabitaionesTarifa.prototype.id,
  ): Promise<HabitaionesType> {
    return this.habitaionesTarifaRepository.habitaionesType(id);
  }
}
