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
import {HabitaionesType} from '../models';
import {HabitaionesTypeRepository} from '../repositories';

export class HabitaionesTypeController {
  constructor(
    @repository(HabitaionesTypeRepository)
    public habitaionesTypeRepository : HabitaionesTypeRepository,
  ) {}

  @post('/habitaiones-types')
  @response(200, {
    description: 'HabitaionesType model instance',
    content: {'application/json': {schema: getModelSchemaRef(HabitaionesType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitaionesType, {
            title: 'NewHabitaionesType',
            exclude: ['id'],
          }),
        },
      },
    })
    habitaionesType: Omit<HabitaionesType, 'id'>,
  ): Promise<HabitaionesType> {
    return this.habitaionesTypeRepository.create(habitaionesType);
  }

  @get('/habitaiones-types/count')
  @response(200, {
    description: 'HabitaionesType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HabitaionesType) where?: Where<HabitaionesType>,
  ): Promise<Count> {
    return this.habitaionesTypeRepository.count(where);
  }

  @get('/habitaiones-types')
  @response(200, {
    description: 'Array of HabitaionesType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HabitaionesType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HabitaionesType) filter?: Filter<HabitaionesType>,
  ): Promise<HabitaionesType[]> {
    return this.habitaionesTypeRepository.find(filter);
  }

  @patch('/habitaiones-types')
  @response(200, {
    description: 'HabitaionesType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitaionesType, {partial: true}),
        },
      },
    })
    habitaionesType: HabitaionesType,
    @param.where(HabitaionesType) where?: Where<HabitaionesType>,
  ): Promise<Count> {
    return this.habitaionesTypeRepository.updateAll(habitaionesType, where);
  }

  @get('/habitaiones-types/{id}')
  @response(200, {
    description: 'HabitaionesType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HabitaionesType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HabitaionesType, {exclude: 'where'}) filter?: FilterExcludingWhere<HabitaionesType>
  ): Promise<HabitaionesType> {
    return this.habitaionesTypeRepository.findById(id, filter);
  }

  @patch('/habitaiones-types/{id}')
  @response(204, {
    description: 'HabitaionesType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HabitaionesType, {partial: true}),
        },
      },
    })
    habitaionesType: HabitaionesType,
  ): Promise<void> {
    await this.habitaionesTypeRepository.updateById(id, habitaionesType);
  }

  @put('/habitaiones-types/{id}')
  @response(204, {
    description: 'HabitaionesType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() habitaionesType: HabitaionesType,
  ): Promise<void> {
    await this.habitaionesTypeRepository.replaceById(id, habitaionesType);
  }

  @del('/habitaiones-types/{id}')
  @response(204, {
    description: 'HabitaionesType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.habitaionesTypeRepository.deleteById(id);
  }
}
