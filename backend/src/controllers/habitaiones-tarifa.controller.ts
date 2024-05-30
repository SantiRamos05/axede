import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {HabitaionesTarifa} from '../models';
import {HabitaionesTarifaRepository} from '../repositories';

export class HabitaionesTarifaController {
  constructor(
    @repository(HabitaionesTarifaRepository)
    public habitaionesTarifaRepository : HabitaionesTarifaRepository,
  ) {}

  @post('/habitaiones-tarifas')
  @response(200, {
    description: 'HabitaionesTarifa model instance',
    content: {'application/json': {schema: getModelSchemaRef(HabitaionesTarifa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitaionesTarifa, {
            title: 'NewHabitaionesTarifa',
            exclude: ['id'],
          }),
        },
      },
    })
    habitaionesTarifa: Omit<HabitaionesTarifa, 'id'>,
  ): Promise<HabitaionesTarifa> {
    return this.habitaionesTarifaRepository.create(habitaionesTarifa);
  }

  @get('/habitaiones-tarifas/count')
  @response(200, {
    description: 'HabitaionesTarifa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HabitaionesTarifa) where?: Where<HabitaionesTarifa>,
  ): Promise<Count> {
    return this.habitaionesTarifaRepository.count(where);
  }

  @get('/habitaiones-tarifas')
  @response(200, {
    description: 'Array of HabitaionesTarifa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HabitaionesTarifa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HabitaionesTarifa) filter?: Filter<HabitaionesTarifa>,
  ): Promise<HabitaionesTarifa[]> {
    return this.habitaionesTarifaRepository.find(filter);
  }

  @patch('/habitaiones-tarifas')
  @response(200, {
    description: 'HabitaionesTarifa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitaionesTarifa, {partial: true}),
        },
      },
    })
    habitaionesTarifa: HabitaionesTarifa,
    @param.where(HabitaionesTarifa) where?: Where<HabitaionesTarifa>,
  ): Promise<Count> {
    return this.habitaionesTarifaRepository.updateAll(habitaionesTarifa, where);
  }

  @get('/habitaiones-tarifas/{id}')
  @response(200, {
    description: 'HabitaionesTarifa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HabitaionesTarifa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HabitaionesTarifa, {exclude: 'where'}) filter?: FilterExcludingWhere<HabitaionesTarifa>
  ): Promise<HabitaionesTarifa> {
    return this.habitaionesTarifaRepository.findById(id, filter);
  }

  @patch('/habitaiones-tarifas/{id}')
  @response(204, {
    description: 'HabitaionesTarifa PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitaionesTarifa, {partial: true}),
        },
      },
    })
    habitaionesTarifa: HabitaionesTarifa,
  ): Promise<void> {
    await this.habitaionesTarifaRepository.updateById(id, habitaionesTarifa);
  }

  @put('/habitaiones-tarifas/{id}')
  @response(204, {
    description: 'HabitaionesTarifa PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() habitaionesTarifa: HabitaionesTarifa,
  ): Promise<void> {
    await this.habitaionesTarifaRepository.replaceById(id, habitaionesTarifa);
  }

  @del('/habitaiones-tarifas/{id}')
  @response(204, {
    description: 'HabitaionesTarifa DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.habitaionesTarifaRepository.deleteById(id);
  }
}
